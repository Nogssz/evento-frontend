
# Sistema de Gerenciamento de Eventos Acadêmicos

O **Sistema de Gerenciamento de Eventos Acadêmicos** foi criado com o objetivo de oferecer uma solução eficiente e prática para organizar e gerenciar eventos acadêmicos. Com uma interface intuitiva e funcionalidades avançadas, o sistema permite que usuários se registrem, participem de eventos, compartilhem feedback e interajam com outros participantes. Já os administradores possuem ferramentas para criar, gerenciar e acompanhar os eventos, garantindo uma experiência completa.

---

## Tecnologias Utilizadas

- **Frontend**: React.js, Material-UI (MUI).
- **Backend**: Node.js, Express.js.
- **Banco de Dados**: SQLite.
- **Autenticação**: JSON Web Token (JWT) para segurança.

---

## Funcionalidades do Sistema

### Usuários Comuns

1. **Registro e Login**:
   - Cadastro no sistema com validação de dados.
   - Login com autenticação JWT.

2. **Interação com Eventos**:
   - Visualização de eventos disponíveis.
   - Inscrição em eventos de interesse.
   - Avaliação de eventos após participação.
   - Envio de comentários públicos nos eventos.

### Administradores

1. **Gerenciamento de Eventos**:
   - Criação de eventos com informações detalhadas (nome, descrição, data, vagas, etc.).
   - Exclusão de eventos obsoletos ou cancelados.
   - Gerenciamento de inscrições e feedback.

2. **Controle do Sistema**:
   - Administração segura e protegida por autenticação avançada.
   - Monitoramento de feedback e interações dos usuários.

---

## Instalação e Configuração

### Pré-requisitos

- **Node.js** (v16 ou superior).
- **npm** ou **yarn** para gerenciar dependências.

### Passos para Configuração

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/seu-usuario/gerenciamento-eventos-academicos.git
   cd gerenciamento-eventos-academicos
   ```

2. **Instale as Dependências**:
   - Backend:
     ```bash
     npm install
     ```
   - Frontend:
     ```bash
     cd evento-frontend
     npm install
     ```

3. **Configure as Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:
   ```makefile
   JWT_SECRET=secrettoken
   PORT=5000
   ```

4. **Inicie o Sistema**:
   - Inicie o servidor backend:
     ```bash
     npm run server
     ```
   - Inicie o frontend:
     ```bash
     cd evento-frontend
     npm start
     ```

   O backend estará disponível na porta **5000** e o frontend na porta **3000**.

---

## Estrutura do Projeto

- **Backend**:
  - `server.js`: Configurações principais do servidor e rotas.
  - `db.js`: Configuração do banco de dados SQLite.
  - `middleware/authMiddleware.js`: Middleware de autenticação.
  - `routes/`: Rotas para eventos e usuários.

- **Frontend**:
  - `App.js`: Configuração de rotas e estrutura principal.
  - Componentes:
    - `Login.js`: Tela de login.
    - `Register.js`: Tela de cadastro de usuários.
    - `Eventos.js`: Lista de eventos disponíveis.
    - `CriarEvento.js`: Formulário de criação de eventos (admin).

---

## Possíveis Melhorias Futuras

1. **Segurança Avançada**:
   - Implementar autenticação multifator (MFA).
   - Utilizar bibliotecas como `express-rate-limit` para limitar tentativas de login.

2. **Experiência do Usuário**:
   - Melhorar a interface utilizando componentes avançados do Material-UI.
   - Adicionar paginação e filtros para facilitar a busca por eventos específicos.

3. **Backend Otimizado**:
   - Implementar cache para consultas frequentes.
   - Normalizar o banco de dados e adicionar índices para melhorar desempenho.

4. **Funcionalidades Adicionais**:
   - Sistema de recomendação de eventos com base nos interesses dos usuários.
   - Envio de notificações por e-mail para lembretes de eventos.

---

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo para contribuir:

1. Faça um fork do repositório.
2. Crie um branch para suas mudanças:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Faça suas mudanças e commit:
   ```bash
   git commit -m "Descrição da mudança"
   ```
4. Envie suas alterações para o branch:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request.

---

## Contato

Para mais informações, entre em contato com o desenvolvedor pelo e-mail: [seu-email@dominio.com](mailto:seu-email@dominio.com).
