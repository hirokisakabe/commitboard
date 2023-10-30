import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Center, LoginButton } from "../parts";
import { nextAuth } from "@/lib";
import { Metric, Subtitle } from "@tremor/react";

export async function RootPage() {
  const session = await getServerSession(nextAuth.authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <Center>
      <Metric className="py-3">Commit Board</Metric>
      <Subtitle className="py-1">GitHub Activity Dashboard App</Subtitle>
      <div className="py-10">
        <LoginButton />
      </div>
    </Center>
  );
}
