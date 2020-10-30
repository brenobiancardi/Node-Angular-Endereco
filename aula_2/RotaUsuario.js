const db = require("./definicao_bd");
const criptUtil = require("./CriptUtil");

module.exports = function (app) {
  // Routes
  /**
   * @swagger
   * /usuarios/login:
   *  post:
   *    tags:
   *      - Usuario
   *    description: Usado para autenticar usuários
   *    responses:
   *      "200":
   *        description: Sucesso
   *        examples:
   *          application/json: { "autenticado": true, token: "MeuTokenDeAutenticacao" }
   *      "400":
   *        description: Requisição Inválida
   *      "401":
   *        description: Usuário não autenticado
   *      "403":
   *        description: Sem permissão para executar esta operação
   *      "404":
   *        description: Recurso não encontrado
   *      "500":
   *        description: Erro interno do servidor
   *    parameters:
   *    - in: body
   *      name: credencial
   *      required: true
   *      description: Credencial do usuário
   *      schema:
   *        $ref: "#/definitions/credencial"
   */
  app.post("/usuarios/login", function (request, response) {
    let credencial = request.body;
    console.log(credencial);

    db.Usuario.findOne({
      where: { login: credencial.login, senha: credencial.senha },
    })
      .then(function (usuario) {
        var retorno = { autenticado: false };
        if (usuario) {
          let = mensagemCript = usuario.id.toString() + "-" + Date.now();
          retorno.autenticado = true;
          retorno.token = criptUtil.criptografar(mensagemCript);
          retorno.usuario = usuario;
        }

        response.send(retorno);
      })
      .catch(function (error) {
        response.status(500).send(error.message);
      });
  });

  /**
   * @swagger
   * definitions:
   *   credencial:
   *     type: object
   *     properties:
   *       login:
   *         type: string
   *       senha:
   *         type: string
   *   usuario:
   *     type: object
   *     properties:
   *       id:
   *         type: integer
   *       nome:
   *         type: string
   *       login:
   *         type: string
   *       senha:
   *         type: string
   *
   */

  /**
   * @swagger
   * /usuarios/create:
   *  post:
   *    tags:
   *      - Usuario
   *    description: Usado para criar usuarios
   *    responses:
   *      "200":
   *        description: Sucesso
   *      "400":
   *        description: Requisição Inválida
   *      "401":
   *        description: Usuário não autenticado
   *      "403":
   *        description: Sem permissão para executar esta operação
   *      "404":
   *        description: Recurso não encontrado
   *      "500":
   *        description: Erro interno do servidor
   *    parameters:
   *    - in: header
   *      name: token
   *      required: true
   *      description: Token de Autenticação
   *    - in: body
   *      name: usuario
   *      required: true
   *      description: Objeto usuarioCreate
   *      schema:
   *        $ref: "#/definitions/usuarioCreate"
   */

  app.post("/usuarios/create", function (request, response) {
    token = request.headers["token"];
    if (token == null || token == "") {
      response.status(401).send("Usuário não autenticado");
      return;
    }
    var conteudoDescriptografado = criptUtil.descriptografar(token).toString();
    var usuario_id = conteudoDescriptografado.split("-")[0];

    console.log(
      "Requisição de criacão de usuario realizada pelo usuario: " + usuario_id
    );

    let usuario = request.body;

    db.Usuario.create(usuario)
      .then(function () {
        response.send({
          mensagem: `usuario ${usuario.nome} gravado com sucesso!`,
        });
      })
      .catch(function (error) {
        response.status(500).send("Erro: " + error.message);
      });
  });

  /**
   * @swagger
   * definitions:
   *   credencial:
   *     type: string
   *   usuarioCreate:
   *     type: object
   *     properties:
   *       nome:
   *         type: string
   *       login:
   *         type: string
   *       senha:
   *         type: string
   *
   */
};
