const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.engine("handlebars", handlebars({ defineLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.99", // o final será a matrícula do aluno
      title: "API Programação para Internet",
      description: "API de manipulação de informações da aplicação",
      contact: {
        name: "Bruno Stoll", // nome e sobrenome do aluno
      },
      servers: ["http://localhost:8777"],
    },
  },
  apis: ["RotaUsuario.js", "RotaTarefa.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// APIs
var rtUsuario = require("./RotaUsuario")(app);
var rtTarefa = require("./RotaTarefa")(app);

app.listen(8777, function () {
  console.log("Servidor executando");
});
