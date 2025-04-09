import Link from "next/link";
import SignUpForm from "./components/signup-form";
import { Separator } from "@/components/ui/separator";
import SigninProvider from "./components/signup-provider";
import { FaGithub } from "react-icons/fa6";

import { Metadata } from "next";
import Wave from "react-wavify";
import AuthFooter from "@/components/auth-footer";
export const metadata: Metadata = {
  title: "OMG • Sign Up",
  description: "create an account",
};

const SignUpPage = () => {
  return (
    <>
      <h3 className="font-semibold">Hi! Welcome</h3>

      <SignUpForm className="max-w-sm w-full" />

      <div className="flex flex-col items-center text-center gap-y-3 max-w-sm  w-full">
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
            label="Sign Up with Github"
            provider="github"
          />

          <Link href="/signin" className="text-xs hover:underline mt-5">
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
