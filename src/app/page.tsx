export const dynamic = "force-dynamic";

import Main from "./components/Main";

export default async function Home() {
  const baseUrl =
    process.env.BASE_URL || "https://wedding-food-collection.vercel.app/";
  const familiesResponse = await fetch(`${baseUrl}/api/families`);
  const families = await familiesResponse.json();

  return <Main families={families} />;
}
