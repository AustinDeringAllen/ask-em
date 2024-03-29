import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { api } from "~/utils/api";

export default function NewQuestionModal({
  uid,
  username,
}: {
  uid: string;
  username: string;
}) {
  const newQuestionMutation = api.question.create.useMutation();
  const [questionText, setQuestionText] = useState("");
  const string = `Ask ${username} a question`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (questionText.trim() === "") return;
    e.preventDefault();
    newQuestionMutation.mutate({ uid, body: questionText });
    setQuestionText("");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>{string}</Button>
      </DialogTrigger>
      <DialogContent className="p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="resize-none"
          />
          <div className="flex justify-center">
            <DialogClose>
              <Button type="submit">Ask your question</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
