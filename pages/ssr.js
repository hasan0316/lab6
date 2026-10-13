import Head from "next/head"; // Imports Next.js tools for setting page metadata.

// This component receives the joke fetched by the server.
export default function SSRPage({ joke }) {
  return (
    <>
      <Head>
        {/* Sets the title displayed in the browser tab. */}
        <title>SSR - Rendering Lab</title>
      </Head>

      <main style={{ padding: "30px", fontFamily: "Arial" }}>
        <h1>Server-Side Rendering (SSR)</h1>

        {/* Displays the joke received from the server. */}
        <p>{joke}</p>

        {/* Explains when the data is fetched. */}
        <p>Joke fetched on the server for this request.</p>

        {/* Clicking this link requests the page again. */}
        <a href="/ssr">Fetch another joke</a>
      </main>
    </>
  );
}

// Next.js runs this function on the server for each page request.
export async function getServerSideProps() {
  // Sends an HTTP request to an external joke API.
  const response = await fetch(
    "https://official-joke-api.appspot.com/random_joke"
  );

  // Stops execution if the API returns an unsuccessful status.
  if (!response.ok) {
    throw new Error("Failed to fetch a joke");
  }

  // Converts the API response from JSON into a JavaScript object.
  const data = await response.json();

  // Combines the joke's setup and punchline into one string.
  const joke = `${data.setup} — ${data.punchline}`;

  // Sends the fetched joke to the page as a prop.
  return {
    props: {
      joke,
    },
  };
}