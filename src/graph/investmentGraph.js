const { StateGraph, START, END } = require("@langchain/langgraph");

const InvestmentState = require("./state");

const researchNode = require("../nodes/researchNode");
const analysisNode = require("../nodes/analysisNode");
const decisionNode = require("../nodes/decisionNode");
const financeNode = require("../nodes/financeNode");
const tickerNode = require("../nodes/tickerNode");
// Create the graph
const graph = new StateGraph(InvestmentState);

// Register the nodes
graph.addNode("researchNode", researchNode);
graph.addNode("analysisNode", analysisNode);
graph.addNode("decisionNode", decisionNode);
graph.addNode("financialDataNode", financeNode);
graph.addNode("tickerResolver", tickerNode);
// Connect the nodes
graph.addEdge(START, "tickerResolver");
graph.addEdge("tickerResolver", "researchNode");
graph.addEdge("researchNode", "financialDataNode");
graph.addEdge("financialDataNode", "analysisNode");
graph.addEdge("analysisNode", "decisionNode");
graph.addEdge("decisionNode", END);

// Compile the graph
const investmentGraph = graph.compile();

// Export it
module.exports = investmentGraph;
