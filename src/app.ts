"use strict";

const fs = require('fs');
//const csv = require('csv-parser');
const path = require('path');


async function leArquivo(file: string): Promise<Pessoa[]>{

    const listaPessoas: Pessoa[] = [];
    const filePath = "source/" + file;


    await fs.readFile(filePath, 'utf8', (err: Error | null, data: string) => {
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
                listaPessoas.push(pessoa);
            }
        }
    
        executar(listaPessoas, file);
        
    });
    return listaPessoas;

}

interface Pessoa {
    idPesquisa: string,
    dataPesquisa: string,
    municipio: string,
    estado: string,
    intencaoVoto: string
}

async function executar(listaPessoas: Pessoa[], file: string){

    verificacaoGenerica(listaPessoas, file);
}

function verificacaoGenerica(listaPessoas: Pessoa[], file: string){

    var total = listaPessoas.length;

    var intencaoVoto = encontrarValoresDiferentes(listaPessoas);

    console.log("---------");
    console.log(file);

    intencaoVoto.forEach(candidato => {
        var votoCanditado = listaPessoas.filter(item => item.intencaoVoto === candidato).length;
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

function verificacaoFixa(listaPessoas: Pessoa[], file: string){

    var votoA = listaPessoas.filter(item => item.intencaoVoto === "A").length;
    var votoB = listaPessoas.filter(item => item.intencaoVoto === "B").length;
    var total = listaPessoas.length;

    console.log("---------")
    console.log(file)
    console.log("Voto A: " + votoA + " = " + (votoA/total *100).toFixed(2) + "%");
    console.log("Voto B: " + votoB + " = " + (votoB/total *100).toFixed(2) + "%");
    console.log("Total: " + total);

}

function listaArquivos(){
    const pasta = './source'; 
    const extensaoDesejada = '.csv'; 
    var listaPesquisas : string[] = [];

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
