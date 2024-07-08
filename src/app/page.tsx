import prisma from "../../lib/prisma";

export default async function Home() {
  const feed = await prisma.todo.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {feed.map((post: any) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </main>
  );
}
