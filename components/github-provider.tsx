import { signIn } from "@/lib/auth";
import { Button } from "./ui/button";
import { ImGithub } from "react-icons/im";

const GithubProvider = () => {
  return (
    <form
      className="w-full"
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
