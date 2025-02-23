import { CircleChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h2 className="text-2xl capitalize">😖uppss... page not found</h2>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        className="flex gap-x-1 items-center animate-pulse capitalize mt-5 hover:underline"
      >
        <CircleChevronLeft />
        <span>back to home</span>
      </Link>
    </div>
  );
}
