FROM node:12.19.0-alpine3.12

#Adicionar bash a distribuição linux
RUN apk add --no-cache bash

#Usuario no container 
USER node

#Define o diretorio da aplicação
WORKDIR /home/node/app/
