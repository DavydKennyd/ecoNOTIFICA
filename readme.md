# Econotifica

O **Econotifica** é uma plataforma que ajuda as pessoas a encontrar pontos de coleta de materiais recicláveis, promover a conscientização ambiental e facilitar a conexão entre usuários interessados em reciclagem.

## Funcionalidades Principais

- **Cadastro e Login de Usuários**: Os usuários podem se cadastrar e fazer login na plataforma.
- **Pontos de Coleta**: Os usuários podem adicionar, visualizar e buscar pontos de coleta de materiais recicláveis.
- **Interesses**: Os usuários podem demonstrar interesse em pontos de coleta específicos.
- **Perfil do Usuário**: Os usuários podem visualizar e editar suas informações, além de ver os pontos de coleta que cadastraram.
- **Contato e Ajuda**: Páginas de contato e ajuda para suporte ao usuário.

## Tecnologias Utilizadas

- **Front-end**: Vue.js, Vue Router, Axios
- **Back-end**: Node.js, Express, PostgreSQL
- **Autenticação**: JWT (JSON Web Tokens)
- **Upload de Arquivos**: Multer
- **Estilização**: CSS, Google Fonts

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [PostgreSQL](https://www.postgresql.org/)
- [Vue CLI](https://cli.vuejs.org/) (opcional, para desenvolvimento front-end)

## Configuração do Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/econotifica.git
cd econotifica
```

### 2. Instale as dependências

### Front-end
``` BASH
cd frontend
npm install
```

### Back-end
``` BASH
cd backend
npm install
```

### 3. Configuração do Banco de Dados

1. Usando Tembo (Postgres na Nuvem)
- O **Tembo** é uma plataforma na nuvem especializada em PostgreSQL, oferecendo instâncias prontas para produção com IA, pesquisa vetorial e mais de 200 extensões pré-configuradas. Ele simplifica a gestão do banco de dados, com backups automáticos, escalabilidade sob demanda e alta disponibilidade. Ideal para projetos como o **Econotifica**, o Tembo reduz custos com infraestrutura e permite focar no desenvolvimento da aplicação. Além disso, sua integração fácil com ferramentas modernas acelera a implementação de funcionalidades avançadas.

2. Acesse https://tembo.io/ e crie uma instância do Postgres.

### Estrutura do Banco de Dados
As tabelas do banco de dados são criadas com o seguinte SQL:

```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Senha criptografada
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE collection_points (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,  -- Relacionamento com a tabela users
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    reference VARCHAR(255),
    material_type VARCHAR(100),
    responsible_name VARCHAR(100),
    contact_info VARCHAR(255),
    media_url TEXT,  -- URL do arquivo de foto/vídeo (pode ser armazenado em servidor ou sistema de arquivos)
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ponto_interesse (
    id SERIAL PRIMARY KEY,
    ponto_id INT REFERENCES collection_points(id) ON DELETE CASCADE,
    usuario_id INT REFERENCES users(id) ON DELETE CASCADE,
    data_interesse TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
Caso prefira usar banco de dados local:
2.1 Configure as variáveis de ambiente no arquivo .env na pasta backend:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=econotifica
JWT_SECRET=sua_chave_secreta_jwt
```
3. Execute as migrações para criar as tabelas no banco de dados:

```bash
cd backend
npm run migrate 
```

### 4. Inicie o servidor

```bash
npm start
```

## Estrutura do Projeto

### Front-end
- `src/router/index.js`: Configuração das rotas do Vue Router.

- ``src/views/``: Contém as páginas da aplicação (Login, Cadastro, Perfil, etc.).

- `src/components/`: Componentes reutilizáveis (sidebar, cabeçalho, etc.).

- `src/assets/`: Arquivos estáticos (imagens, CSS).

### Back-end
`controllers/`: Lógica de controle para autenticação, pontos de coleta, etc.

`models/`: Definição dos modelos de dados (usuários, pontos de coleta).

`routes/`: Definição das rotas da API.

`config/`: Configuração do banco de dados e outras configurações.

`middleware/`: Middleware para autenticação JWT.


## Dependências
### Front-end
- **Vue.js**: Framework JavaScript para construção de interfaces.

- **Vue Router**: Gerenciamento de rotas no Vue.js.

- **Axios**: Cliente HTTP para fazer requisições à API.

- **CSS**: Estilização da aplicação.

### Back-end
- **Express:** Framework para construção de APIs em Node.js.

- **PostgreSQL**: Banco de dados relacional.

- **JWT**: Autenticação via tokens.

- **Multer**: Middleware para upload de arquivos.

- **Bcrypt**: Criptografia de senhas.

## Como Usar

# Cadastro e Login

Acesse a página de login em [http://localhost:8080/login](http://localhost:8080/login).

Se você não tem uma conta, clique em **"Não tem cadastro? Clique aqui"** para se registrar.

Após o cadastro, faça login com suas credenciais.

## Adicionar Ponto de Coleta

Após o login, acesse a página de perfil.

Clique em **"Adicionar ponto de coleta"**.

Preencha o formulário com as informações do ponto de coleta e envie.

## Buscar Pontos de Coleta

Na página de perfil, clique em **"Buscar ponto de coleta"**.

Visualize a lista de pontos de coleta disponíveis.

Clique em **"Detalhar"** para ver mais informações sobre um ponto específico.

## Demonstrar Interesse

Na lista de pontos de coleta, clique em **"Tenho interesse"** para demonstrar interesse em um ponto específico.

O responsável pelo ponto de coleta será notificado.

## Alterar Senha

Na página de perfil, clique em **"Alterar Senha"**.

Preencha o formulário com sua senha atual e a nova senha.

Clique em **"Atualizar Senha"**.

# Contribuição

Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

# Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

# Contato

Para mais informações, entre em contato:

- **Davyd Kennyd**: Desenvolvedor Full-Stack
- **Vivian Raquel**: Gerente de Projeto e Desenvolvedora Front-end
- **Welson Rodrigues**: Desenvolvedor Back-end
- **Jainy Eduarda**: Desenvolvedora Front-end e Designer.


### Instruções Adicionais

1. **Bibliotecas e Dependências**:
   - Certifique-se de que todas as dependências listadas nos arquivos `package.json` (tanto no front-end quanto no back-end) estejam instaladas.
   - Para instalar as dependências, execute `npm install` nas pastas `frontend` e `backend`.

2. **Configuração do Banco de Dados**:
   - O banco de dados PostgreSQL deve estar configurado com as credenciais corretas no arquivo `.env`.
   - As migrações devem ser executadas para criar as tabelas necessárias.

3. **Execução**:
   - O back-end deve ser iniciado antes do front-end para garantir que a API esteja disponível.
   - Certifique-se de que o servidor back-end esteja rodando na porta `5000` e o front-end na porta `8080`.

4. **Testes**:
   - Teste todas as funcionalidades após a configuração inicial para garantir que tudo esteja funcionando corretamente.




*"A maioria dos bons programadores não programa porque espera ser pago ou adulado, mas porque é divertido programar."*
***– Linus Torvalds***
