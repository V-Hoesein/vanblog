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
    <div className="flex flex-col items-center justify-center h-screen mx-auto px-10 bg-white gap-y-4 relative">
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
        </div>
      </div>

      <div className="flex justify-center items-center gap-x-3 text-sm text-gray-500 flex-wrap absolute bottom-5">
        <span>© {new Date().getFullYear()}</span>
        <Link href="#" className="hover:underline font-extralight text-xs">
          OMG Terms
        </Link>
        <Link href="#" className="hover:underline font-extralight text-xs">
          Privacy Policy
        </Link>
        <Link href="#" className="hover:underline font-extralight text-xs">
          Cookie Policy
        </Link>
        <Link href="#" className="hover:underline font-extralight text-xs">
          Report a Problem
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
