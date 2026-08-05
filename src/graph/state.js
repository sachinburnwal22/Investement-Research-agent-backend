const { Annotation } = require("@langchain/langgraph");

const InvestmentState = Annotation.Root({
  company: Annotation(),

  symbol: Annotation(),

  research: Annotation(),

  financialData: Annotation(),

  analysis: Annotation(),

  recommendation: Annotation(),

  confidence: Annotation(),

  strengths: Annotation(),

  risks: Annotation(),

  summary: Annotation(),
});

module.exports = InvestmentState;
