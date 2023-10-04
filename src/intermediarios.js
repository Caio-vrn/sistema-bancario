const { banco, contas } = require("./bancodedados")

const validacaoDeSenha = (req, res, next) => {
    const { senha_banco } = req.query

    if (!senha_banco) {
        return res.status(400).json({ mensagem: "a senha é obrigatoria." })
    }

    if (senha_banco !== banco.senha) {
        return res.status(400).json({ mensagem: "senha incorreta" })
    }
    next()
}

const validarCpf = (req, res, next) => {
    const { cpf } = req.body

    if (!cpf) {
        return res.status(400).json({ mensagem: "todos os campos sao obrigatorios" })
    }

    if (isNaN(cpf)) {
        return res.status(400).json({ mensagem: "o cpf tem que ser um numero" })
    }

    const encontrarCpf = contas.find((conta) => {
        return conta.usuario.cpf === cpf
    })

    if (encontrarCpf) {
        return res.status(400).json({ mensagem: "este cpf já esta cadastrado" })
    }

    next()

}

const validarEmail = (req, res, next) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ mensagem: "todos os campos sao obrigatorios" })
    }

    const encontrarEmail = contas.find((conta) => {
        return conta.usuario.email === email
    })

    if (encontrarEmail) {
        return res.status(400).json({ mensagem: "este email já esta cadastrado" })
    }

    next()

}

const encontrarConta = (req, res, next) => {
    const { numeroConta } = req.params

    if (isNaN(numeroConta)) {
        return res.status(400).json({ mensagem: "o numero da conta é obrigatorio" })
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numeroConta
    })

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "essa conta não existe" })
    }

    next()
}

const encontrarContaBody = (req, res, next) => {
    const { numero_conta } = req.body

    if (isNaN(numero_conta)) {
        return res.status(400).json({ mensagem: "o numero da conta é obrigatorio" })
    }

    const contaEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta
    })

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "essa conta não existe" })
    }

    next()
}

const validarSenhaDoUsuario = (req, res, next) => {
    const { numero_conta, senha, } = req.body

    if (!senha) {
        res.status(400).json({ mensagem: "senha é obrigatorio" })
    }

    const contaEncontrada = contas[Number(numero_conta - 1)]

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "senha incorreta" })
    }

    next()

}

const validarTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, senha } = req.body

    if (!numero_conta_origem) {
        return res.status(400).json({ resposta: "o numero de conta de origem é obrigatorio" })
    }

    if (!numero_conta_destino) {
        return res.status(400).json({ resposta: "o numero de conta de destino é obrigatorio" })
    }

    if (!senha) {
        return res.status(400).json({ mensgem: "a senha é obrigatoria" })
    }

    const contaDeOrigemEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta_origem
    })

    if (!contaDeOrigemEncontrada) {
        return res.status(404).json({ mensagem: "conta de origem não existe " })
    }

    const contaDeDestinoEncontrada = contas.find((conta) => {
        return conta.numero === numero_conta_destino
    })

    if (!contaDeDestinoEncontrada) {
        return res.status(404).json({ mensagem: "conta de destino não existe" })
    }

    if (contaDeOrigemEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "senha incorreta" })
    }

    next()

}

module.exports = {
    validacaoDeSenha,
    validarEmail,
    validarCpf,
    encontrarConta,
    validarSenhaDoUsuario,
    encontrarContaBody,
    validarTransferencia,
}