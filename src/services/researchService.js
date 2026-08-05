const { tavily } = require("@tavily/core");

const client = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

async function searchCompany(company) {
  const response = await client.search(
    `${company} latest company overview financial news`,
    {
      searchDepth: "basic",
      maxResults: 5,
    },
  );

  return response.results.map((item) => item.content).join("\n\n");
}

module.exports = {
  searchCompany,
};
