import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import {
  Repositories,
  RepositoryCommitsDonutChart,
  RepositoryCommitsLineChart,
} from "../parts";
import { nextAuth } from "@/lib";
import { Grid, Col } from "@tremor/react";

export async function DashboardPage() {
  const session = await getServerSession(nextAuth.authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <Grid numItems={2} className="gap-4">
      <Col numColSpan={2}>
        <RepositoryCommitsLineChart />
      </Col>
      <Col>
        <Repositories />
      </Col>
      <Col>
        <RepositoryCommitsDonutChart />
      </Col>
    </Grid>
  );
}
