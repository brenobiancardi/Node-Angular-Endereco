# Aula de Programação para internet

## **Sobre o projeto**:

**Projeto desenvolvido durante o curso da disciplina Programação para a internet do curso de Engenharia da Computação**

Este projeto foi desenvolvido com o objetivo de estudar o desenvolvimento de aplicacões WEB utilizando a arquitetura de software REST, a ferramenta de documentação [Swagger](https://swagger.io/), os frameworks de desenvolvimento [NodeJS](https://nodejs.org/en/) e [Angular](https://angular.io/), a criação dessa aplicação não teve o objetivo de ser segura para a utilização em ambiente de produção, utilize apenas para estudos.

A aplicação consiste de um cadastro de endereços.

A documentação em Swagger da api do backend pode ser acessada apos a execução da mesma, no link: `http://localhost:8777/api-docs/`

A interface da aplicação fica disponivel no link: `http://localhost:4200`

## **Como executar o projeto**

### **Obtendo o projeto**

- Se possuir o git instalado em seu computador, basta digitar o comando

  > `git clone https://github.com/brenobiancardi/Programacao-para-internet.git`

- Se não possuir basta fazer o download do arquivo zip no botao download no canto superior direito desta pagina.

### **Executando o projeto**

> Requisitos:
>
> - Docker **ou** Nodejs instalado.

### **Execução com docker:**

    Esta e a forma mais facil de execução do projeto, basta se dirigir a pagina do projeto com um terminal de comando(powershell, CMD, bash) e executar o comando:

> - `docker-compose up -d`

> Este comando copiará os arquivos necessarios para o ambiente docker e cuidara de instalar automaticamente todas as dependencias(banco de dados MySQL, node, angular e dependencias dos mesmos) e popular o banco de dados com os seguinte usuarios padroes:

```javascript
{
"login": "breno",
"senha": "senhasegura"
},
{
"login": "bruno",
"senha": "supersenha"
}
```

> Apos o deploy a aplicação ficará disponivel no endereco: `http://localhost:4200/`

### **Execução com NodeJS**:

> **Configuração Banco de dados**:

> > Para essa modalidade e necessários que seja configurado um banco de dados MySQL com o seguinte script:

```sql
CREATE DATABASE tarefas_bd
```

> > seguido do script disponivel no arquivo `createDatabase.sql` na pasta MySQL desse projeto.

> > > Obs: Configuraçoes extras de autenticação podem ser necessárias na pasta backend no arquivo definição_bd.js;

> **Instalacao de dependencias e execução do backend**

> > Apos essa configuracao dirija-se a pasta backend com algum terminal e digite o comando `npm install` e concluida a instalação de dependencia utilizar o comando `npm start`;

> **Instalacao de dependencias e execução do frontend**

> > Apos essa configuracao dirija-se a pasta fronend com algum terminal e digite o comando `npm install` e concluida a instalação de dependencia utilizar o comando `npm start`;

> > > Obs: Se houver algum erro com que cite `ng serve`, rode o comando `npm i -g @angular/cli@10.2.0 ` e novamente execute o comando `npm start`
