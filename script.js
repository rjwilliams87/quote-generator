// DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// global quotes variable
let apiQuotes = [];

// constants
const LARGE_QUOTE_LENGTH = 120;
const QUOTES_API_URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
const TWITTER_URL = "https://twitter.com/intent/tweet";

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// get quotes and populate DOM
async function getQuotes() {
  loading();
  try {
    const res = await fetch(QUOTES_API_URL);
    apiQuotes = await res.json();
    newQuote();
  } catch (error) {
    // handle error
  }
}

// get random quote from apiQuotes
function newQuote() {
  loading();
  const index = Math.floor(Math.random() * apiQuotes.length);
  populateDomText(apiQuotes[index]);
}

// populate quote and author text in DOM
function populateDomText(quote) {
  try {
    const { author, text } = quote;

    // set author default to unknown if author is falsy
    authorText.textContent = author ?? "Unknown";

    // check quote length then set styling
    if (text.length > 75) quoteText.classList.add("long-quote");
    else quoteText.classList.remove("long-quote");

    // set quote and hide loader
    quoteText.textContent = text;
    complete();
  } catch (error) {
    // handle error
  }
}

// tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();
