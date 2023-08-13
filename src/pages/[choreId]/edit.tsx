import Head from "next/head";
import { useRouter } from "next/router";
import { EditChoreForm } from "../../compontents/EditChoreForm";
import { SideMenu } from "../../compontents/SideMenu";

export default function Edit() {
  const router = useRouter();
  const { choreId } = router.query;

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
          <EditChoreForm />
        </div>
      </main>
    </>
  );
}
