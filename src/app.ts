// "use strict";
// // src/app.ts
// function sayHello(name) {
//     console.log(`Hello, ${name}!`);
// }
// sayHello("World");

"use strict";

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');


async function leArquivo(file: string): Promise<Pessoa[]>{

    //const filePath = 'source/P2.csv';
    const listaDePessoas: Pessoa[] = [];
    const filePath = "source/" + file // +".csv"


    const conteudo = await fs.readFile(filePath, 'utf8', (err: Error | null, data: string) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return;
        }
    
        const lines = data.split('\r\n');
        const headers = lines[0].split(';');
    
        for (let i = 1; i < lines.length - 1; i++) {
            const values = lines[i].split(';');
            if (values.length === headers.length) {
                const pessoa: Pessoa = {
                    idPesquisa: values[0],
                    dataPesquisa: values[1],
                    municipio: values[2],
                    estado: values[3],
                    intencaoVoto: values[4],
                };
                listaDePessoas.push(pessoa);
            }
        }
    
        executar(listaDePessoas, file);
        
    });
    return listaDePessoas;

}

interface Pessoa {
    idPesquisa: string,
    dataPesquisa: string
    municipio: string;
    estado: string;
    intencaoVoto: string;
}

async function executar(listaDePessoas: Pessoa[], file: string){

    verificacaoGenerica(listaDePessoas, file);
}

function verificacaoGenerica(listaDePessoas: Pessoa[], file: string){

    var total = listaDePessoas.length;

    var intencaoVoto = encontrarValoresDiferentes(listaDePessoas);

    console.log("---------")
    console.log(file)

    intencaoVoto.forEach(candidato => {
        var votoCanditado = listaDePessoas.filter(item => item.intencaoVoto === candidato).length;
        console.log("Voto " + candidato + ": " + votoCanditado + " = " + (votoCanditado/total *100).toFixed(2) + "%");

    });

    console.log("Total: " + total);

}

function encontrarValoresDiferentes(lista: Pessoa[]): string[] {
    const conjuntoValoresUnicos = new Set<string>();
    const valoresDiferentes: string[] = [];
  
    for (const pessoa of lista) {
      if (!conjuntoValoresUnicos.has(pessoa.intencaoVoto) && pessoa.intencaoVoto != '#N/D' ) {
        valoresDiferentes.push(pessoa.intencaoVoto);
        conjuntoValoresUnicos.add(pessoa.intencaoVoto);
      }
    }
  
    return valoresDiferentes.slice().sort();
  }

function verificacaoFixa(listaDePessoas: Pessoa[], file: string){

    var votoA = listaDePessoas.filter(item => item.intencaoVoto === "A").length;
    var votoB = listaDePessoas.filter(item => item.intencaoVoto === "B").length;
    var total = listaDePessoas.length;

    console.log("---------")
    console.log(file)
    console.log("Voto A: " + votoA + " = " + (votoA/total *100).toFixed(2) + "%");
    console.log("Voto B: " + votoB + " = " + (votoB/total *100).toFixed(2) + "%");
    console.log("Total: " + total);

}

function listaArquivos(){
    const pasta = './source'; 
    const extensaoDesejada = '.csv'; 
    var listaPesquisas :string[] = []

    fs.promises.readdir(pasta)
    .then((arquivos: any[]) => {
        arquivos.forEach(async (arquivo: any) => {
        const extensaoArquivo = path.extname(arquivo);

        if (extensaoArquivo === extensaoDesejada) {
            console.log('Arquivo encontrado:', arquivo);
            listaPesquisas.push(arquivo);
        }
        });

        listaPesquisas.forEach(element => {
            leArquivo(element);
        });
    })
    .catch((err: any) => {
        console.error('Erro ao ler o diretório', err);
    });
}

listaArquivos();

//leArquivo();

// var listaPesquisas :string[] = [
//     "P1",
//     "P2",
//     "P3",
//     "P4",
//     "P5",
//     "P6"
// ]

// listaPesquisas.forEach(element => {
//     leArquivo(element);
// });

//idPesquisa;dataPesquisa;municipio;estado;intencaoVoto

//     ID_PESQUISA
//     DATA_PESQUISA
//     MUNICIPIO
//     ESTADO
//     INTENCAODEVOTO

// interface Pessoa {
    //     nome: string;
    //     idade: number;
    //     ocupacao: string;
    // }
    
    


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