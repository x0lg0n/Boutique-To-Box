import { jwtDecode } from 'jwt-decode';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = `${window.location.origin}/auth/google/callback`;

// OAuth scopes - minimal required for basic authentication
const OAUTH_SCOPES = [
  'openid',
  'email', 
  'profile'
].join(' ');

// Google OAuth endpoints
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  verified_email: boolean;
  locale?: string;
}

export interface GoogleTokens {
  access_token: string;
  id_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export interface GoogleTokenResponse extends GoogleTokens {
  user: GoogleUser;
}

export class GoogleAuthService {
  private static instance: GoogleAuthService;

  private constructor() {
    if (!GOOGLE_CLIENT_ID) {
      console.warn('Google Client ID not found in environment variables');
    }
  }

  static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  /**
   * Generate a random state parameter for CSRF protection
   */
  private generateState(): string {
    return Math.random().toString(36).substr(2, 15) + 
           Math.random().toString(36).substr(2, 15);
  }

  /**
   * Initiate Google OAuth sign-in flow using Implicit Flow (no client secret needed)
   */
  signIn(): void {
    if (!GOOGLE_CLIENT_ID) {
      throw new Error('Google OAuth is not configured. Please add VITE_GOOGLE_CLIENT_ID to your environment variables.');
    }

    // Generate and store state for CSRF protection
    const state = this.generateState();
    sessionStorage.setItem('oauth_state', state);

    // Build OAuth URL for Implicit Flow (token response type)
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'token id_token', // Implicit flow - gets tokens directly
      scope: OAUTH_SCOPES,
      state: state,
      nonce: this.generateState(), // Required for id_token
      prompt: 'consent'
    });

    // Redirect to Google OAuth
    window.location.href = `${GOOGLE_AUTH_URL}?${params.toString()}`;
  }

  /**
   * Handle OAuth callback for Implicit Flow (tokens in URL fragment)
   */
  async handleCallback(code?: string, state?: string): Promise<GoogleUser> {
    // For Implicit Flow, tokens come in URL fragment, not query params
    const urlHash = window.location.hash;
    const params = new URLSearchParams(urlHash.substring(1)); // Remove #
    
    const accessToken = params.get('access_token');
    const idToken = params.get('id_token');
    const tokenState = params.get('state');
    const expiresIn = params.get('expires_in');
    const error = params.get('error');

    if (import.meta.env.VITE_DEBUG_OAUTH === 'true') {
      console.log('OAuth Debug - URL Hash params:', {
        access_token: accessToken ? 'present' : 'missing',
        id_token: idToken ? 'present' : 'missing',
        state: tokenState || 'missing',
        error: error || 'none'
      });
    }

    // Handle OAuth errors
    if (error) {
      throw new Error(`OAuth error: ${error}`);
    }

    // Validate required tokens
    if (!accessToken || !idToken) {
      throw new Error('Missing required OAuth tokens in callback');
    }

    // Verify state parameter
    const storedState = sessionStorage.getItem('oauth_state');
    if (storedState && tokenState !== storedState) {
      throw new Error('Invalid state parameter. Possible CSRF attack.');
    }

    // Clear stored state
    sessionStorage.removeItem('oauth_state');

    // Create token object
    const tokens: GoogleTokens = {
      access_token: accessToken,
      id_token: idToken,
      expires_in: parseInt(expiresIn || '3600'),
      token_type: 'Bearer'
    };

    // Get user information
    const user = await this.getUserInfo(tokens.access_token);
    
    // Store tokens securely
    this.storeTokens(tokens);
    
    return user;
  }

  /**
   * Get user information from Google API
   */
  private async getUserInfo(accessToken: string): Promise<GoogleUser> {
    const response = await fetch(`${GOOGLE_USERINFO_URL}?access_token=${accessToken}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user information from Google');
    }

    const user = await response.json();
    
    // Validate required fields
    if (!user.id || !user.email) {
      throw new Error('Invalid user data received from Google');
    }

    return user;
  }

  /**
   * Store tokens securely in localStorage
   */
  private storeTokens(tokens: GoogleTokens): void {
    const tokenData = {
      ...tokens,
      expires_at: Date.now() + (tokens.expires_in * 1000)
    };
    
    localStorage.setItem('google_tokens', JSON.stringify(tokenData));
  }

  /**
   * Get stored tokens
   */
  getStoredTokens(): GoogleTokens | null {
    const stored = localStorage.getItem('google_tokens');
    if (!stored) return null;

    try {
      const tokens = JSON.parse(stored);
      
      // Check if tokens are expired
      if (tokens.expires_at && Date.now() > tokens.expires_at) {
        this.clearTokens();
        return null;
      }

      return tokens;
    } catch {
      this.clearTokens();
      return null;
    }
  }

  /**
   * Clear stored tokens
   */
  clearTokens(): void {
    localStorage.removeItem('google_tokens');
  }

  /**
   * Get current user from stored tokens
   */
  async getCurrentUser(): Promise<GoogleUser | null> {
    const tokens = this.getStoredTokens();
    if (!tokens) return null;

    try {
      return await this.getUserInfo(tokens.access_token);
    } catch {
      // Token might be invalid, clear it
      this.clearTokens();
      return null;
    }
  }

  /**
   * Sign out and revoke tokens
   */
  async signOut(): Promise<void> {
    const tokens = this.getStoredTokens();
    
    if (tokens?.access_token) {
      try {
        // Revoke the token with Google
        await fetch(`https://oauth2.googleapis.com/revoke?token=${tokens.access_token}`, {
          method: 'POST'
        });
      } catch (error) {
        console.warn('Failed to revoke Google token:', error);
      }
    }

    // Clear local tokens
    this.clearTokens();
  }

  /**
   * Check if user is authenticated with Google
   */
  isAuthenticated(): boolean {
    return this.getStoredTokens() !== null;
  }

  /**
   * Validate ID token (for additional security)
   */
  validateIdToken(idToken: string): any {
    try {
      const decoded = jwtDecode(idToken);
      
      // Basic validation - in production, verify signature too
      if (!decoded.aud || decoded.aud !== GOOGLE_CLIENT_ID) {
        throw new Error('Invalid audience in ID token');
      }

      return decoded;
    } catch (error) {
      throw new Error(`Invalid ID token: ${error}`);
    }
  }
}

// Export singleton instance
export const googleAuth = GoogleAuthService.getInstance();
