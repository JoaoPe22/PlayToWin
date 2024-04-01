// Conexão Nodejs
// Instanciando um Client a partir do módulo ‘pg’:
const { Client } = require("pg");
require("dotenv").config();

// Importando e instanciando o express
const express = require("express");
const app = express();

//Adicionando Middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//Adicionando a rota get para “/usuarios/novo”
app.get("/", (req, res) => {
  res.redirect("/usuarios/novo");
});

app.get("/usuarios/novo", (req, res) => {
  res.sendFile(`${__dirname}/views/novo-usuario.html`);
});

//Inicializando o Servidor
app.listen(8000, () => {
  console.log("Server ouvindo na porta 8000");
});

//Receber os dados do formulário
app.post("/usuarios/novo", (req, res) => {
  const nick = req.body.nickname;
  const nome = req.body.nome;

  client.query(
    `INSERT INTO usuarios (usuario_nickname, usuario_nome)
    VALUES ('${nick}', ''${nome}) returning *`,
    (err, result) => {
      // callback
    }
  );
});

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Chamando o método connect() do client:
client
  .connect()
  .then(() => {
    console.log("Conectando ao banco de dados");
    // exibeUsuariosCadastrados();
  })
  .catch((err) => {
    console.log(`Erro: ${err}`);
  });

//Testando Conexão
//Buscando os usuarios da tabela usuarios:
// function exibeUsuariosCadastrados() {
//   client.query("select * from usuarios", (err, result) => {
//     if (err) {
//       console.error("Erro ao executar a busca:" + err);
//     } else {
//       console.log("Resultado:" + JSON.stringify(result.rows));
//     }
//     fechaConexao();
//   });
// }

// Function para encerrar a conexão depois que utilizá-la:
// function fechaConexao() {
//   client
//     .end()
//     .then(() => {
//       console.log("Conexão Encerrada!");
//     })
//     .catch((err) => {
//       console.error("Erro ao encerrar conexão:", err);
//     });
// }
