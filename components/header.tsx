import Image from "next/image";
import GithubProvider from "./github-provider";
import Link from "next/link";
import { auth } from "@/lib/auth";

export const Navigations = async () => {
  const session = await auth();

  if (!!session) {
    return (
      <div className="flex gap-x-5 justify-center items-center border rounded-full py-4 px-5 bg-white">
        <nav className="capitalize flex gap-x-5 text-lg ">
          <Link href="/create" className="hover:underline">
            create
          </Link>
          <Link href="/myarticles" className="hover:underline">
            my articles
          </Link>
        </nav>
        <div>
          <Image
            className="rounded-full"
            src={session?.user?.image || "/default-profile.png"}
            width={40}
            height={40}
            alt="profile image"
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <GithubProvider />
    </div>
  );
};

export default function Header({}) {
  return (
    <header className="py-10">
      <div className="container px-5 sm:px-0 mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">VanBlog</h1>
        <Navigations />
      </div>
    </header>
  );
}
