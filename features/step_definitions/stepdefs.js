const assert = require('assert');
const { Given, When, Then } = require('cucumber');

var print_the_bill = require('../../print-the-bill');

Given('el listado de la facturación de espectáculos', function (espectaculos) {
   this.invoice = JSON.parse(espectaculos);
});

Given('la lista de obras', function (obras) {
   this.play = JSON.parse(obras);
});

When('mando a imprimir el borderau', function () {
   this.actualAnswer = print_the_bill(this.invoice,this.play);
});

Then('debería imprimir el borderau', function (expectedAnswer) {
   assert.equal(this.actualAnswer.trim(), expectedAnswer.trim());;
});
