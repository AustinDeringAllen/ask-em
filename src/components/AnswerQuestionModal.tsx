import { type FormEvent, useState } from "react";
import { MdKeyboardReturn } from "react-icons/md";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

export default function AnswerQuestionModal({
  qid,
  questionText,
  originalRoute,
  handleSubmit,
}: {
  qid: string;
  questionText: string;
  originalRoute: string;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    qid: string,
    answerText: string,
  ) => void;
}) {
  const router = useRouter();
  const [answerText, setAnswerText] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpenChange = () => {
    if (open) router.push(originalRoute);
    setOpen((prev) => !prev);
  };

  return (
    // open change doesn't account for clicking outside of the modal?
    <Dialog onOpenChange={handleOpenChange}>
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
