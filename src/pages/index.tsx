import Head from "next/head";
import { api } from "~/utils/api";
import { SideMenu } from "../compontents/SideMenu";
import { useEffect } from "react";

export default function Home() {
  const choresQuery = api.chore.getAll.useQuery();

  useEffect(() => {
    console.log(choresQuery.data, "choresQuery.data");
  }, [choresQuery.data]);

  return (
    <>
      <Head>
        <title>Chores</title>
        <meta
          name="description"
          content="An app to keep track of reccuring chores"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex justify-between border-b border-black p-4 align-bottom">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Chores
          </h4>
          <SideMenu />
        </div>
      </main>
    </>
  );
}
