
import { supabase } from "@/integrations/supabase/client";
import { ToastProps } from "@/components/ui/toast";

export const signUpUser = async (
  email: string,
  password: string,
  username: string,
  toast: (props: ToastProps) => void
) => {
  // First check if username already exists
  const { data: existingUser, error: usernameError } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .single();

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

  if (!profileData || profileError) {
    toast({
      title: "Error",
      children: "Username not found",
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
    toast({
      title: "Error",
      children: error.message,
      variant: "destructive",
    });
    return null;
  }

  return data.user;
};

