<template>
  <div id="perfil-page">
    <div id="navbar">
      <img :src="require('@/assets/logo_login.png')" alt="LOGO" class="logo" />
    </div>
    <button class="btn-logout" @click="logout">Sair</button>

    
    <div id="content-container">
      <Lateral_sidebar />
      <div id="content">
        <div class="header">
          <h1>Perfil</h1>
        </div>
        <div class="container-wrapper">
          <div class="container">
            <!-- Informações do usuário -->
            <div class="user-info">
              <p><strong>Nome:</strong> {{ user.username }}</p>
              <p><strong>E-mail:</strong> {{ user.email }}</p>
            </div>

            <!-- Pontos de coleta cadastrados pelo usuário -->
            <div class="pontos-cadastrados">
              <h2>Pontos de Coleta Cadastrados</h2>
              <div v-if="pontosDeColeta.length > 0">
                <div v-for="(ponto, index) in pontosDeColeta" :key="index" class="ponto-item">
                  <p><strong>Nome:</strong> {{ ponto.name }}</p>
                  <p><strong>Endereço:</strong> {{ ponto.address }}</p>
                  <p><strong>Material:</strong> {{ ponto.material_type }}</p>
                  <button @click="excluirPonto(ponto.id)">Excluir</button> <!-- Botão de exclusão -->
                </div>
              </div>
              <p v-else>Nenhum ponto de coleta cadastrado.</p>
            </div>

            <!-- Botão para exibir o formulário de alteração de senha -->
            <div class="password-section">
              <button class="btn-alterar-senha" @click="mostrarFormularioSenha = !mostrarFormularioSenha">
                {{ mostrarFormularioSenha ? 'Ocultar' : 'Alterar Senha' }}
              </button>

              <!-- Formulário de alteração de senha -->
              <form v-if="mostrarFormularioSenha" @submit.prevent="alterarSenha">
                <label for="current-password">Senha Atual:</label>
                <input type="password" id="current-password" v-model="senhaAtual" required>
                <label for="new-password">Nova Senha:</label>
                <input type="password" id="new-password" v-model="novaSenha" required>
                <label for="confirm-password">Confirmar Nova Senha:</label>
                <input type="password" id="confirm-password" v-model="confirmarSenha" required>
                <button type="submit">Atualizar Senha</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lateral_sidebar from "@/components/sidebar.vue";
import axios from 'axios';

export default {
  name: 'UserProfile',
  components: {
    Lateral_sidebar,
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
      },
      pontosDeColeta: [], // Lista de pontos de coleta cadastrados pelo usuário
      senhaAtual: '', // Senha atual para alteração
      novaSenha: '', // Nova senha
      confirmarSenha: '', // Confirmação da nova senha
      mostrarFormularioSenha: false, // Controla a exibição do formulário de alteração de senha
      loading: false, // Estado de carregamento
    };
  },
  async created() {
    // Carrega os dados do usuário e os pontos de coleta ao criar o componente
    await this.carregarDadosUsuario();
    await this.carregarPontosDeColeta();
  },
  methods: {
    // Carrega os dados do usuário logado
    async carregarDadosUsuario() {
      this.loading = true;
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/auth/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data; // Atualiza os dados do usuário
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        alert('Erro ao carregar dados do perfil. Tente novamente mais tarde.');
      } finally {
        this.loading = false;
      }
    },

    // Carrega os pontos de coleta cadastrados pelo usuário
    async carregarPontosDeColeta() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/pontos/meus-pontos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.pontosDeColeta = response.data; // Atualiza a lista de pontos de coleta
      } catch (error) {
        console.error('Erro ao carregar pontos de coleta:', error);
        alert('Erro ao carregar pontos de coleta. Tente novamente mais tarde.');
      }
    },

    // Altera a senha do usuário
    async alterarSenha() {
    if (this.novaSenha !== this.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:5000/api/auth/alterar-senha',
        {
          senhaAtual: this.senhaAtual,
          novaSenha: this.novaSenha,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message); // Exibe a mensagem de sucesso
      this.senhaAtual = '';
      this.novaSenha = '';
      this.confirmarSenha = '';
      this.mostrarFormularioSenha = false; // Oculta o formulário após a alteração
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      if (error.response && error.response.data.error) {
        alert(error.response.data.error); // Exibe a mensagem de erro do backend
      } else {
        alert('Erro ao alterar senha. Tente novamente mais tarde.');
      }
    }
  },

    async excluirPonto(pontoId) {
    console.log('ID do ponto de coleta:', pontoId); 
    if (confirm('Tem certeza que deseja excluir este ponto de coleta?')) {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:5000/api/pontos/pontos-de-coleta/${pontoId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao excluir ponto de coleta');
        }

        const data = await response.json();
        alert(data.message); // Exibe a mensagem de sucesso

        // Atualiza a lista de pontos de coleta
        await this.carregarPontosDeColeta(); // Recarrega a lista de pontos de coleta
      } catch (error) {
        console.error('Erro ao excluir ponto de coleta:', error);
        alert('Erro ao excluir ponto de coleta. Tente novamente mais tarde.');
      }
    }
  },


    // Faz logout do usuário
    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      this.$router.push('/login');
    },
  },
};
</script>
  
 <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

body {
  font-family: "Nunito", sans-serif;
  margin: 0;
  padding: 0;
}

#perfil-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(231, 231, 231);
}

.logo {
  position: absolute;
  top: 12px;
  left: 5px;
  width: 210px;
  height: auto;
  z-index: 10;
  filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.7));
}

#navbar {
  height: 65px;
  background: linear-gradient(to bottom, #1B3C29, #355E3B, #4CAF50);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

#content-container {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

#content {
  margin-left: 0px;
  padding: 50px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza o conteúdo horizontalmente */
  margin-top: -250px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px; /* Limita a largura do conteúdo */
  margin-bottom: 20px;
}
.header h1{
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
}

.container-wrapper {
  width: 100%;
  max-width: 800px; /* Limita a largura do conteúdo */
  margin-top: 20px;
}

.container {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
}

.user-info {
  margin-bottom: 20px;
}

.pontos-cadastrados {
  margin-bottom: 20px;
}

.ponto-item {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.password-section {
  margin-bottom: 20px;
}

form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

form label {
  font-weight: bold;
}

form input {
  width: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-logout {
  position: fixed;
  top: 75px; /* Logo abaixo do navbar */
  right: 20px;
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 9999;
}


button:hover {
  background-color: #45a049;
}

.btn-logout {
  background-color: #f44336;
}

.btn-logout:hover {
  background-color: #d32f2f;
}

.btn-alterar-senha {
  background-color: #ff9800;
  margin-bottom: 10px;
}

.btn-alterar-senha:hover {
  background-color: #f57c00;
}
</style>