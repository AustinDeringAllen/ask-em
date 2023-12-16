import { useSession } from "next-auth/react";
import AnswerQuestionModal from "./AnswerQuestionModal";
import { type FormEvent } from "react";
import Link from "next/link";

export default function WorldWideQuestions({
  questions,
}: {
  questions: { id: string; body: string; createdAt: Date }[];
}) {
  const { data: sessionData } = useSession();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      {questions.map((question) => {
        return (
          <div key={question.id}>
            <p>{question.body}</p>
            {sessionData && (
              <Link href={`/`} as={`/answer/${question.id}`}>
                <AnswerQuestionModal
                  qid={question.id}
                  questionText={question.body}
                  originalRoute="/"
                  handleSubmit={handleSubmit}
                />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
