
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "@/utils/authUtils";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (value: string) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      return; // Form won't submit if password is too short
    }
    
    setIsLoading(true);

    try {
      const user = await signUpUser(email, password, username, toast);
      if (user) {
        login(user.email!, user.id);
        toast({
          title: "Success",
          children: "Account created successfully!",
        });
        navigate("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="username-register">Username</Label>
        <Input
          id="username-register"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-register">Email</Label>
        <Input
          id="email-register"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-register">Password</Label>
        <Input
          id="password-register"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => validatePassword(e.target.value)}
          required
        />
        {passwordError && (
          <p className="text-sm text-destructive">{passwordError}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !!passwordError}>
        {isLoading ? "Loading..." : "Create Account"}
      </Button>
    </form>
  );
}
