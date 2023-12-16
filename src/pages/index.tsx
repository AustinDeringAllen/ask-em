import { useEffect, useState } from "react";
import NewQuestionForm from "~/components/NewQuestionForm";
import RecentUsers from "~/components/RecentUsers";
import WorldWideQuestions from "~/components/WorldWideQuestions";
import { api } from "~/utils/api";

export default function Home() {
  const [publicQuestions, setPublicQuestions] = useState<typeof questionData>(
    [],
  );

  const { data: questionData } = api.question.getAllPublicQuestions.useQuery();
  useEffect(() => {
    if (questionData) setPublicQuestions(questionData);
  }, [questionData]);

  const addQuestion = (question: {
    id: string;
    body: string;
    createdAt: Date;
  }) => {
    setPublicQuestions((prev) => [...prev!, question]);
  };

  return (
    <>
      <main className="mx-auto max-w-screen-2xl">
        <RecentUsers />
        <section>
          <h2>Ask the world a question</h2>
          <div className="h-64 w-full bg-blue-500">
            <NewQuestionForm addQuestion={addQuestion} />
          </div>
        </section>
        <section>
          <h2>Checkout the latest questions</h2>
          <WorldWideQuestions questions={publicQuestions ?? []} />
        </section>
      </main>
    </>
  );
}
