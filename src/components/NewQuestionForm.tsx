import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { api } from "~/utils/api";

export default function NewQuestionForm({
  addQuestion,
}: {
  addQuestion: (question: {
    id: string;
    body: string;
    createdAt: Date;
  }) => void;
}) {
  const [questionText, setQuestionText] = useState<string>("");

  const newQuestionMutation = api.question.create.useMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (questionText.trim() === "") return;

    newQuestionMutation
      .mutateAsync({ uid: null, body: questionText })
      .then((question) => {
        const { uid, ...q } = question;
        addQuestion(q);
      })
      .catch((e) => console.log(e));

    setQuestionText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <Button type="submit">Ask the world</Button>
    </form>
  );
}
