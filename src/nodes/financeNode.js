const { getFinancialData } = require("../services/financeService");

async function financeNode(state) {
  console.log("Finance Node");

  const financialData = await getFinancialData(state.symbol);

  return {
    financialData,
  };
}

module.exports = financeNode;
