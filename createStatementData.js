module.exports = statementData = function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerfomance);   //Loop sobre todas las perfomances
    for (let perf of statementData.performances) {
         perf.amount = amountFor(perf);
    }
    statementData.totalAmount = totalAmount();
    statementData.totalVolumeCredits = totalVolumeCredits();
    
    function enrichPerfomance(aPerfomance) {
       const result = Object.assign({}, aPerfomance);     //Autocopia el arreglo
       result.play = playFor(result);       
       return result;
    }

    function playFor(aPerformance) {
       return plays[aPerformance.playID];
    }    
    
    function totalVolumeCredits() {
      return statementData.performances.reduce((a,b)=>a+volumeCreditsFor(b),0);
   }

   function totalAmount() {
      return statementData.performances.reduce((a,b)=>a+amountFor(b),0);
   }

   function volumeCreditsFor(aPerfomance) {
      let result = 0;

        // add volume credits
      result = Math.max(aPerfomance.audience - 30, 0);
        // add extra credit for every ten comedy attendees
      if ("comedy" === aPerfomance.play.type) result += Math.floor(aPerfomance.audience / 5);
      
      return result;
   }

   function amountFor(aPerformance) {
      let result = 0; 
      switch (aPerformance.play.type) {
         case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
               result += 1000 * (aPerformance.audience - 30);
            }
            break;
         case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
               result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
         default:
            throw new Error(`unknown type: ${aPerformance.play.type}`);
      }
      return result;
   }

   return statementData;

}
