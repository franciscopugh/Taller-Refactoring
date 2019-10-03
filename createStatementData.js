module.exports = function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerfomance);   //Loop sobre todas las perfomances
  
    function enrichPerfomance(aPerfomance) {
       const result = Object.assign({}, aPerfomance);     //Autocopia el arreglo
       result.play = playFor(result);              
       return result;
    }

    function playFor(aPerformance) {
       return plays[aPerformance.playID];
    }    
    return statementData;
}
