import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SignInForm = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-y-2 w-full rounded-lg", className)}>
      <Input
        className="h-12 rounded-lg"
        placeholder="Username, phone, or email"
        type="text"
      />
      <Input
        className="h-12 rounded-lg"
        placeholder="Password"
        type="password"
      />
      <Button className="font-semibold h-12 rounded-lg">Sign In</Button>
    </div>
  );
};

export default SignInForm;
