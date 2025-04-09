import Link from "next/link";
import SignInForm from "./components/signin-form";
import { Separator } from "@/components/ui/separator";
import SigninProvider from "./components/signin-provider";
import { FaGithub } from "react-icons/fa6";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "OMG • Sign In",
  description: "Sign in to your account",
};

const SignInPage = () => {
  return (
    <>
      <h3 className="font-semibold">Sign In with your account</h3>

      <SignInForm className="max-w-sm w-full" />

      <div className="flex flex-col items-center text-center gap-y-3 max-w-sm  w-full">
        <Link href="/account/password/reset" className="text-sm">
          Forgot Password?
        </Link>

        <div className="flex justify-center gap-x-3 items-center">
          <Separator
            orientation="horizontal"
            className="my-2 w-5 h-[1px] bg-gray-300"
          />
          <span className="text-sm text-gray-500">Or</span>
          <Separator
            orientation="horizontal"
            className="my-2 w-5 h-[1px] bg-gray-300"
          />
        </div>

        <div className="flex flex-col gap-y-2 w-full">
          <SigninProvider
            icon={<FaGithub className="h-14 w-14" />}
            label="Sign In with Github"
            provider="github"
          />

          <Link href="/signup" className="text-xs hover:underline mt-5">
            Don&apos;t an account? create one
          </Link>
        </div>
      </div>

    </>
  );
};

export default SignInPage;
