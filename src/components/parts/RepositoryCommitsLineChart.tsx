import { fetchGitHubUserRepos, fetchGitHubCommits } from "@/lib";
import { Card, Title, LineChart } from "@tremor/react";
import { subDays, format } from "date-fns";

export async function RepositoryCommitsLineChart() {
  const { repos, recentCommits } = await fetchRepositoryCommits();

  return (
    <Card>
      <Title>Repository commits</Title>
      <LineChart
        className="mt-6"
        data={recentCommits}
        index="day"
        categories={repos.map((repo) => repo.name)}
      />
    </Card>
  );
}

async function fetchRepositoryCommits() {
  const repos = await fetchGitHubUserRepos({ perPage: 5 });

  if (!repos.success) {
    return { repos: [], recentCommits: [] };
  }

  const commits = await Promise.all(
    repos.data.map(async (repo) => {
      const commits = await fetchGitHubCommits(repo.commits_url);

      if (!commits.success) {
        return { repoName: repo.name, commitDateList: [] };
      }

      const commitDateList = commits.data.map((item) =>
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

      const repoListObj = commits.reduce((accumulator, currentValue) => {
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
      }, {});

      return { day: format(targetDate, "MM/dd"), ...repoListObj };
    })
    .reverse();

  return {
    repos: repos.data,
    recentCommits,
  };
}
