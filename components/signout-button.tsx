import { signOut } from "@/lib/auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const SignOut = ({ className }: { className?: string }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button
        className={className}
        size="icon"
        type="submit"
        variant="destructive"
        asChild
      >
        <LogOut />
      </Button>
    </form>
  );
};
export default SignOut;
