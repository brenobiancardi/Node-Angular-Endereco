const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({ secret: "supersenha", saveUninitialized: true, resave: true })
);

// app.use(express.static("public"));

app.get("/login", function (request, response) {
  request.session.destroy();
  response.render("login");
});

app.post("/entrar", function (request, response) {
  let usuario = request.body.usuario;
  let senha = request.body.senha;
  if (usuario == "bruno" && senha == "multivix") {
    request.session.usuario = usuario;
    response.redirect("/home");
  } else {
    response.status(401).send("Usuário não autenticado");
  }
});

app.get("/home", function (request, response) {
  if (request.session.usuario && request.session.usuario != null)
    response.render("home", { nomeUsuario: request.session.usuario });
  else response.status(401).send("Usuárionãoautenticado");
});

app.listen(9369, function () {
  console.log("Servidor executando");
});
