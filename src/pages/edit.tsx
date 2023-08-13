import Head from "next/head";
import { SideMenu } from "../compontents/SideMenu";
import { api } from "../utils/api";
import { EditChoresList } from "../compontents/EditChoresList";

export default function Edit() {
  const choresQuery = api.chore.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Edit chore</title>
        <meta
          name="description"
          content="An app to keep track of reccuring chores"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex justify-between border-b border-black p-4 align-bottom">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Edit chore
          </h4>
          <SideMenu />
        </div>
        <div className="p-8">
          {!choresQuery.isInitialLoading && choresQuery.isSuccess && (
            <EditChoresList chores={choresQuery.data} />
          )}
        </div>
      </main>
    </>
  );
}
