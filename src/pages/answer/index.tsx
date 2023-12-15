import { useSession } from "next-auth/react";
import UserQuestionList from "~/components/UserQuestionList";

export default function AnswerPage() {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <main>Not logged in :(</main>;
  }

  const uid = sessionData.user.id;

  return (
    <main className="mx-auto mt-12 max-w-screen-2xl space-y-6">
      <h1 className="text-5xl font-bold">Questions you've been asked</h1>
      <UserQuestionList uid={uid} />
    </main>
  );
}
