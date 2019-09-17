# language: es

Característica: Imprimir la factura de una compañía teatral
   Necesaria para liquidar el borderau

Escenario: imprimr la factura de BigCo
   Dado el listado de la facturación de espectáculos
      """
      {
      "customer": "BigCo",
      "performances": [
         {
            "playID": "hamlet",
            "audience": 55
         },
         {
            "playID": "as-like",
            "audience": 35
         },
         {
            "playID": "othello",
            "audience": 40
         }
      ]
      }
      """
   Y la lista de obras
      """
      {
         "hamlet": {
            "name": "Hamlet",
            "type": "tragedy"
         },
         "as-like": {
            "name": "As You Like It",
            "type": "comedy"
         },
         "othello": {
            "name": "Othello",
            "type": "tragedy"
         }
      }
      """
   Cuando mando a imprimir el borderau
   Entonces debería imprimir el borderau
      """
      Statement for BigCo
        Hamlet: $650.00 (55 seats)
        As You Like It: $580.00 (35 seats)
        Othello: $500.00 (40 seats)
      Amount owed is $1,730.00
      You earned 47 credits
      """