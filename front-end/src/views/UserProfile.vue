<template>
  <div id="perfil-page">
    <div id="navbar">
      <img :src="require('@/assets/logo_login.png')" alt="LOGO" class="logo" />
    </div>
    <button class="btn-logout" @click="logout">Sair</button>

    <!-- Mensagem de feedback -->
    <div v-if="mensagem.visivel" :class="['mensagem', mensagem.tipo]">
      {{ mensagem.texto }}
      <button @click="fecharMensagem" class="fechar-mensagem">×</button>
    </div>

    <!-- Modal de confirmação -->
    <div v-if="modalConfirmacao.visivel" class="modal-overlay">
      <div class="modal">
        <p>Tem certeza que deseja excluir este ponto de coleta?</p>
        <div class="modal-botoes">
          <button @click="confirmarExclusao">Sim</button>
          <button @click="fecharModalConfirmacao">Não</button>
        </div>
      </div>
    </div>

    <div id="content-container">
      <Lateral_sidebar />
      <div id="content">
        <div class="header">
          <h1>Perfil</h1>
        </div>
        <div class="container-wrapper">
          <div class="container">
            <div class="user-info">
              <p><strong>Nome:</strong> {{ user.username }}</p>
              <p><strong>E-mail:</strong> {{ user.email }}</p>
            </div>

            <div class="pontos-cadastrados">
              <h2>Pontos de Coleta Cadastrados</h2>
              <div v-if="pontosDeColeta.length > 0">
                <div v-for="(ponto, index) in pontosDeColeta" :key="index" class="ponto-item">
                  <p><strong>Nome:</strong> {{ ponto.name }}</p>
                  <p><strong>Endereço:</strong> {{ ponto.address }}</p>
                  <p><strong>Material:</strong> {{ ponto.material_type }}</p>
                  <div class="btn-container">
                    <button @click="abrirModalConfirmacao(ponto.id)">Excluir</button>
                    <button @click="carregarInteresses(ponto.id)">Ver interesses</button>
                  </div>
                </div>
              </div>
              <p v-else>Nenhum ponto de coleta cadastrado.</p>
            </div>

            <div class="interesses">
              <h2>Interesses no Ponto de Coleta</h2>
              <div v-if="interesses.length > 0">
                <div v-for="(interesse, index) in interesses" :key="index" class="interesse-item">
                  <p><strong>Usuário:</strong> {{ interesse.username }}</p>
                  <p><strong>Data:</strong> {{ new Date(interesse.data_interesse).toLocaleDateString() }}</p>
                </div>
              </div>
              <p v-else>Nenhum interesse registrado.</p>
            </div>

            <div class="password-section">
              <button class="btn-alterar-senha" @click="mostrarFormularioSenha = !mostrarFormularioSenha">
                {{ mostrarFormularioSenha ? 'Ocultar' : 'Alterar Senha' }}
              </button>

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
      pontosDeColeta: [],
      interesses: [],
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: '',
      mostrarFormularioSenha: false,
      loading: false,
      mensagem: {
        visivel: false,
        texto: '',
        tipo: 'sucesso', // ou 'erro'
      },
      modalConfirmacao: {
        visivel: false,
        pontoId: null, // Armazena o ID do ponto a ser excluído
      },
    };
  },
  async created() {
    await this.carregarDadosUsuario();
    await this.carregarPontosDeColeta();
  },
  methods: {
    async carregarDadosUsuario() {
      this.loading = true;
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/auth/perfil', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data;
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        this.exibirMensagem('Erro ao carregar dados do perfil. Tente novamente mais tarde.', 'erro');
      } finally {
        this.loading = false;
      }
    },

    async carregarPontosDeColeta() {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/api/pontos/meus-pontos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.pontosDeColeta = response.data;
      } catch (error) {
        console.error('Erro ao carregar pontos de coleta:', error);
        this.exibirMensagem('Erro ao carregar pontos de coleta. Tente novamente mais tarde.', 'erro');
      }
    },

    async carregarInteresses(pontoId) {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:5000/api/pontos/interesses/${pontoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.interesses = response.data;
      } catch (error) {
        console.error('Erro ao carregar interesses:', error);
        this.exibirMensagem('Erro ao carregar interesses. Tente novamente mais tarde.', 'erro');
      }
    },

    async alterarSenha() {
      if (this.novaSenha !== this.confirmarSenha) {
        this.exibirMensagem('As senhas não coincidem.', 'erro');
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

        this.exibirMensagem(response.data.message, 'sucesso');
        this.senhaAtual = '';
        this.novaSenha = '';
        this.confirmarSenha = '';
        this.mostrarFormularioSenha = false;
      } catch (error) {
        console.error('Erro ao alterar senha:', error);
        if (error.response && error.response.data.error) {
          this.exibirMensagem(error.response.data.error, 'erro');
        } else {
          this.exibirMensagem('Erro ao alterar senha. Tente novamente mais tarde.', 'erro');
        }
      }
    },

    abrirModalConfirmacao(pontoId) {
      this.modalConfirmacao.visivel = true;
      this.modalConfirmacao.pontoId = pontoId;
    },

    fecharModalConfirmacao() {
      this.modalConfirmacao.visivel = false;
      this.modalConfirmacao.pontoId = null;
    },

    async confirmarExclusao() {
      if (this.modalConfirmacao.pontoId) {
        try {
          const token = localStorage.getItem('authToken');
          const response = await fetch(`http://localhost:5000/api/pontos/pontos-de-coleta/${this.modalConfirmacao.pontoId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Erro ao excluir ponto de coleta');
          }

          const data = await response.json();
          this.exibirMensagem(data.message, 'sucesso');
          await this.carregarPontosDeColeta();
        } catch (error) {
          console.error('Erro ao excluir ponto de coleta:', error);
          this.exibirMensagem('Erro ao excluir ponto de coleta. Tente novamente mais tarde.', 'erro');
        } finally {
          this.fecharModalConfirmacao();
        }
      }
    },

    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      this.$router.push('/login');
    },

    exibirMensagem(texto, tipo) {
      this.mensagem.visivel = true;
      this.mensagem.texto = texto;
      this.mensagem.tipo = tipo;
      setTimeout(() => {
        this.fecharMensagem();
      }, 5000); // Fecha a mensagem após 5 segundos
    },

    fecharMensagem() {
      this.mensagem.visivel = false;
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
  align-items: center;
  margin-top: -250px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
}

.header h1 {
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.7);
}

.container-wrapper {
  width: 100%;
  max-width: 800px;
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

.btn-container {
  display: flex;
  gap: 20px; /* Aumente o valor para afastar mais os botões */
  margin-top: 10px;
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
  top: 75px;
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

.mensagem {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10000;
}

.mensagem.sucesso {
  background-color: #4CAF50;
}

.mensagem.erro {
  background-color: #f44336;
}

.fechar-mensagem {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
}

.interesses {
  margin-top: 20px;
}

.interesse-item {
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

/* Estilos do modal de confirmação */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.modal p {
  margin-bottom: 20px;
  font-size: 18px;
}

.modal-botoes {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.modal-botoes button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-botoes button:first-child {
  background-color: #4CAF50;
  color: white;
}

.modal-botoes button:last-child {
  background-color: #f44336;
  color: white;
}
</style>