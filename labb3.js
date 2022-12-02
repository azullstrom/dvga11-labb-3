'use strict';

let total = 0;

let menu = {
	"Pizzor klass 1": [
		{"name": "Margherita", "contents": ["Ost"], "price": 65 },
		{"name": "Vesuvio", "contents": ["Ost", "Skinka"], "price": 65 },
		{"name": "Altono", "contents": ["Ost", "Tonfisk"], "price": 65 }
	],
	"Pizzor klass 2": [
		{"name": "Calzone", "contents": ["Ost", "Skinka"], "price": 80 },
		{"name": "Capricciosa", "contents": ["Ost", "Skinka", "Champinjoner" ], "price": 70 },
		{"name": "Tomaso", "contents": ["Ost", "Skinka", "a:Räkor" ], "price": 70 },
		{"name": "Hawaii", "contents": ["Ost", "Skinka", "Ananas" ], "price": 70 },
		{"name": "Oriental", "contents": ["Ost", "Skinka", "Köttfärs" ], "price": 70 },
		{"name": "Venezia", "contents": ["Ost", "Skinka", "Tonfisk" ], "price": 70 },
		{"name": "Bolognese", "contents": ["Ost", "Köttfärs", "Lök" ], "price": 70 },
		{"name": "Napoli", "contents": ["Ost", "Räkor", "Champinjoner" ], "price": 70 }
	],
	"Pizzor klass 3": [
		{"name": "Bravo", "contents": ["Ost", "Skinka", "Bacon", "Lök", "a:Ägg" ], "price": 75 },
		{"name": "Princessa", "contents": ["Ost", "Skinka", "a:Räkor", "Champinjoner" ], "price": 75 },
		{"name": "Kroppkärr", "contents": ["Ost", "Skinka", "Köttfärs", "Champinjoner" ], "price": 75 },
		{"name": "Afrikano", "contents": ["Ost", "Skinka", "Ananas", "Curry", "Banan" ], "price": 75 },
		{"name": "Önska", "contents": ["Ost", "Skinka", "a:Räkor", "Champinjoner" ], "price": 85 },
		{"name": "Lambada", "contents": ["Ost", "Skinka", "Köttfärs", "a:Räkor" ], "price": 75 },
		{"name": "Alsterdalen", "contents": ["Ost", "Skinka", "a:Crabfish", "a:Räkor" ], "price": 75 },
		{"name": "Paradis", "contents": ["Ost", "Skinka", "a:Räkor", "Ananas" ], "price": 75 },
		{"name": "Roma", "contents": ["Ost", "Skinka", "Kantareller", "Tomater (färska)" ], "price": 75 },
		{"name": "Banjogatan", "contents": ["Ost", "Skinka", "Salami", "Paprika" ], "price": 75 },
		{"name": "Rimini", "contents": ["Ost", "Köttfärs", "Gorgonzolaost", "Lök" ], "price": 75 },
		{"name": "Opera", "contents": ["Ost", "Köttfärs", "Ananas", "Curry", "Banan" ], "price": 75 },
		{"name": "Mesopotamia", "contents": ["Ost", "Salami", "Köttfärs", "a:Nötter" ], "price": 75 }
	],
	"Såser": [
		{"name": "Bearnaisesås 10 cl ", "price": 10 },
		{"name": "Kebabsås mild 10 cl ", "price": 10 },
		{"name": "Kebabsås stark 10 cl ", "price": 10 },
		{"name": "Kebabsås blandad 10 cl ", "price": 10 },
		{"name": "Tzatzikisås 10 cl ", "price": 10 },
		{"name": "Vitlökssås 10 cl ", "price": 10 }
	],
	"Dryck": [
		{"name": "Coca-Cola 33 cl ", "price": 15 },
		{"name": "Coca-Cola light 33 cl ", "price": 15 },
		{"name": "Fanta 33 cl ", "price": 15  },
		{"name": "Sprite 33 cl ", "price": 15 },
		{"name": "Mineralvatten 33 cl ", "price": 15 },
		{"name": "Lättöl 33 cl ", "price": 15 },
		{"name": "Coca-Cola 50 cl ", "price": 20 },
		{"name": "Fanta 50 cl ", "price": 20 }
	]
}





