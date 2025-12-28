// server component
export default async function Books() {
  const response = await fetch("http://localhost:3000/api/books", {
    cache: "no-store",
  });

  const books = await response.json();

  return (
    <main>
      {books.map((b: any) => (
        <p key={b.id}>{b.name}</p>
      ))}
    </main>
  );
}
