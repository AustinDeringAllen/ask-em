import { type Question } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import AnswerForm from "~/components/AnswerForm";
import Header from "~/components/Header";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";

const AnswerPage = () => {
  const { data: session } = useSession();
  const { data: unanswered, refetch: refetchUnanswered } =
    api.question.getAllUnanswered.useQuery();
  const [unansweredQuestions, setUnansweredQuestions] = useState<
    Question[] | undefined
  >();

  useEffect(() => {
    setUnansweredQuestions(unanswered);
  }, [unanswered]);

  useEffect(() => {
    // Enable pusher logging - don't include this in production
    if (session?.user) {
      Pusher.logToConsole = true;

      const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
      });

      // TODO: Change this. This is the lazy way to do this I think.
      const channel = pusher.subscribe(`user-${session.user.id}`);
      channel.bind("new-answer", async () => {
        await refetchUnanswered();
      });
      channel.bind("new-question", async () => {
        await refetchUnanswered();
      });

      return () => {
        pusher.disconnect();
      };
    }
  }, [refetchUnanswered, session]);

  if (!session) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-screen-md">
          <h1>Not logged in</h1>
          <p>Please log in to answer any questions you may have</p>
          <Link href={"/"}>Home</Link>
        </main>
      </>
    );
  }

  // TODO: Update state and removed newly answered question from state
  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-md">
        {unansweredQuestions?.map((question) => (
          <div key={question.id}>
            <p>{question.body}</p>
            <AnswerForm qid={question.id} />
          </div>
        ))}
      </main>
    </>
  );
};

export default AnswerPage;
