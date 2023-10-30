import { fetchFromGitHubApi } from "@/lib";
import { Card, Title } from "@tremor/react";
import Link from "next/link";

export async function Repositories() {
  const { repos } = await fetchRepositories();

  return (
    <Card>
      <Title>Repositories</Title>
      {repos.map((d: any) => (
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

async function fetchRepositories() {
  const repos = await fetchFromGitHubApi("https://api.github.com/user/repos");

  return { repos };
}
