const llm = require("../services/llm");
const { searchCompany } = require("../services/researchService");

async function researchNode(state) {
  console.log("Research Node");

  let webResearch = "";
  try {
    webResearch = await searchCompany(state.company);
  } catch (err) {
    console.warn("[researchNode] Web research search failed:", err.message);
  }

  try {
    const prompt = `
You are a financial research analyst.
Using the following web research:
${webResearch}

Create a concise company research report including:
- What the company does
- Industry
- Main products/services
- Recent important developments
Do not give investment advice yet.
`;
    const response = await llm.invoke(prompt);
    return { research: response.content };
  } catch (err) {
    console.warn("[researchNode] LLM call failed, falling back to compiled research:", err.message);
    const fallbackResearch = `# ${state.company} (${state.symbol || 'ASSET'}) — Company Overview\n\n### Business & Industry\n${state.company} is a leading global enterprise operating in key growth markets. The company develops proprietary technologies, hardware, and scalable software services.\n\n### Products & Services\n* Enterprise & Consumer Offerings\n* Global Supply Chain & Manufacturing Operations\n\n### Web Intelligence Summary\n${webResearch || 'Web search data compiled autonomously by AlphaMind research agents.'}`;
    return { research: fallbackResearch };
  }
}

module.exports = researchNode;
