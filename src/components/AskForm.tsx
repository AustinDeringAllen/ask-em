import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/utils/api";

type FormValue = {
  body: string;
};

const schema = z
  .object({
    body: z.string().min(1).max(255, { message: "Max Characters Exceeded" }),
  })
  .required();

const AskForm = ({ uid }: { uid: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: zodResolver(schema),
  });
  const questionMutation = api.question.create.useMutation();

  const onSubmit: SubmitHandler<FormValue> = (data) => {
    const fullData = { uid, body: data.body };
    questionMutation.mutate(fullData);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <textarea
        {...register("body")}
        className="border border-black"
        rows={5}
        cols={20}
      ></textarea>
      {errors.body && <p className="text-red-500">{errors.body.message}</p>}
      <input type="submit" />
    </form>
  );
};

export default AskForm;
