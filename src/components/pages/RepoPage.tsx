import { Title, Text, List, ListItem, Card, Bold } from "@tremor/react";
import { fetchGitHubRepoCommits } from "@/lib";

export async function RepoPage({ params }: { params: { slug: string[] } }) {
  const repoFullName = params.slug.join("/");

  const commits = await fetchGitHubRepoCommits({ repoFullName });

  return (
    <>
      <Title className="px-5">{repoFullName}</Title>
      <Card>
        <Title>Commits</Title>
        <List>
          {commits.success &&
            commits.data.map((commit) => (
              <ListItem key={commit.sha}>
                <div>
                  <div>
                    <div className="font-bold">{commit.sha}</div>
                  </div>
                  <div>
                    {`Author: ${commit.commit.committer.name} (${commit.commit.committer.email})`}
                  </div>
                  <div>Date: {commit.commit.committer.date}</div>
                  <div className="pl-3 py-2">{commit.commit.message}</div>
                </div>
              </ListItem>
            ))}
        </List>
      </Card>
    </>
  );
}
