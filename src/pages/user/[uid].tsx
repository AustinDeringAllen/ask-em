import Image from "next/image";
import { useRouter } from "next/router";
import NewQuestionModal from "~/components/NewQuestionModal";
import UserQuestionList from "~/components/UserQuestionList";
import { api } from "~/utils/api";

export default function UserPage() {
  const router = useRouter();

  const { data: userPageData, isLoading } = api.user.getUserPage.useQuery({
    uid: typeof router.query.uid === "string" ? router.query.uid : "",
  });

  if (isLoading) return <main>Loading...</main>;

  if (!userPageData) return <main>User Not Found</main>;

  return (
    <main className="mx-auto mt-12 max-w-screen-2xl space-y-6">
      <div className="mx-auto flex w-min items-center gap-2.5">
        {userPageData.image ? (
          <div className="relative h-16 w-16">
            <Image
              src={userPageData.image ?? ""}
              fill
              objectFit="cover"
              alt=""
              className="rounded-full border border-black"
            />
          </div>
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 text-3xl capitalize">
            {(userPageData.name?.match(/[a-zA-Z]/) ?? ["?"])?.pop()}
          </div>
        )}

        <h2 className="text-5xl capitalize">{userPageData.name ?? "User"}</h2>
      </div>

      <div className="flex justify-center">
        <NewQuestionModal
          uid={typeof router.query.uid === "string" ? router.query.uid : ""}
          username={userPageData.name ?? "User"}
        />
      </div>

      <h2 className="text-center text-4xl">Recently answered questions</h2>
      <UserQuestionList
        uid={typeof router.query.uid === "string" ? router.query.uid : ""}
      />
      {userPageData.questions.length > 0 ? (
        <ul>
          {userPageData.questions.map((question) => (
            <li key={question.id} className="">
              <div>
                <h3 className="text-3xl font-bold">{question.body}</h3>
                <p className="text-lg">{question.answer[0]?.body}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <span className="capitalize">{userPageData.name}</span> hasn't
          answered any questions yet.
        </p>
      )}
    </main>
  );
}
