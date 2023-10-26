// "use strict";
// // src/app.ts
// function sayHello(name) {
//     console.log(`Hello, ${name}!`);
// }
// sayHello("World");
"use strict";
const fs = require('fs');
const csv = require('csv-parser');
function teste() {
    const filePath = 'source/P1.csv';
    // interface Pessoa {
    //     nome: string;
    //     idade: number;
    //     ocupacao: string;
    // }
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }
        const lines = data.split('\n');
        const headers = lines[0].split(',');
        const listaDePessoas = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(';');
            if (values.length === headers.length) {
                const pessoa = {
                    idPesquisa: values[0],
                    dataPesquisa: values[1],
                    municipio: values[2],
                    estado: values[3],
                    intencaoVoto: values[4],
                };
                listaDePessoas.push(pessoa);
            }
            console.log(values[0]);
        }
        //console.log(listaDePessoas);
    });
    // fs.createReadStream('source/P1.csv')
    //     .pipe(csv())
    //     .on('data', (row: any) => {
    //         console.log(row)
    //         var pessoa: Pessoa = {
    //             idPesquisa: row.idPesquisa,
    //             dataPesquisa: row.dataPesquisa,
    //             municipio: row.municipio,
    //             estado:  row.estado,
    //             intencaoVoto: row.intencaoVoto
    //         };
    //         listaDePessoas.push(pessoa);
    //     })
    //     .on('end', () => {
    //         // Agora, 'listaDePessoas' contém os dados do CSV como objetos
    //         // console.log(listaDePessoas);
    //     });
}
teste();
