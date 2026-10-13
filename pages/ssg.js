import Head from "next/head"; // Imports tools for setting page metadata.

// This component receives a joke generated into the page's props.
export default function SSGPage({ joke }) {
  return (
    <>
      <Head>
        {/* Sets the browser tab title. */}
        <title>SSG - Rendering Lab</title>
      </Head>

      <main style={{ padding: "30px", fontFamily: "Arial" }}>
        <h1>Static Site Generation (SSG)</h1>

        {/* Displays the joke prepared during static generation. */}
        <p>{joke}</p>

        {/* Explains how the page data is updated. */}
        <p>Page regenerated approximately every 60 seconds.</p>

        {/* Reloads the page to test static generation behavior. */}
        <a href="/ssg">Reload page</a>
      </main>
    </>
  );
}

// Next.js runs this function to generate the page on the server.
export async function getStaticProps() {
  // Fetches a joke when the page is generated or regenerated.
  const response = await fetch(
    "https://official-joke-api.appspot.com/random_joke"
  );

  // Reports a failed API request instead of using invalid data.
  if (!response.ok) {
    throw new Error("Failed to fetch a joke");
  }

  // Reads the joke API response.
  const data = await response.json();

  // Combines the joke setup and punchline.
  const joke = `${data.setup} — ${data.punchline}`;

  // Returns the data and the static regeneration setting.
  return {
    props: {
      joke,
    },

    // Allows Next.js to regenerate the page after 60 seconds.
    revalidate: 60,
  };
}