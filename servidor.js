const express = require('express');
const app = express();
const porta = 3000;

app.use(express.json());

let meusMods = [
    { 
        id: 1, 
        nome: "LabyMod", 
        versao: "4.0", 
        utilidade: "Otimização de FPS e cosméticos" 
    }
];

app.get('/mods', (requisicao, resposta) => {
    resposta.json(meusMods);
});

app.post('/mods', (requisicao, resposta) => {
    const novoMod = requisicao.body;
    meusMods.push(novoMod);
    resposta.send("Novo mod adicionado ao catálogo com sucesso!");
});

app.listen(porta, () => {
    console.log(`🚀 A API está rodando! Acesse http://localhost:${porta}/mods`);
});