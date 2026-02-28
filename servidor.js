const express = require('express');
const fs = require('fs');

const app = express();
const porta = 3000;

app.use(express.json());

function lerDados() {
    const dados = fs.readFileSync('banco.json', 'utf-8');
    return JSON.parse(dados);
}

function salvarDados(dados) {
    fs.writeFileSync('banco.json', JSON.stringify(dados, null, 2));
}

// ---------------------------------------------------------
// AS ROTAS DO SEU CRUD
// ---------------------------------------------------------

app.get('/mods', (requisicao, resposta) => {
    const meusMods = lerDados();
    resposta.json(meusMods);
});

app.post('/mods', (requisicao, resposta) => {
    const meusMods = lerDados(); 
    const { nome, versao, utilidade } = requisicao.body;
    
    // 1. VALIDAÇÃO DE SEGURANÇA
    if (!nome || !versao || !utilidade) {
        return resposta.status(400).send("Erro: Você precisa preencher o nome, a versão e a utilidade do mod!");
    }

    // 2. GERADOR AUTOMÁTICO DE ID REFORÇADO (Anti-Null)
    let novoId = 1;
    if (meusMods.length > 0) {
        const ultimoMod = meusMods[meusMods.length - 1];
        // Verifica se o ID do último mod é um número válido antes de somar
        if (ultimoMod.id !== null && ultimoMod.id !== undefined) {
            novoId = Number(ultimoMod.id) + 1;
        } else {
            // Caso o último ID seja nulo por erro, ele tenta encontrar o maior ID da lista
            const maiorId = Math.max(...meusMods.map(m => Number(m.id) || 0));
            novoId = maiorId + 1;
        }
    }

    const novoMod = {
        id: novoId,
        nome: nome,
        versao: versao,
        utilidade: utilidade
    };
    
    meusMods.push(novoMod); 
    salvarDados(meusMods);  

    resposta.status(201).send(`Sucesso! O mod ${nome} foi adicionado com o ID automático ${novoId}.`);
});

app.put('/mods/:id', (requisicao, resposta) => {
    const meusMods = lerDados();
    const idParaAtualizar = parseInt(requisicao.params.id);
    const novosDados = requisicao.body;

    const index = meusMods.findIndex(mod => mod.id === idParaAtualizar);

    if (index !== -1) {
        meusMods[index] = { id: idParaAtualizar, ...novosDados };
        salvarDados(meusMods);
        resposta.send(`O mod com ID ${idParaAtualizar} foi atualizado e salvo!`);
    } else {
        resposta.status(404).send("Mod não encontrado na lista!");
    }
});

app.delete('/mods/:id', (requisicao, resposta) => {
    let meusMods = lerDados();
    const idParaApagar = parseInt(requisicao.params.id);

    meusMods = meusMods.filter(mod => mod.id !== idParaApagar);
    salvarDados(meusMods);

    resposta.send(`O mod com o ID ${idParaApagar} foi removido para sempre!`);
});

app.listen(porta, () => {
    console.log(`🚀 A API está rodando e salvando arquivos! Acesse http://localhost:${porta}/mods`);
});