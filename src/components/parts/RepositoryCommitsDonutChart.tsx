import { fetchGitHubCommits, fetchGitHubUserRepos } from "@/lib";
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
  const repos = await fetchGitHubUserRepos({ perPage: 5 });

  if (!repos.success) {
    return { recentCommitCounts: [] };
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

  const recentCommitCounts = repos.data.map((repo: { name: string }) => {
    return {
      name: repo.name,
      value: recentCommits.reduce((accumulator: any, currentValue: any) => {
        return accumulator + currentValue[repo.name];
      }, 0),
    };
  });

  return { recentCommitCounts };
}
