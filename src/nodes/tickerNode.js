const llm = require("../services/llm");

const TICKER_MAP = {
  TESLA: "TSLA",
  APPLE: "AAPL",
  NVIDIA: "NVDA",
  MICROSOFT: "MSFT",
  GOOGLE: "GOOGL",
  AMAZON: "AMZN",
  META: "META",
  NETFLIX: "NFLX",
  AMD: "AMD",
};

async function tickerNode(state) {
  console.log("Ticker Resolver Node");
  const cleanCompany = (state.company || "").trim().toUpperCase();

  try {
    const prompt = `Return only the stock ticker symbol for this company: ${state.company}. Example: Tesla -> TSLA, Apple -> AAPL. Only return the ticker.`;
    const response = await llm.invoke(prompt);
    const resolved = response.content.trim().toUpperCase();
    return { symbol: resolved.length <= 5 ? resolved : (TICKER_MAP[cleanCompany] || cleanCompany) };
  } catch (err) {
    console.warn("[tickerNode] LLM call failed, falling back to lookup map:", err.message);
    const resolved = TICKER_MAP[cleanCompany] || cleanCompany;
    return { symbol: resolved };
  }
}

module.exports = tickerNode;
