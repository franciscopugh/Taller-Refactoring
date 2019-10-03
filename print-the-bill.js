const createStatementData = require('./createStatementData');

module.exports = statement = function (invoice, plays) {
      return renderPlainText(createStatementData(invoice, plays));      
}

function renderPlainText(data) {
   let result = `Statement for ${data.customer}\n`;

   for (let perf of data.performances) {
      result += `  ${perf.play.name}: ${usd(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
   }

   result += `Amount owed is ${usd(totalAmount() / 100)}\n`;
   result += `You earned ${totalVolumeCredits()} credits\n`;
   return result;

   function totalVolumeCredits() {
      return data.performances.reduce((a,b)=>a+volumeCreditsFor(b),0);
   }

   function totalAmount() {
      return data.performances.reduce((a,b)=>a+amountFor(b),0);
   }

   function usd(aNumber) {

      return new Intl.NumberFormat("en-US",
      {
         style: "currency", currency: "USD",
         minimumFractionDigits: 2
      }).format(aNumber);

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

}