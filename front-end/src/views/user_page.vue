<template>
  <div id="perfil-page">
    <div id="navbar">
      <img :src="require('@/assets/logo_login.png')" alt="LOGO" class="logo" />
    </div>
    <div id="content-container">
      <Lateral_sidebar />
      <div id="content">
        <div class="header">
          <button class="btn" @click="toggleView('add')">Adicionar ponto de coleta</button>
          <button class="btn" @click="toggleView('search')">Buscar ponto de coleta</button>
        </div>

        <!-- Formulário de adicionar ponto -->
        <div v-if="currentView === 'add'" class="form-container">
          <h3>Informações Adicionais</h3>
          <form @submit.prevent="adicionarPontoDeColeta">
            <label>Nome:</label>
            <input type="text" v-model="novoPonto.nome" placeholder="Nome do local" required />

            <label>Endereço:</label>
            <input type="text" v-model="novoPonto.endereco" placeholder="Digite o endereço" required />

            <label>Referência:</label>
            <input type="text" v-model="novoPonto.referencia" placeholder="Digite uma referência" />

            <label>Tipo de Material:</label>
            <input type="text" v-model="novoPonto.tipoMaterial" placeholder="Tipo de material" required />

            <label>Responsável:</label>
            <input type="text" v-model="novoPonto.responsavel" placeholder="Nome do responsável" required />

            <label>Contato:</label>
            <input type="text" v-model="novoPonto.contato" placeholder="Informações de contato" required />

            <label>Foto/Video:</label>
            <input 
              type="file" 
              @change="(event) => novoPonto.fotoVideo = event.target.files[0]" 
              ref="fileInput"
            />

            <label>Descrição:</label>
            <textarea v-model="novoPonto.descricao" placeholder="Adicione uma descrição"></textarea>

            <center><button type="submit" class="btn-register botao--">CADASTRAR</button></center>
          </form>
        </div>

        <!-- Lista de pontos de coleta -->
        <div v-if="currentView === 'search'" class="form-container">
          <h3>Pontos de Coleta</h3>
          <div 
            class="ponto-de-coleta" 
            v-for="(ponto, index) in pontosDeColeta" 
            :key="index"
          >
            <h4>{{ ponto.name }}</h4>
            <p>📍 Endereço: {{ ponto.address }}</p>
            <p>🗺️ Referência: {{ ponto.reference }}</p>
            <p>📋 Tipo de Material: {{ ponto.material_type }}</p>
            <p>👤 Responsável: {{ ponto.responsible_name }}</p>
            <p>📞 Contato: {{ ponto.contact_info }}</p>
            <p>👤 Cadastrado por: {{ ponto.username }}</p>
            <div v-if="ponto.media_url">
              <img :src="ponto.media_url" alt="Foto do ponto de coleta" class="media" />
            </div>
            <p>📝 Descrição: {{ ponto.description }}</p>
            <button @click="detalharPonto(ponto)">Detalhar</button>
          </div>
        </div>

        <!-- Modal para detalhes do ponto de coleta -->
        <div v-if="pontoDetalhado" class="modal">
          <div class="modal-content">
            <span class="close" @click="fecharModal">&times;</span>
            <h3>Detalhes do Ponto de Coleta</h3>
            <p><strong>Nome:</strong> {{ pontoDetalhado.name }}</p>
            <p><strong>Endereço:</strong> {{ pontoDetalhado.address }}</p>
            <p><strong>Referência:</strong> {{ pontoDetalhado.reference }}</p>
            <p><strong>Tipo de Material:</strong> {{ pontoDetalhado.material_type }}</p>
            <p><strong>Responsável:</strong> {{ pontoDetalhado.responsible_name }}</p>
            <p><strong>Contato:</strong> {{ pontoDetalhado.contact_info }}</p>
            <p><strong>Descrição:</strong> {{ pontoDetalhado.description }}</p>
            <div v-if="pontoDetalhado.media_url">
              <img :src="pontoDetalhado.media_url" alt="Foto do ponto de coleta" class="media" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lateral_sidebar from "@/components/sidebar.vue";

