"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface UserForm {
  username: string;
  password: string;
}

const SignInForm = ({ className }: { className?: string }) => {
  const [userInput, setUserInput] = useState<UserForm>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("userInput", userInput);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-y-2 w-full rounded-lg", className)}
    >
      <Input
        className="h-12 rounded-lg"
        placeholder="Username"
        type="text"
        name="username"
        value={userInput.username}
        onChange={handleChange}
        autoComplete="username"
      />
      <Input
        className="h-12 rounded-lg"
        placeholder="Password"
        type="password"
        name="password"
        value={userInput.password}
        onChange={handleChange}
        autoComplete="current-password"
      />
      <Button
        className={`font-semibold h-12 rounded-lg ${
          !userInput.username || !userInput.password ? "cursor-not-allowed" : ""
        }`}
        type="submit"
        disabled={!userInput.username || !userInput.password}
      >
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
