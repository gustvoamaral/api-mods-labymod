# ⚙️ API Mods - LabyMod

Este é o Back-end responsável por gerir a base de dados do meu painel pessoal de mods. Esta API foi desenvolvida especificamente para interagir e trabalhar em conjunto com o Front-end do meu painel web, garantindo uma comunicação rápida e segura usando uma base de dados local em formato JSON (`banco.json`).

## 🚀 Funcionalidades

- Persistência de dados guardando todos os mods registados no ficheiro local `banco.json`.
- Sistema Anti-Crash que verifica e recria automaticamente a base de dados caso esta seja eliminada.
- Atualização inteligente na rota (`PUT`), atualizando apenas os campos enviados e mantendo o resto intacto.
- Respostas padronizadas em formato JSON nativo para facilitar a leitura no Front-end.
- Rotas protegidas e preparadas com CORS para comunicação direta com o React.

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express (Criação do servidor e rotas)
- CORS (Permite pedidos cruzados vindos do Front-end)
- File System / fs (Leitura e escrita do JSON)

## 📦 Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/gustvoamaral/api-mods-labymod.git
2. Acesse a pasta do projeto: cd api-mods-labymod
3. Instale as dependências: npm install express cors

## ▶️ Uso

4. Para iniciar o servidor de desenvolvimento do painel, execute:
```sh
npm run dev
```
A API estará em execução e pronta para receber pedidos em: http://localhost:3000/mods

## 📡 Endpoints (Rotas da API)
**GET /mods** - Retorna a lista com todos os mods registados.

**POST /mods** - Adiciona um novo mod à base de dados. (Requer: nome, versão, categoria, utilidade).

**PUT /mods/:id** - Atualiza os dados de um mod específico pelo seu ID.

**DELETE /mods/:id** - Elimina um mod específico pelo seu ID.

## 📄 Open Source & Estudos
Esta API foi desenvolvida totalmente por mim e serve como a minha base de estudos para praticar a criação de servidores, manipulação de ficheiros (JSON) e desenvolvimento Back-end com Node.js.

O projeto é Open Source (código aberto), o que significa que, além de poder acompanhar a minha evolução no código, és totalmente livre para clonar, estudar, modificar e usar como base para as tuas próprias aprendizagens e projetos!
