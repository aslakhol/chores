import Head from "next/head";
import { SideMenu } from "../compontents/SideMenu";
import { NewChoreForm } from "../compontents/NewChoreForm";

export default function New() {
  return (
    <>
      <Head>
        <title>New chore</title>
        <meta
          name="description"
          content="An app to keep track of reccuring chores"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex justify-between border-b border-black p-4 align-bottom">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            New chore
          </h4>
          <SideMenu />
        </div>
        <div className="p-8">
          <NewChoreForm />
        </div>
      </main>
    </>
  );
}
