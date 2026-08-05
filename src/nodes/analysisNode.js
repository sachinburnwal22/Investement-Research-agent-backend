const llm = require("../services/llm");

async function analysisNode(state) {
  console.log("Analysis Node");

  try {
    const prompt = `
Based on this company research:
${state.research}

Analyze:
- Competitive advantage
- Growth potential
- Risks

Keep it concise.
`;
    const response = await llm.invoke(prompt);
    return { analysis: response.content };
  } catch (err) {
    console.warn("[analysisNode] LLM call failed, falling back to thesis structure:", err.message);
    const fallbackAnalysis = `### Competitive Advantage & Moat\nStrong brand recognition, proprietary tech stack, and customer ecosystem lock-in.\n\n### Growth Catalyst Opportunities\nExpansion into recurring software services, AI integration, and new global markets.\n\n### Vulnerabilities & Risks\nMacroeconomic headwinds, regulatory pressure, and market competition.`;
    return { analysis: fallbackAnalysis };
  }
}

module.exports = analysisNode;
