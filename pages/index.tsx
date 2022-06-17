import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { queryApi } from "../utils";

const Home: NextPage = () => {
  const router = useRouter();
  const [result, setResult] = useState("Click Button to Fetch Data");

  const onClick = async () => {
    const res = await queryApi(`
      query {
        usagis {
          id
          name {
            en
            ja
          }
          image
        }
      }
    `);

    setResult(JSON.stringify(res));
  };

  return (
    <div>
      <main className="flex flex-col justify-center items-center text-center h-screen gap-4">
        <h1 className="text-6xl font-bold">Yahallo!</h1>
        <button
          className="border border-gray-600 rounded-lg p-1 text-2xl"
          onClick={onClick}
        >
          Fetch Data
        </button>
        <p>{result}</p>

        <button
          className="border-2 border-purple-600 rounded-xl p-2 text-3xl text-purple-800"
          onClick={() => router.push("/api/graphql")}
        >
          Go to GraphQL Playground
        </button>
      </main>
    </div>
  );
};

export default Home;
