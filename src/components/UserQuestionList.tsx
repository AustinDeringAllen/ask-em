import { type FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Question from "./Question";
import { MdDeleteOutline } from "react-icons/md";
import AnswerQuestionModal from "./AnswerQuestionModal";

export default function UserQuestionList({ uid }: { uid: string }) {
  const [questions, setQuestions] = useState<typeof userQuestions>();
  const { data: userQuestions } = api.question.getUserQuestions.useQuery({
    uid,
  });
  const deleteMutation = api.question.deleteById.useMutation();
  const answerMutation = api.answer.newAnswer.useMutation();

  const handleDelete = (qid: string) => {
    deleteMutation
      .mutateAsync({ qid })
      .then((oldQuestion) =>
        setQuestions((prev) => {
          return [...prev!].filter((el) => el.id !== oldQuestion.id);
        }),
      )
      .catch((e) => console.log(e));
  };

  const handleAnswerSubmit = (
    e: FormEvent<HTMLFormElement>,
    qid: string,
    answerText: string,
  ) => {
    e.preventDefault();
    answerMutation.mutate({ qid: qid, answerBody: answerText });
    setQuestions((prev) => [...prev!].filter((el) => el.id !== qid));
  };

  useEffect(() => {
    if (userQuestions) console.log(userQuestions);
    if (userQuestions) setQuestions(userQuestions);
  }, [userQuestions]);

  if (!questions?.length)
    return <h2>You haven't been asked any questions yet</h2>;

  return (
    <div className="space-y-12">
      {questions?.map((question) => (
        <div key={question.id}>
          <div className="flex items-center gap-4">
            <div
              onClick={() => handleDelete(question.id)}
              className="h-8 w-8 cursor-pointer"
            >
              <MdDeleteOutline className="h-full w-full hover:fill-red-500" />
            </div>
            <Question question={question.body} />
          </div>
          <div>
            <AnswerQuestionModal
              qid={question.id}
              questionText={question.body}
              handleSubmit={handleAnswerSubmit}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
