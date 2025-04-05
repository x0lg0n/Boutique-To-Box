
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSupabase } from '@/contexts/SupabaseContext';
import { useIsMobile } from '@/hooks/use-mobile';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const Login = () => {
  const navigate = useNavigate();
  const { signIn, isLoading } = useSupabase();
  const isMobile = useIsMobile();
  const [formLoading, setFormLoading] = useState(false);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setFormLoading(true);
      await signIn(values.email, values.password);
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error?.message || "Please check your email and password.",
        variant: "destructive",
      });
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-24 mt-16 md:mt-0">
        <Card className="w-full max-w-md mx-4 md:mx-0">
          <CardHeader className="text-center pb-2 md:pb-6">
            <CardTitle className="text-xl md:text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your Boutique to Box account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="email@example.com" 
                            className="pl-10" 
                            {...field} 
                            type="email"
                            autoComplete="email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            className="pl-10" 
                            {...field} 
                            autoComplete="current-password"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  <Link to="/reset-password" className="text-sm text-fashion-purple hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-fashion-purple to-fashion-darkPurple hover:opacity-90"
                  size={isMobile ? "default" : "lg"}
                  disabled={formLoading || isLoading}
                >
                  {formLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center pt-2 md:pt-4">
            <p className="text-xs md:text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-fashion-purple hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
