// "use strict";
// // src/app.ts
// function sayHello(name) {
//     console.log(`Hello, ${name}!`);
// }
// sayHello("World");

"use strict";

const fs = require('fs');
const csv = require('csv-parser');


function teste(){

    var listaDePessoas: Pessoa[] = [];


    fs.createReadStream('source/P1.csv')
        .pipe(csv())
        .on('data', (row) => {
            var pessoa: Pessoa = {
                idPesquisa: row.idPesquisa,
                dataPesquisa: row.dataPesquisa,
                municipio: row.municipio,
                estado:  row.estado,
                intencaoVoto: row.intencaoVoto
            };
            listaDePessoas.push(pessoa);
        })
        .on('end', () => {
            // Agora, 'listaDePessoas' contém os dados do CSV como objetos
            console.log(listaDePessoas);
        });


}

interface Pessoa {
    idPesquisa: string,
    dataPesquisa: string
    municipio: string;
    estado: number;
    intencaoVoto: string;
}


teste();

//idPesquisa;dataPesquisa;municipio;estado;intencaoVoto

//     ID_PESQUISA
//     DATA_PESQUISA
//     MUNICIPIO
//     ESTADO
//     INTENCAODEVOTO