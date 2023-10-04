const express = require('express');
const rotas = express();
const { listarContaBancaria, criarConta, atualizarDados, deletarConta, depositarValor, sacarValor, transferencia, consultarSaldo, extrato } = require("./controladores/banco")
const { validacaoDeSenha, validarCpf, validarEmail, encontrarConta, validarSenhaDoUsuario, encontrarContaBody, validarTransferencia, } = require("./intermediarios")

rotas.get("/contas", validacaoDeSenha, listarContaBancaria)
rotas.post("/contas", validarCpf, validarEmail, criarConta)
rotas.put("/contas/:numeroConta/usuario", encontrarConta, atualizarDados)
rotas.delete("/contas/:numeroConta", encontrarConta, deletarConta)
rotas.post("/transacoes/depositar", depositarValor)
rotas.post("/transacoes/sacar", encontrarContaBody, validarSenhaDoUsuario, sacarValor)
rotas.post("/transacoes/transferir", validarTransferencia, transferencia)
rotas.get("/contas/saldo", consultarSaldo)
rotas.get("/contas/extrato", extrato)

module.exports = rotas