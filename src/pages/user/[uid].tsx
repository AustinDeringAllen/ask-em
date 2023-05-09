import { type Answer, type Question } from "@prisma/client";
import { useRouter } from "next/router";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import AskForm from "~/components/AskForm";
import Header from "~/components/Header";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";

const UserPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { data: user } = api.user.getInfo.useQuery({
    uid: typeof uid === "string" ? uid : "",
  });
  const { data: userAnswers, refetch: refetchAnswers } =
    api.question.getAllAnswered.useQuery(
      { uid: user ? user.id : "" },
      {
        enabled: user !== null,
      }
    );
  const [answers, setAnswers] = useState<
    (Question & { answer: Answer | null })[] | undefined
  >();

  useEffect(() => {
    setAnswers(userAnswers);
  }, [userAnswers]);

  useEffect(() => {
    if (user) {
      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
      });

      const channel = pusher.subscribe(`user-${user.id}`);
      channel.bind("new-answer", async () => {
        await refetchAnswers();
      });
    }
  }, [refetchAnswers, user]);

  if (!user) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-screen-md">
          <h1>No User Found</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-md">
        <div className="mx-auto my-4 flex w-min items-center gap-4">
          <img
            src={user?.image ?? ""}
            alt={`${user?.name ?? "User"} Profile Picture`}
            className="h-32 w-32 rounded-full border-4 border-black"
          />
          <h1 className="text-5xl">{user?.name ?? "User"}</h1>
        </div>
        <div>
          <AskForm uid={user.id} />
        </div>
        <div className="flex flex-col">
          {answers &&
            answers.map((question) => (
              <div key={question.id}>
                <p key={question.id}>{question.body}</p>
                <p className="ml-1 border-l-2 border-gray-400 pl-2">
                  {question.answer?.body}
                </p>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default UserPage;
