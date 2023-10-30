import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Center, LoginButton } from "../parts";
import { nextAuth } from "@/lib";

export async function DashboardPage() {
  const session = await getServerSession(nextAuth.authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <Center>
      <LoginButton />
    </Center>
  );
}