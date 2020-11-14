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
      response.status(401).send({ erro: "Usuário não autenticado" });
      return;
    }
    var conteudoDescriptografado = criptUtil.descriptografar(token).toString();
    if (conteudoDescriptografado == "") {
      response.status(401).send({ erro: "Usuário não autenticado" });
      return;
    }
    var usuario_id = conteudoDescriptografado.split("-")[0];
    console.log("Requisição de consulta realizada pelo usuario: " + usuario_id);

    db.Endereco.findAll({ raw: true })
      .then(function (enderecos) {
        response.send(enderecos);
      })
      .catch(function (error) {
        response.status(500).send({ erro: "Erro no servidor" });
      });
  });
  /**
   * @swagger
   * /api/endereco/{id}:
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
   *    - in: path
   *      name: id
   *      required: true
   *      description: Id do endereco buscado
   */
  app.get("/api/endereco/:id", function (request, response) {
    token = request.headers["token"];
    if (token == null || token == "") {
      response.status(401).send({ erro: "Usuário não autenticado" });
      return;
    }
    var conteudoDescriptografado = criptUtil.descriptografar(token).toString();
    if (conteudoDescriptografado == "") {
      response.status(401).send({ erro: "Usuário não autenticado" });
      return;
    }
    const endereco_id = request.params.id;

    var usuario_id = conteudoDescriptografado.split("-")[0];
    console.log(
      "Requisição de consulta realizada pelo usuario: " +
        usuario_id +
        " buscando o id de valor: " +
        endereco_id
    );

    db.Endereco.findOne({ where: { id: endereco_id } })
      .then(function (enderecos) {
        response.send(enderecos);
      })
      .catch(function (error) {
        response.status(500).send({ erro: "Erro no servidor" });
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
      response.status(401).send({ erro: "Usuário não autenticado" });
      return;
    }
    var conteudoDescriptografado = criptUtil.descriptografar(token).toString();
    if (conteudoDescriptografado == "") {
      response.status(401).send({ erro: "Usuário não autenticado" });
      return;
    }
    var usuario_id = conteudoDescriptografado.split("-")[0];
    console.log("Requisição de inclusão realizada pelo usuario: " + usuario_id);

    let endereco = request.body;
    db.Endereco.create(endereco)
      .then(function () {
        response.send({ mensagem: "registro gravado com sucesso!" });
      })
      .catch(function (error) {
        response.status(500).send({ erro: "Erro no servidor" });
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
      response.status(401).send({ erro: "Usuário não autenticado" });
      return;
    }
    var conteudoDescriptografado = criptUtil.descriptografar(token).toString();
    if (conteudoDescriptografado == "") {
      response.status(401).send({ erro: "Usuário não autenticado" });
      return;
    }
    var usuario_id = conteudoDescriptografado.split("-")[0];
    console.log(
      "Requisição de alteração realizada pelo usuario: " + usuario_id
    );

    let endereco = request.body;
    db.Endereco.update(endereco, { where: { id: endereco.id } })
      .then(function () {
        response.send({ mensagem: "registro alterado com sucesso!" });
      })
      .catch(function (error) {
        response.status(500).send({ erro: "Erro no servidor" });
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
   *    - in: query
   *      name: id
   *      required: true
   *      description: ID do endereço
   */

  app.delete("/api/endereco/", function (request, response) {
    try {
      token = request.headers["token"];
      if (token == null || token == "") {
        response.status(401).send({ erro: "Usuário não autenticado" });
        return;
      }
      var conteudoDescriptografado = criptUtil
        .descriptografar(token)
        .toString();
      if (conteudoDescriptografado == "") {
        response.status(401).send({ erro: "Usuário não autenticado" });
        return;
      }

      var usuario_id = conteudoDescriptografado.split("-")[0];
      console.log("Requisição de delete realizada pelo usuario: " + usuario_id);

      let endereco_id = request.query.id;
      db.Endereco.destroy({ where: { id: endereco_id } })
        .then(function (endereco) {
          response.status(200).send({
            mensagem: "Registro deletado com sucesso",
          });
        })
        .catch(function (error) {
          response.status(500).send(error.message);
        });
    } catch {
      response.status(500).send({ erro: "Erro no servidor" });
      return;
    }
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
