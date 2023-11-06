import { fetchFromGitHubApi } from "@/lib";
import { Card, Title, Text, DonutChart } from "@tremor/react";
import { subDays, format } from "date-fns";

export async function RepositoryCommitsDonutChart() {
  const { recentCommitCounts } = await fetchRepositoryCommits();

  return (
    <Card>
      <Title>Number of Commits per Repository</Title>
      <DonutChart
        className="mt-6 h-80"
        data={recentCommitCounts}
        index="name"
        category="value"
      />
      <Text>Number of commits per repository over the last 30 days</Text>
    </Card>
  );
}

async function fetchRepositoryCommits() {
  const repos = await fetchFromGitHubApi(
    "https://api.github.com/user/repos?type=owner&sort=updated&per_page=5",
  );

  const commits = await Promise.all(
    repos.map(async (repo: { commits_url: string; name: string }) => {
      const commits = await fetchFromGitHubApi(
        repo.commits_url.replaceAll("{/sha}", ""),
      );

      const commitDateList = commits.map(
        (item: { commit: { author: { date: string } } }) =>
          format(new Date(item.commit.author.date), "yyyy-MM-dd"),
      );

      return { repoName: repo.name, commitDateList };
    }),
  );

  const today = new Date();

  const recentCommits = [...Array(30)]
    .map((_, i) => i)
    .map((i) => {
      const targetDate = subDays(today, i);

      const repoListObj = commits.reduce(
        (accumulator: any, currentValue: any) => {
          let count = 0;

          currentValue.commitDateList.forEach((commit: string) => {
            if (commit === format(targetDate, "yyyy-MM-dd")) {
              count = count + 1;
            }
          });

          return {
            ...accumulator,
            [currentValue.repoName]: count,
          };
        },
        {},
      );

      return { day: format(targetDate, "MM/dd"), ...repoListObj };
    })
    .reverse();

  const recentCommitCounts = repos.map((repo: { name: string }) => {
    return {
      name: repo.name,
      value: recentCommits.reduce((accumulator: any, currentValue: any) => {
        return accumulator + currentValue[repo.name];
      }, 0),
    };
  });

  return { recentCommitCounts };
}
