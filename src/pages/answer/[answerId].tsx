import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function IndividualAnswer() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  // Probably bring the following into its own component so it will run when bottom portion is loaded
  const { data: question, isLoading } = api.question.getQuestionById.useQuery({
    qid: typeof router.query.answerId === "string" ? router.query.answerId : "",
  });

  if (!sessionData) {
    return (
      <main>
        <h1>Not Authorized</h1>
        <p>Please log in</p>
      </main>
    );
  }

  if (isLoading) {
    return <main>Loading...</main>;
  }

  return (
    <main>{question ? <h1>{question.body}</h1> : <h1>No answer</h1>}</main>
  );
}
