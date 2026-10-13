import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Next.js Rendering Lab</h1>
      <p>Explore three rendering strategies.</p>

      <ul>
        <li><Link href="/ssr">Server-Side Rendering</Link></li>
        <li><Link href="/ssg">Static Site Generation</Link></li>
        <li><Link href="/csr">Client-Side Rendering</Link></li>
      </ul>
    </main>
  );
}