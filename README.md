## projeto realizado com node.js e express.js

olá, bem vindo ao meu projeto de um sistema bancario com as seguintes funções:

- criar conta
- listar conta bancaria
- atualizar dados
- deletar conta
- depositar valor
- Tacar valor
- Transferencia
- Consultar saldo
- Extrato

essas são todas as funções que esta API consegue fazer e seguindo as intruções a seguir sera capaz de executar no seu dispositivo, mas antes de cada passo sera necessario primeiro uma preparação pra preparar tudo. 

primeiramente com a pasta aberta em seu pc, va para o terminal do vscode e digite o comando "npm init -y" e em seguida "npm intall", dessa forma o seu disposito tera iniciado o projeto e instalado todas as bibliotecas necessarias para rodar a api. Após concluir tudo isto, rode o comando "npm run dev" e nossa API ira estara sendo iniciada.

## CRIAR CONTA: **POST**

http://localhost:3000/contas

Nesta rota devera ser enviado uma requisição do tipo post e com um body contendo os seguintes campos e no mesmo formato:



```
{
  "nome": "xxxx",
  "cpf": "xxxxxxxxxxx",
  "data_nascimento": "xxxxxxxx",
  "telefone": "xxxxxxxxxxx",
  "email" "xxxxxxxxxxx",
  "senha": "xxxxxxxxxxxx"
}

OBS:

todas as requisi
```
