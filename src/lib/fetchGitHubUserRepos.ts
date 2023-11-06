import { z } from "zod";
import { fetchFromGitHubApi } from "./fetchFromGitHubApi";

const GitHubUserReposResponse = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    full_name: z.string(),
    commits_url: z.string(),
  }),
);

type GitHubUserReposResponse = z.infer<typeof GitHubUserReposResponse>;

export async function fetchGitHubUserRepos(params: { perPage: number }) {
  const urlSearchParam = new URLSearchParams({
    type: "owner",
    sort: "updated",
    per_page: params.perPage.toString(),
  }).toString();

  const commits = await fetchFromGitHubApi(
    "https://api.github.com/user/repos?" + urlSearchParam,
  );

  const res = GitHubUserReposResponse.safeParse(commits);

  return res;
}
