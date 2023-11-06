import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Repositories, RepositoryCommitsLineChart } from "../parts";
import { nextAuth } from "@/lib";
import { Grid, Col } from "@tremor/react";

export async function DashboardPage() {
  const session = await getServerSession(nextAuth.authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <Grid numItems={1} className="gap-4">
      <Col>
        <RepositoryCommitsLineChart />
      </Col>
      <Col>
        <Repositories />
      </Col>
    </Grid>
  );
}
