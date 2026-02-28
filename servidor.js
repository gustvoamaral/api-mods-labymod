const express = require('express'); 
const fs = require('fs');
const cors = require('cors'); 

const app = express(); 
const porta = 3000;

app.use(cors()); 
app.use(express.json()); 

// Função para ler o arquivo banco.json
function lerDados() {
    const dados = fs.readFileSync('banco.json', 'utf-8');
    return JSON.parse(dados);
}

// Função para salvar no arquivo banco.json
function salvarDados(dados) {
    fs.writeFileSync('banco.json', JSON.stringify(dados, null, 2));
}

// --- ROTAS DO CRUD ---

app.get('/mods', (requisicao, resposta) => {
    const meusMods = lerDados();
    resposta.json(meusMods);
});

app.post('/mods', (requisicao, resposta) => {
    const meusMods = lerDados(); 
    const { nome, versao, utilidade } = requisicao.body;
    
    if (!nome || !versao || !utilidade) {
        return resposta.status(400).send("Erro: Preencha todos os campos!");
    }

    // Lógica de ID melhorada: Encontra o maior ID existente e soma 1
    // Se a lista estiver vazia, o ID começa em 1
    const novoId = meusMods.length > 0 
        ? Math.max(...meusMods.map(m => Number(m.id))) + 1 
        : 1;

    const novoMod = { id: novoId, nome, versao, utilidade };
    meusMods.push(novoMod); 
    salvarDados(meusMods);  

    // Retornamos o objeto JSON em vez de apenas texto (melhor para o React)
    resposta.status(201).json(novoMod);
});

app.put('/mods/:id', (requisicao, resposta) => {
    const meusMods = lerDados();
    const idParaAtualizar = parseInt(requisicao.params.id);
    const novosDados = requisicao.body;

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

    resposta.send(`O mod com o ID ${idParaApagar} foi removido!`);
});

app.listen(porta, () => {
    console.log(`🚀 API StarDix ON: http://localhost:${porta}/mods`);
});