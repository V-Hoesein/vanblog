import Link from "next/link"

const AuthFooter = () => {
  return (
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
  )
}
export default AuthFooter