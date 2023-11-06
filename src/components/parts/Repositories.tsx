import { fetchGitHubUserRepos } from "@/lib";
import { Card, Title } from "@tremor/react";
import Link from "next/link";

export async function Repositories() {
  const repos = await fetchGitHubUserRepos({ perPage: 10 });

  return (
    <Card>
      <Title>Repositories</Title>
      {repos.success &&
        repos.data.map((d) => (
          <div key={d.id} className="px-3 py-1">
            <div className="px-4 rounded-lg">
              <Link
                className="text-blue-700 hover:underline"
                href={`/dashboard/repo/${d.full_name}`}
              >
                {d.full_name}
              </Link>
            </div>
          </div>
        ))}
    </Card>
  );
}
