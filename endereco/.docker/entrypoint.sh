#!/bin/bash

cd /home/node/app
mkdir ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
npm config set prefix '~/.npm-global'
npm i -g @angular/cli@10.2.0 
npm install
npm start
