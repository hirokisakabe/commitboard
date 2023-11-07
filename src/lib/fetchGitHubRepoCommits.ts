import { z } from "zod";
import { fetchFromGitHubApi } from "./fetchFromGitHubApi";

const GitHubRepoCommitsResponse = z.array(
  z.object({
    sha: z.string(),
    commit: z.object({
      committer: z.object({
        name: z.string(),
        email: z.string(),
        date: z.string(),
      }),
      message: z.string(),
    }),
  }),
);

type GitHubRepoCommitsResponse = z.infer<typeof GitHubRepoCommitsResponse>;

export async function fetchGitHubRepoCommits(params: { repoFullName: string }) {
  const commits = await fetchFromGitHubApi(
    `https://api.github.com/repos/${params.repoFullName}/commits`,
  );

  const res = GitHubRepoCommitsResponse.safeParse(commits);

  return res;
}
