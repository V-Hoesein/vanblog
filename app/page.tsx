import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const fetchDummy = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .catch((error) => console.error("Error fetching dummy data:", error));

  return response;
};

export default async function Home() {
  const data = await fetchDummy();

  return (
    <main className="container px-5 sm:px-0 mx-auto">
      <section className="font-semibold text-center capitalize my-28">
        <h2 className="text-xl sm:text-3xl">welcome to vanblog!</h2>
        <h3 className="text-2xl sm:text-4xl">what do you want to do today?</h3>
      </section>
      <section className="flex justify-between mb-10">
        <form className="">
          <Input
            className="rounded-full py-7 px-8 bg-white text-lg"
            name="title"
            placeholder="Search article by title"
          />
        </form>
      </section>
      <section className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {data.map((post) => {
          return (
            <Card key={post.id}>
              <CardTitle className="text-lg p-6 capitalize">
                <Link href="#">{post.title}</Link>
              </CardTitle>
              <CardContent>{post.body}</CardContent>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
