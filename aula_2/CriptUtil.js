// Fonte:
// https://medium.com/collabcode/criptografando-e-descriptografando-dados-com-nodejs-f3f34a9390e4

const crypto = require("crypto");

const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    codificacao : "utf8",
    segredo : "chaves",
    tipo : "hex"
};

function criptografar(texto) {
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, Buffer.from(DADOS_CRIPTOGRAFAR.segredo));
    cipher.update(texto, DADOS_CRIPTOGRAFAR.codificacao);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};

function descriptografar(texto) {
    const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, Buffer.from(DADOS_CRIPTOGRAFAR.segredo));
    decipher.update(texto, DADOS_CRIPTOGRAFAR.tipo);
    return decipher.final();
};

module.exports = {
    criptografar: criptografar,
    descriptografar: descriptografar
};