import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { type recentUsers } from "~/utils/types";

export default function RecentUsers() {
  const [recentUsers, setRecentUsers] = useState<recentUsers[]>([]);
  const { data: recentData } = api.user.getRecent.useQuery();

  useEffect(() => {
    if (recentData) setRecentUsers(recentData);
  }, [recentData]);

  return (
    <section className="mt-8 space-y-8">
      <h2 className="text-center text-5xl">
        Show our most recent users some love by asking them questions!
      </h2>
      <div className="mx-auto flex w-1/2 gap-2">
        {recentUsers.map((user) => (
          <Link
            key={user.id}
            href={`/user/${user.id}`}
            className="flex w-1/5 flex-col items-center justify-center rounded-lg bg-blue-300 p-4"
          >
            {user.image ? (
              <div className="relative h-8 w-8">
                <Image
                  src={user.image}
                  fill
                  objectFit="cover"
                  alt={`Profile Picture for ${user.name}`}
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-300">
                {(user.name?.match(/[a-zA-Z]/) ?? ["?"]).pop()}
              </div>
            )}
            <p className="capitalize">{user.name ?? "User"}</p>
            <p>has {user._count.questions} questions</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
