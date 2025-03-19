import { signIn } from "@/lib/auth";
import { Button } from "./ui/button";
import { ImGithub } from "react-icons/im";
import { cn } from "@/lib/utils";

const GithubProvider = ({ className }: { className: string }) => {
  return (
    <form
      className={cn("w-full", className)}
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button type="submit" className="w-full" variant="ghost">
        <ImGithub />
        Sign in with GitHub
      </Button>
    </form>
  );
};

export default GithubProvider;
