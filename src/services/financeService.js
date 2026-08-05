const YahooFinance = require("yahoo-finance2").default;
const yahooFinance = new YahooFinance();

async function getFinancialData(ticker) {
  let quote = null;
  try {
    quote = await yahooFinance.quote(ticker);
  } catch (error) {
    console.warn(`[financeService] Failed to fetch quote for "${ticker}":`, error.message);
  }

  let summary = null;
  try {
    summary = await yahooFinance.quoteSummary(ticker, {
      modules: ["financialData", "defaultKeyStatistics"],
    });
  } catch (error) {
    console.warn(`[financeService] Failed to fetch quoteSummary for "${ticker}":`, error.message);
  }

  return {
    price: quote?.regularMarketPrice || null,
    marketCap: quote?.marketCap || null,
    revenue: summary?.financialData?.totalRevenue || null,
    profitMargins: summary?.financialData?.profitMargins || null,
    debtToEquity: summary?.financialData?.debtToEquity || null,
  };
}

module.exports = {
  getFinancialData,
};
