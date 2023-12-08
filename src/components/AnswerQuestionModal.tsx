import { type FormEvent, useState } from "react";
import { MdKeyboardReturn } from "react-icons/md";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { api } from "~/utils/api";

export default function AnswerQuestionModal({
  qid,
  questionText,
  handleSubmit,
}: {
  qid: string;
  questionText: string;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    qid: string,
    answerText: string,
  ) => void;
}) {
  const [answerText, setAnswerText] = useState("");

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="group">
          Answer Question
          <MdKeyboardReturn className="ml-2 h-full w-full group-hover:fill-blue-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4 p-12">
        <div>{questionText}</div>
        <form
          onSubmit={(e) => {
            handleSubmit(e, qid, answerText);
            setAnswerText("");
          }}
          className="space-y-6"
        >
          <Textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            className="resize-none"
          />
          <div className="flex justify-center">
            <DialogClose>
              <Button type="submit">Answer this question</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}