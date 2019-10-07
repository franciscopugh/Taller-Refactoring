const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const print_the_bill = require('../../statement');
const print_the_bill2 = require('../../statementHTML')

Given('el listado de la facturación de espectáculos', function (espectaculos) {
   this.invoice = JSON.parse(espectaculos);
});

Given('la lista de obras', function (obras) {
   this.play = JSON.parse(obras);
});

When('mando a imprimir el borderau', function () {
   this.actualAnswer = print_the_bill.statement(this.invoice,this.play);
});

Then('debería imprimir el borderau', function (expectedAnswer) {
   assert.equal(this.actualAnswer.trim(), expectedAnswer.trim());;
});

When('mando a imprimir el borderau en HTML', function () {
   this.actualAnswer = print_the_bill2.htmlStatement(this.invoice,this.play);
});

Then('debería imprimir el borderau en HTML', function (expectedAnswer) {
   assert.equal(this.actualAnswer.trim(), expectedAnswer.trim());;
});
