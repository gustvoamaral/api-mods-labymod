const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

function lerDados() {
    const dados = fs.readFileSync('banco.json', 'utf-8');
    return JSON.parse(dados);
}

function salvarDados(dados) {
    fs.writeFileSync('banco.json', JSON.stringify(dados, null, 2));
}

app.get('/mods', (requisicao, resposta) => {
    resposta.json(lerDados());
});

app.post('/mods', (requisicao, resposta) => {
    const meusMods = lerDados(); 
    // AGORA RECEBE A IMAGEM
    const { nome, versao, utilidade, imagem } = requisicao.body;
    
    if (!nome || !versao || !utilidade) {
        return resposta.status(400).send("Erro: Preencha os campos obrigatórios!");
    }

    const novoId = meusMods.length > 0 
        ? Math.max(...meusMods.map(m => Number(m.id))) + 1 
        : 1;

    // SALVA A IMAGEM NO BANCO
    const novoMod = { id: novoId, nome, versao, utilidade, imagem };
    meusMods.push(novoMod); 
    salvarDados(meusMods);  

    resposta.status(201).json(novoMod);
});

app.put('/mods/:id', (requisicao, resposta) => {
    const meusMods = lerDados();
    const idParaAtualizar = parseInt(requisicao.params.id);
    const novosDados = requisicao.body; // Já pega a imagem automaticamente aqui

    const index = meusMods.findIndex(mod => mod.id === idParaAtualizar);

    if (index !== -1) {
        meusMods[index] = { id: idParaAtualizar, ...novosDados };
        salvarDados(meusMods);
        resposta.send(`O mod com ID ${idParaAtualizar} foi atualizado!`);
    } else {
        resposta.status(404).send("Mod não encontrado!");
    }
});

app.delete('/mods/:id', (requisicao, resposta) => {
    let meusMods = lerDados();
    const idParaApagar = parseInt(requisicao.params.id);

    const novaLista = meusMods.filter(mod => mod.id !== idParaApagar);
    salvarDados(novaLista);

    resposta.send(`Mod removido!`);
});

app.listen(porta, () => {
    console.log(`🚀 API StarDix ON: http://localhost:${porta}/mods`);
});