export default {
  name: "userPerfil",
  components: {
    Lateral_sidebar,
  },
  data() {
    return {
      currentView: "add",
      pontosDeColeta: [],
      novoPonto: {
        nome: "",
        endereco: "",
        referencia: "",
        tipoMaterial: "",
        responsavel: "",
        contato: "",
        fotoVideo: null,
        descricao: "",
      },
      pontoDetalhado: null,
    };
  },
  methods: {
    async fetchPontosDeColeta() {
      try {
        const response = await fetch('http://localhost:5000/api/pontos/pontos-de-coleta');
        const data = await response.json();
        this.pontosDeColeta = data;
      } catch (error) {
        console.error('Erro ao buscar pontos de coleta:', error);
      }
    },

    async adicionarPontoDeColeta() {
      try {
        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append("nome", this.novoPonto.nome);
        formData.append("endereco", this.novoPonto.endereco);
        formData.append("referencia", this.novoPonto.referencia);
        formData.append("tipoMaterial", this.novoPonto.tipoMaterial);
        formData.append("responsavel", this.novoPonto.responsavel);
        formData.append("contato", this.novoPonto.contato);
        formData.append("descricao", this.novoPonto.descricao);
        
        if (this.novoPonto.fotoVideo) {
          formData.append("fotoVideo", this.novoPonto.fotoVideo);
        }

        const response = await fetch('http://localhost:5000/api/pontos/pontos-de-coleta', {
          method: 'POST',
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Erro ao adicionar o ponto de coleta");
        }

        const novoPontoAdicionado = await response.json();
        this.pontosDeColeta.push(novoPontoAdicionado);

        // Resetar formulário
        this.novoPonto = {
          nome: "",
          endereco: "",
          referencia: "",
          tipoMaterial: "",
          responsavel: "",
          contato: "",
          fotoVideo: null,
          descricao: "",
        };
        this.$refs.fileInput.value = "";

        alert("Ponto de coleta adicionado com sucesso!");
        this.currentView = "search";
      } catch (error) {
        console.error("Erro ao adicionar ponto de coleta:", error);
        alert("Erro ao adicionar ponto de coleta!");
      }
    },

    toggleView(view) {
      this.currentView = view;
      if (view === "search") {
        this.fetchPontosDeColeta();
      }
    },

    detalharPonto(ponto) {
      this.pontoDetalhado = ponto;
    },

    fecharModal() {
      this.pontoDetalhado = null;
    }
  },
  mounted() {
    this.fetchPontosDeColeta();
  }
};
</script>

<style scoped>
/* Estilos gerais */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

body {
  font-family: "Nunito", sans-serif;
}

#perfil-page {
  display: flex;
  flex-direction: column;
  height: 100vh; 
  overflow: hidden;
  background-color:rgb(231, 231, 231);
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

/* Navbar */
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

/* Content Container */
#content-container {
  display: flex;
  flex: 1; 
  overflow: hidden;
  position: relative; 
}

.navbar-title {
  margin: 0;
}

/* Sidebar e Conteúdo */
#content {
  margin-left: 100px; 
  padding: 20px;
  flex: 1;
  overflow-y: auto; 
}

.header {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}

/* Formulário */
.form-container {
  background-color: #7FBF6D;
  padding: 40px;
  border-radius: 10px;
  max-width: 500px; 
  margin-left: 0; 
  margin-right: auto; 
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 
  max-height: 80vh; 
  overflow-y: auto; 
  -ms-overflow-style: none; 
  scrollbar-width: none;
}

form label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

form input,
form textarea {
  width: 100%;
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form textarea {
  height: 100px;
}

/* Pontos de Coleta */
.ponto-de-coleta {
  background-color:rgba(255, 240, 233, 0.86);
  border: 2px solid #4CAF50;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #333;
}

.ponto-de-coleta h4 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #1F7F15;
}

.ponto-de-coleta p {
  margin: 5px 0;
}

.media {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 5px;
}

/* Estilos do modal */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escurecido */
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.close {
  float: right;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover {
  color: red;
}
</style>