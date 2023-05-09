import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  return (
    <header className="bg-blue-500 p-5">
      <div className="mx-auto flex max-w-screen-md items-center justify-between">
        <div>Ask-Em</div>
        <SignInOut />
      </div>
    </header>
  );
};

export default Header;

const SignInOut = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <button onClick={() => void signIn()}>Sign In</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <img
        src={session.user.image ?? ""}
        alt={`${session.user.name ?? "User"} Profile Picture`}
        className="h-8 w-8 rounded-full"
      />
      <p onClick={() => void signOut()}>{session.user.name ?? "User"}</p>
    </div>
  );
};
