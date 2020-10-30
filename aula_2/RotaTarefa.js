const db = require("./definicao_bd");
const criptUtil = require("./CriptUtil");

module.exports = function (app) {
  /**
   * @swagger
   * /api/endereco:
   *  get:
   *    tags:
   *      - Endereco
   *    description: Usado para obter enderecos
   *    responses:
   *      "200":
   *        description: Sucesso
   *        examples:
   *          application/json: { "tpLogr": "string", "logradouro": "string", "bairro": "string", "cidade": "string", "uf": "string" }
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
   */
  app.get("/api/endereco", function (request, response) {
    token = request.headers["token"];
    if (token == null || token == "") {
      response.status(401).send("Usuário não autenticado");
      return;
    }
    var conteudoDescriptografado = criptUtil.descriptografar(token).toString();
    var usuario_id = conteudoDescriptografado.split("-")[0];
    console.log("Requisição de consulta realizada pelo usuario: " + usuario_id);

    db.Endereco.findAll({ raw: true })
      .then(function (enderecos) {
        response.send(enderecos);
      })
      .catch(function (error) {
        response.status(500).send("Erro: " + error.message);
      });
  });

  /**
   * @swagger
   * /api/endereco:
   *  post:
   *    tags:
   *      - Endereco
   *    description: Usado para criar um endereco
   *    responses:
   *      "200":
   *        description: Sucesso
   *        examples:
   *          application/json: { "mensagem": "registro gravado com sucesso!"}
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
   *      name: enderecoCreate
   *      required: true
   *      description: Objeto enderecoCreate
   *      schema:
   *        $ref: "#/definitions/enderecoCreate"
   */
  app.post("/api/endereco", function (request, response) {
    token = request.headers["token"];
    if (token == null || token == "") {
      response.status(401).send("Usuário não autenticado");
      return;
    }
    var conteudoDescriptografado = criptUtil.descriptografar(token).toString();
    var usuario_id = conteudoDescriptografado.split("-")[0];
    console.log("Requisição de consulta realizada pelo usuario: " + usuario_id);

    let endereco = request.body;
    db.Endereco.create(endereco)
      .then(function () {
        response.send({ mensagem: "registro gravado com sucesso!" });
      })
      .catch(function (error) {
        response.status(500).send("Erro: " + error.message);
      });
  });
  /**
   * @swagger
   * /api/endereco:
   *  put:
   *    tags:
   *      - Endereco
   *    description: Usado para alterar um endereco
   *    responses:
   *      "200":
   *        description: Sucesso
   *        examples:
   *          application/json: { "mensagem": "registro alterado com sucesso!"}
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
   *      name: endereco
   *      required: true
   *      description: Objeto endereco
   *      schema:
   *        $ref: "#/definitions/endereco"
   */
  app.put("/api/endereco", function (request, response) {
    token = request.headers["token"];
    if (token == null || token == "") {
      response.status(401).send("Usuário não autenticado");
      return;
    }
    var conteudoDescriptografado = criptUtil.descriptografar(token).toString();
    var usuario_id = conteudoDescriptografado.split("-")[0];
    console.log("Requisição de consulta realizada pelo usuario: " + usuario_id);

    let endereco = request.body;
    db.Endereco.update(endereco, { where: { id: endereco.id } })
      .then(function () {
        response.send({ mensagem: "registro alterado com sucesso!" });
      })
      .catch(function (error) {
        response
          .status(500)
          .send("Erro interno do servidor. Mensagem: " + error.message);
      });
  });

  /**
   * @swagger
   * /api/endereco:
   *  delete:
   *    tags:
   *      - Endereco
   *    description: Usado para deletar um endereco
   *    responses:
   *      "200":
   *        description: Sucesso
   *        examples:
   *          application/json: { "mensagem": "registro deletado com sucesso!"}
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
   *      name: enderecoDelete
   *      required: true
   *      description: Query Param
   */

  app.delete("/api/endereco/:id", function (request, response) {
    token = request.headers["token"];
    if (token == null || token == "") {
      response
        .status(401)
        .send('Usuário não autenticado<br><a href="/home">Voltar</a>');
      return;
    }
    var conteudoDescriptografado = criptUtil.descriptografar(token).toString();
    var usuario_id = conteudoDescriptografado.split("-")[0];
    console.log("Requisição de consulta realizada pelo usuario: " + usuario_id);

    let endereco_id = request.params.id;
    db.Endereco.destroy({ where: { id: endereco_id } })
      .then(function (endereco) {
        response.status(200).send("Registro deletado com sucesso");
      })
      .catch(function (error) {
        response.status(500).send(error.message);
      });
  });
};

/**
 * @swagger
 * definitions:
 *   endereco:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       tpLogr:
 *         type: string
 *       logradouro:
 *         type: string
 *       bairro:
 *         type: string
 *       cidade:
 *         type: string
 *       uf:
 *         type: string
 *
 */

/**
 * @swagger
 * definitions:
 *   enderecoCreate:
 *     type: object
 *     properties:
 *       tpLogr:
 *         type: string
 *       logradouro:
 *         type: string
 *       bairro:
 *         type: string
 *       cidade:
 *         type: string
 *       uf:
 *         type: string
 *
 */

/**
 * @swagger
 * definitions:
 *   enderecoDelete:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *
 */
