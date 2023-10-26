// "use strict";
// // src/app.ts
// function sayHello(name) {
//     console.log(`Hello, ${name}!`);
// }
// sayHello("World");
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fs = require('fs');
var csv = require('csv-parser');
var path = require('path');
function leArquivo(file) {
    return __awaiter(this, void 0, void 0, function () {
        var listaDePessoas, filePath, conteudo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    listaDePessoas = [];
                    filePath = "source/" + file // +".csv"
                    ;
                    return [4 /*yield*/, fs.readFile(filePath, 'utf8', function (err, data) {
                            if (err) {
                                console.error('Erro ao ler o arquivo:', err);
                                return;
                            }
                            var lines = data.split('\r\n');
                            var headers = lines[0].split(';');
                            for (var i = 1; i < lines.length - 1; i++) {
                                var values = lines[i].split(';');
                                if (values.length === headers.length) {
                                    var pessoa = {
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
                        })];
                case 1:
                    conteudo = _a.sent();
                    return [2 /*return*/, listaDePessoas];
            }
        });
    });
}
function executar(listaDePessoas, file) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            verificacaoTotal(listaDePessoas, file);
            return [2 /*return*/];
        });
    });
}
function verificacaoTotal(listaDePessoas, file) {
    var votoA = listaDePessoas.filter(function (item) { return item.intencaoVoto === "A"; }).length;
    var votoB = listaDePessoas.filter(function (item) { return item.intencaoVoto === "B"; }).length;
    var total = listaDePessoas.length;
    console.log("---------");
    console.log(file);
    console.log("Voto A: " + votoA + " = " + (votoA / total * 100).toFixed(2) + "%");
    console.log("Voto B: " + votoB + " = " + (votoB / total * 100).toFixed(2) + "%");
    console.log("Total: " + total);
}
function listaArquivos() {
    var _this = this;
    var pasta = './source';
    var extensaoDesejada = '.csv';
    var listaPesquisas = [];
    fs.promises.readdir(pasta)
        .then(function (arquivos) {
        arquivos.forEach(function (arquivo) { return __awaiter(_this, void 0, void 0, function () {
            var extensaoArquivo;
            return __generator(this, function (_a) {
                extensaoArquivo = path.extname(arquivo);
                if (extensaoArquivo === extensaoDesejada) {
                    console.log('Arquivo encontrado:', arquivo);
                    listaPesquisas.push(arquivo);
                }
                return [2 /*return*/];
            });
        }); });
        listaPesquisas.forEach(function (element) {
            leArquivo(element);
        });
    })
        .catch(function (err) {
        console.error('Erro ao ler o diretório', err);
    });
}
listaArquivos();
