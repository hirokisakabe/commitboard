import { z } from "zod";
import { fetchFromGitHubApi } from "./fetchFromGitHubApi";

const GitHubCommitsResponse = z.array(
  z.object({
    commit: z.object({
      author: z.object({
        date: z.string(),
      }),
    }),
  }),
);

type GitHubCommitsResponse = z.infer<typeof GitHubCommitsResponse>;

export async function fetchGitHubCommits(commitsUrl: string) {
  const url = commitsUrl.replaceAll("{/sha}", "");

  const commits = await fetchFromGitHubApi(url);

  return GitHubCommitsResponse.safeParse(commits);
}
