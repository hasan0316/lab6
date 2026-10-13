import { useEffect, useState } from "react"; // Imports React hooks for state and side effects.
import Head from "next/head"; // Imports tools for setting page metadata.

export default function CSRPage() {
  // Stores the joke; it starts empty because no joke has been fetched.
  const [joke, setJoke] = useState("");

  // Tracks whether the request is still running.
  const [loading, setLoading] = useState(true);

  // Stores an error message if fetching fails.
  const [error, setError] = useState("");

  // Runs in the browser after the component mounts.
  useEffect(() => {
    // Defines an asynchronous function to fetch a joke.
    async function fetchJoke() {
      try {
        // Requests a joke directly from the browser.
        const response = await fetch(
          "https://official-joke-api.appspot.com/random_joke"
        );

        // Checks whether the API request succeeded.
        if (!response.ok) {
          throw new Error("Failed to fetch a joke");
        }

        // Converts the response into a JavaScript object.
        const data = await response.json();

        // Saves the joke in React state, updating the page.
        setJoke(`${data.setup} — ${data.punchline}`);
      } catch (err) {
        // Displays a useful message if the request fails.
        setError("Could not load a joke. Please try again.");
      } finally {
        // Ends the loading state whether the request succeeds or fails.
        setLoading(false);
      }
    }

    // Starts the request when the page component mounts.
    fetchJoke();
  }, []); // An empty dependency array means this effect runs on mount.

  // Renders the page in the browser.
  return (
    <>
      <Head>
        <title>CSR - Rendering Lab</title>
      </Head>

      <main style={{ padding: "30px", fontFamily: "Arial" }}>
        <h1>Client-Side Rendering (CSR)</h1>

        {/* Displays loading, error, or the fetched joke. */}
        {loading ? (
          <p>Loading joke...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>{joke}</p>
        )}

        {/* Reloads the page to run the browser-side fetch again. */}
        <a href="/csr">Reload page</a>
      </main>
    </>
  );
}