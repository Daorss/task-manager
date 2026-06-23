// Public API: a free, no-key source of motivational quotes (ZenQuotes).
const QUOTE_URL = "https://zenquotes.io/api/random";

export type Quote = {
  text: string;
  author: string;
};

// The shape ZenQuotes returns: an array with a single quote object
// ({ q: quote, a: author, h: html }).
type ApiQuote = {
  q: string;
  a: string;
};

// Fetch one random motivational quote and map it into our Quote model.
export async function fetchQuote(): Promise<Quote> {
  const res = await fetch(QUOTE_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch quote: ${res.status}`);
  }
  const data: ApiQuote[] = await res.json();
  const first = data[0];
  return {
    text: first.q.trim(),
    author: first.a.trim(),
  };
}
