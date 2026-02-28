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

// ROTA DELETE: Apaga um mod específico (RUD - Delete)
app.delete('/mods/:id', (requisicao, resposta) => {
// Pegamos o ID que você digitou lá na URL da requisição
    const idParaApagar = parseInt(requisicao.params.id);

    // Filtramos a lista: guardamos todos os mods, MENOS o que tem esse ID
    meusMods = meusMods.filter(mod => mod.id !== idParaApagar);

    resposta.send(`O mod com o ID ${idParaApagar} foi removido da sua lista!`);
});

// ROTA PUT: Atualiza um mod que já existe (O "U" do CRUD - Update)
app.put('/mods/:id', (requisicao, resposta) => {
    // 1. Pegamos o ID da URL
    const idParaAtualizar = parseInt(requisicao.params.id);
    
    // 2. Pegamos os dados novos que você enviou pelo Insomnia
    const novosDados = requisicao.body;

    // 3. Procuramos a posição desse mod na nossa lista
    const index = meusMods.findIndex(mod => mod.id === idParaAtualizar);

    // 4. Se ele achar o mod (index diferente de -1), ele atualiza
    if (index !== -1) {
        meusMods[index] = { id: idParaAtualizar, ...novosDados };
        resposta.send(`O mod com ID ${idParaAtualizar} foi atualizado para a nova versão!`);
    } else {
        // Se você digitar um ID que não existe, ele avisa
        resposta.status(404).send("Mod não encontrado na lista!");
    }
});

app.listen(porta, () => {
    console.log(`🚀 A API está rodando! Acesse http://localhost:${porta}/mods`);
});