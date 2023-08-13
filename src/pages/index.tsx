import Head from "next/head";
import { api } from "~/utils/api";
import { SideMenu } from "../compontents/SideMenu";
import { ChoreList } from "../compontents/ChoreList";

export default function Home() {
  const choresQuery = api.chore.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Chores</title>
        <meta
          name="description"
          content="An app to keep track of recurring chores"
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

        {!choresQuery.isInitialLoading && choresQuery.isSuccess && (
          <ChoreList chores={choresQuery.data} />
        )}
      </main>
    </>
  );
}
