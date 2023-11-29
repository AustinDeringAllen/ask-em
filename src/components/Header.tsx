import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header className="h-16 w-screen bg-black">
      <div className="relative mx-auto flex h-full w-full max-w-screen-2xl items-center justify-end gap-4 px-12 text-white">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Link href={"/"} className="uppercase">
            Ask-Em
          </Link>
        </div>
        <AuthButton />
      </div>
    </header>
  );
}
