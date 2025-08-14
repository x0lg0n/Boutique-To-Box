import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { googleAuth } from '@/services/googleAuth';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');
  const [processed, setProcessed] = useState(false); // Prevent multiple executions

  useEffect(() => {
    const handleCallback = async () => {
      // Prevent multiple executions
      if (processed) return;
      setProcessed(true);

      try {
        setStatus('loading');

        // For Implicit Flow, check URL fragment first
        const urlHash = window.location.hash;
        const hashParams = new URLSearchParams(urlHash.substring(1));
        
        // Also check query params for fallback
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error') || hashParams.get('error');

        // Debug logging
        if (import.meta.env.VITE_DEBUG_OAUTH === 'true') {
          console.log('GoogleCallback - URL params:', {
            code: code ? 'present' : 'missing',
            state: state ? 'present' : 'missing',
            error: error || 'none',
            hashParams: urlHash ? 'present' : 'missing',
            fullURL: window.location.href
          });
        }

        // Handle OAuth errors
        if (error) {
          throw new Error(getOAuthErrorMessage(error));
        }

        // Handle the OAuth callback (works for both flows)
        const user = await googleAuth.handleCallback(code || undefined, state || undefined);

        // Update auth context with Google user
        await loginWithGoogle(user);

        setStatus('success');
        
        toast({
          title: "Welcome!",
          description: `Successfully signed in as ${user.name}`,
        });

        // Clear the URL hash to prevent re-processing
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }

        // Redirect to dashboard or home page (reduced delay)
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 800);

      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        
        const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
        
        // Handle specific state parameter errors more gracefully
        if (errorMessage.includes('Invalid state parameter')) {
          setError('Session expired during login. Please try signing in again.');
          toast({
            title: "Session Expired",
            description: "Please try signing in again.",
            variant: "destructive",
          });
          
          // Redirect to login page after a short delay
          setTimeout(() => {
            navigate('/login', { replace: true });
          }, 2000);
        } else {
          setError(errorMessage);
          
          toast({
            title: "Sign-in Failed",
            description: errorMessage,
            variant: "destructive",
          });
        }
      }
    };

    handleCallback();
  }, [searchParams, loginWithGoogle, navigate, toast, processed]);

  // Helper function to get user-friendly error messages
  const getOAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'access_denied':
        return 'You denied permission to access your Google account. Please try again and grant the necessary permissions.';
      case 'invalid_request':
        return 'Invalid OAuth request. Please try signing in again.';
      case 'unauthorized_client':
        return 'This application is not authorized for Google OAuth. Please contact support.';
      case 'unsupported_response_type':
        return 'OAuth configuration error. Please contact support.';
      case 'invalid_scope':
        return 'Invalid permissions requested. Please contact support.';
      case 'server_error':
        return 'Google OAuth server error. Please try again later.';
      case 'temporarily_unavailable':
        return 'Google OAuth is temporarily unavailable. Please try again later.';
      default:
        return `OAuth error: ${errorCode}. Please try again.`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fashion-softGray/30 via-white to-fashion-softPink/20">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {status === 'loading' && (
              <Loader2 className="h-12 w-12 animate-spin text-fashion-purple" />
            )}
            {status === 'success' && (
              <CheckCircle className="h-12 w-12 text-green-500" />
            )}
            {status === 'error' && (
              <XCircle className="h-12 w-12 text-red-500" />
            )}
          </div>
          
          <CardTitle className="text-2xl font-semibold">
            {status === 'loading' && 'Signing you in...'}
            {status === 'success' && 'Welcome!'}
            {status === 'error' && 'Sign-in Failed'}
          </CardTitle>
          
          <CardDescription>
            {status === 'loading' && 'Please wait while we complete your Google sign-in.'}
            {status === 'success' && 'You have been successfully signed in. Redirecting...'}
            {status === 'error' && 'There was a problem signing you in.'}
          </CardDescription>
        </CardHeader>
        
        {status === 'error' && (
          <CardContent className="text-center">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => navigate('/login', { replace: true })}
                className="w-full px-4 py-2 bg-fashion-purple text-white rounded-lg hover:bg-fashion-purple/90 transition-colors"
              >
                Try Again
              </button>
              
              <button
                onClick={() => navigate('/', { replace: true })}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go Home
              </button>
            </div>
          </CardContent>
        )}
        
        {status === 'loading' && (
          <CardContent className="text-center">
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-2 bg-gray-200 rounded-full mb-2"></div>
                <div className="h-2 bg-gray-200 rounded-full w-2/3 mx-auto"></div>
              </div>
              <p className="text-sm text-gray-500">
                This may take a few seconds...
              </p>
            </div>
          </CardContent>
        )}
        
        {status === 'success' && (
          <CardContent className="text-center">
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-2 bg-green-200 rounded-full mb-2"></div>
                <div className="h-2 bg-green-200 rounded-full w-2/3 mx-auto"></div>
              </div>
              <p className="text-sm text-gray-500">
                Redirecting you to your dashboard...
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
