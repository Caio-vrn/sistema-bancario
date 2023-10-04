const bancoDeDados = require("../bancodedados")


const listarContaBancaria = (req, res) => {
    res.status(200).json(bancoDeDados.contas)
}

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome, !cpf, !data_nascimento, !telefone, !email, !senha) {
        return res.status(400).json({ mensagem: "todos os campos sao obrigatorios" })
    }

    let digitoUnico = bancoDeDados.contas.length

    digitoUnico++

    const novoUsuario = {
        numero: digitoUnico,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha,
        }
    }

    bancoDeDados.contas.push(novoUsuario)

    res.status(201).json(novoUsuario)


}

const atualizarDados = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const { numeroConta } = req.params

    const contaEncontrada = bancoDeDados.contas[Number(numeroConta - 1)]

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(400).json({ mensagem: "pelo menos um dos campos tem que estar preenchido" })
    }

    contaEncontrada.usuario.nome = nome ?? contaEncontrada.usuario.nome
    contaEncontrada.usuario.cpf = cpf ?? contaEncontrada.usuario.cpf
    contaEncontrada.usuario.data_nascimento = data_nascimento ?? contaEncontrada.usuario.data_nascimento
    contaEncontrada.usuario.telefone = telefone ?? contaEncontrada.usuario.telefone
    contaEncontrada.usuario.email = email ?? contaEncontrada.usuario.email
    contaEncontrada.usuario.senha = senha ?? contaEncontrada.usuario.senha

    res.status(200).json({ mensagem: "Conta atualizada com sucesso" })

}

const deletarConta = (req, res) => {
    const { numeroConta } = req.params

    const contaEncontrada = bancoDeDados.contas[Number(numeroConta - 1)]

    if (contaEncontrada.saldo > 0) {
        return res.status(403).json({ mensagem: "para excluir a conta o saldo deve estar zerado" })
    }

    bancoDeDados.contas = bancoDeDados.contas.filter((conta) => {
        return conta !== contaEncontrada
    })

    res.status(200).json({ mensagem: "conta excluida com sucesso" })

}

const depositarValor = (req, res) => {
    const { numero_conta, valor } = req.body

    if (isNaN(numero_conta)) {
        return res.status(400).json({ mensagem: "o numero da conta é obrigatorio" })
    }

    if (isNaN(valor)) {
        return res.status(400).json({ mensagem: "o valor a depositar deve ser um numero" })
    }

    const contaEncontrada = bancoDeDados.contas.find((conta) => {
        return conta.numero === numero_conta
    })

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "essa conta não existe" })
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "o valor a ser depositado deve ser maior que zero" })
    }

    contaEncontrada.saldo += valor

    const extrato = {
        data: new Date(),
        numero_conta,
        valor
    }

    bancoDeDados.depositos.push(extrato)

    res.status(200).json({ mensagem: "Depósito realizado com sucesso" })

}

const sacarValor = (req, res) => {
    const { numero_conta, valor } = req.body

    const contaEncontrada = bancoDeDados.contas[Number(numero_conta - 1)]

    if (isNaN(valor)) {
        return res.status(400).json({ mensagem: "o valor a depositar deve ser um numero" })
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "o valor a ser sacado deve ser maior que zero" })
    }

    if (valor > contaEncontrada.saldo) {
        return res.status(400).json({ mensagem: "o valor a ser sacado excede o da conta" })
    }

    contaEncontrada.saldo -= valor

    const extrato = {
        data: new Date(),
        numero_conta,
        valor
    }

    bancoDeDados.saques.push(extrato)

    res.status(200).json({ mensagem: "Saque realizado com sucesso" })
}

const transferencia = (req, res) => {
    const { valor, numero_conta_origem, numero_conta_destino } = req.body

    if (!valor) {
        return res.status(400).json({ mensagem: "valor é obrigatorio" })
    }

    if (isNaN(valor)) {
        return res.status(400).json({ mensagem: "o valor a depositar deve ser um numero" })
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "o valor transferido deve ser maior que zero" })
    }

    const contaOrigem = bancoDeDados.contas[Number(numero_conta_origem - 1)]

    const contaDestino = bancoDeDados.contas[Number(numero_conta_destino - 1)]

    if (valor > contaOrigem.saldo) {
        return res.status(400).json({ mensagem: "o valor excede o saldo" })
    }

    contaOrigem.saldo -= valor
    contaDestino.saldo += valor

    const extrato = {
        data: new Date(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    bancoDeDados.transferencias.push(extrato)

    res.status(200).json({ mensagem: "Transferência realizado com sucesso" })

}

const consultarSaldo = (req, res) => {
    const { numero_conta, senha } = req.query

    if (isNaN(numero_conta) || !numero_conta) {
        return res.status(400).json({ mensagem: "o numero da conta é obrigatorio" })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "senha é obrigatorio" })
    }

    const contaEncontrada = bancoDeDados.contas.find((conta) => {
        return conta.numero === numero_conta
    })

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "essa conta não existe" })
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "senha incorreta" })
    }


    res.status(200).json({ saldo: contaEncontrada.saldo })

}

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "a senha é obrigatoria" })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "a senha é obrigatoria" })
    }

    const banco = bancoDeDados.banco

    if (banco.numero !== numero_conta) {
        return res.status(400).json({ mensagem: "numero de conta incorreto" })
    }

    if (banco.senha !== senha) {
        return res.status(400).json({ mensagem: "senha incorreta" })
    }

    res.status(200).json({
        depositos: bancoDeDados.depositos,
        saques: bancoDeDados.saques,
        transferencias: bancoDeDados.transferencias
    })

}





module.exports = {
    listarContaBancaria,
    criarConta,
    atualizarDados,
    deletarConta,
    depositarValor,
    sacarValor,
    transferencia,
    consultarSaldo,
    extrato
}