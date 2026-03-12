const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const porta = 3000;  

app.use(cors());
app.use(express.json());

const caminhoBanco = 'banco.json';

function lerDados() {
    if (!fs.existsSync(caminhoBanco)) {
        fs.writeFileSync(caminhoBanco, '[]'); 
    }
    const dados = fs.readFileSync(caminhoBanco, 'utf-8');
    return JSON.parse(dados);
}

function salvarDados(dados) {
    fs.writeFileSync(caminhoBanco, JSON.stringify(dados, null, 2));
}

app.get('/mods', (requisicao, resposta) => {
    resposta.json(lerDados());
});

app.post('/mods', (requisicao, resposta) => {
    const meusMods = lerDados(); 
    const { nome, versao, utilidade, categoria } = requisicao.body;
    
    if (!nome || !versao || !utilidade || !categoria) {
        return resposta.status(400).json({ erro: "Preenche os campos obrigatórios!" }); 
    }

    const novoId = meusMods.length > 0 
        ? Math.max(...meusMods.map(m => Number(m.id))) + 1 
        : 1;

    const novoMod = { id: novoId, nome, versao, utilidade, categoria };
    meusMods.push(novoMod); 
    salvarDados(meusMods);  

    resposta.status(201).json(novoMod);
});

app.put('/mods/:id', (requisicao, resposta) => {
    const meusMods = lerDados();
    const idParaAtualizar = parseInt(requisicao.params.id);
    const novosDados = requisicao.body; 

    const index = meusMods.findIndex(mod => mod.id === idParaAtualizar);

    if (index !== -1) {
        meusMods[index] = { ...meusMods[index], ...novosDados, id: idParaAtualizar };
        salvarDados(meusMods);
        resposta.json({ mensagem: `O mod com ID ${idParaAtualizar} foi atualizado!` });
    } else {
        resposta.status(404).json({ erro: "Mod não encontrado!" });
    }
});

app.delete('/mods/:id', (requisicao, resposta) => {
    let meusMods = lerDados();
    const idParaApagar = parseInt(requisicao.params.id);

    const novaLista = meusMods.filter(mod => mod.id !== idParaApagar);
    salvarDados(novaLista);

    resposta.json({ mensagem: "Mod removido com sucesso!" });
});

app.listen(porta, () => {
    console.log(`🚀 API StarDix ON: http://localhost:${porta}/mods`);
});