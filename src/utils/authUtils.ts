
import { supabase } from "@/integrations/supabase/client";
import { Toast } from "@/components/ui/use-toast";

export const signUpUser = async (
  email: string,
  password: string,
  username: string,
  toast: (props: Toast) => void
) => {
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
    toast({
      title: "Error",
      description: authError.message,
      variant: "destructive",
    });
    return null;
  }

  return authData.user;
};

export const signInUser = async (
  username: string,
  password: string,
  toast: (props: Toast) => void
) => {
  // First get the user's email by their username
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', username)
    .single();

  if (profileError) {
    toast({
      title: "Error",
      description: "Username not found",
      variant: "destructive",
    });
    return null;
  }

  // Get user email from auth.users using the profile id
  const { data: userData, error: userError } = await supabase.auth.admin.getUserById(profileData.id);
  
  if (userError || !userData?.user?.email) {
    toast({
      title: "Error",
      description: "User not found",
      variant: "destructive",
    });
    return null;
  }

  // Now sign in with the email and password
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData.user.email,
    password,
  });

  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }

  return data.user;
};
