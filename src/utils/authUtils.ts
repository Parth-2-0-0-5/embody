
import { supabase } from "@/integrations/supabase/client";
import { ToastProps } from "@/components/ui/toast";

export const signUpUser = async (
  email: string,
  password: string,
  username: string,
  toast: (props: ToastProps) => void
) => {
  // Validate password length
  if (password.length < 6) {
    toast({
      title: "Error",
      children: "Password must be at least 6 characters long",
      variant: "destructive",
    });
    return null;
  }

  // First check if username already exists
  const { data: existingUser, error: usernameError } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .maybeSingle();

  if (existingUser) {
    toast({
      title: "Error",
      children: "Username already taken. Please choose another username.",
      variant: "destructive",
    });
    return null;
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (authError) {
    // Parse the error message for user already exists case
    if (authError.message.includes("User already registered")) {
      toast({
        title: "Error",
        children: "This email is already registered. Please try logging in instead.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error",
        children: authError.message,
        variant: "destructive",
      });
    }
    return null;
  }

  // If email confirmation is required, handle it differently
  if (!authData.user?.confirmed_at && supabase.auth.onAuthStateChange) {
    toast({
      title: "Success",
      children: "Account created! You will be redirected once confirmed.",
    });
    // Return the user anyway so we can log them in
    return authData.user;
  }

  return authData.user;
};

export const signInUser = async (
  username: string,
  password: string,
  toast: (props: ToastProps) => void
) => {
  // First get the user's email by their username
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, email')
    .eq('username', username)
    .maybeSingle();

  if (!profileData) {
    toast({
      title: "Error",
      children: "Username not found. Please check your username and try again.",
      variant: "destructive",
    });
    return null;
  }

  if (profileError) {
    toast({
      title: "Error",
      children: "An error occurred while finding your account. Please try again.",
      variant: "destructive",
    });
    return null;
  }

  // Now sign in with the email and password
  const { data, error } = await supabase.auth.signInWithPassword({
    email: profileData.email,
    password,
  });

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      toast({
        title: "Error",
        children: "Please confirm your email address before logging in. Check your inbox for the confirmation link.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Error",
        children: "Invalid credentials. Please check your username and password.",
        variant: "destructive",
      });
    }
    return null;
  }

  return data.user;
};
