export const dynamic = "force-dynamic";

import Main from "./components/Main";

export default async function Home() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const familiesResponse = await fetch(`${baseUrl}/api/families`);
  const families = await familiesResponse.json();

  return <Main families={families} />;
}
