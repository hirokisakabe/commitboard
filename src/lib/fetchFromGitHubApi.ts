import { getAccessToken } from "./getAccessToken";

export async function fetchFromGitHubApi(url: string) {
  const accessToken = await getAccessToken();

  if (accessToken.isFailure) {
    throw new Error(accessToken.value);
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken.value}` },
    next: {
      revalidate: 60,
    },
  });

  return res.json();
}
