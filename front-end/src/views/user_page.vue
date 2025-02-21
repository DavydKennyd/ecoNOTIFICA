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
            <h4>{{ ponto.nome }}</h4>
            <p>📍 Endereço: {{ ponto.endereco }}</p>
            <p>🗺️ Referência: {{ ponto.referencia }}</p>
            <p>📋 Tipo de Material: {{ ponto.tipoMaterial }}</p>
            <p>👤 Responsável: {{ ponto.responsavel }}</p>
            <p>📞 Contato: {{ ponto.contato }}</p>
            <div v-if="ponto.fotoVideo">
              <img :src="ponto.fotoVideo" alt="Foto do ponto de coleta" class="media" />
            </div>
            <p>📝 Descrição: {{ ponto.descricao }}</p>
            <button @click="detalharPonto(index)">Detalhar</button>
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
      username: localStorage.getItem('username'),  
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
      }
    };
  },
  methods: {
    async fetchPontosDeColeta() {
      try {
        const response = await fetch('http://localhost:5000/api/pontos/pontos-de-coleta');
        const data = await response.json();

        // Converte a imagem binária em URL
        this.pontosDeColeta = data.map(ponto => {
          if (ponto.fotoVideo && ponto.fotoVideo instanceof Blob) {
            ponto.fotoVideo = URL.createObjectURL(ponto.fotoVideo);
          }
          return ponto;
        });
      } catch (error) {
        console.error('Erro ao buscar pontos de coleta:', error);
      }
    },

    async adicionarPontoDeColeta() {
      try {
        if (
          !this.novoPonto.nome ||
          !this.novoPonto.endereco ||
          !this.novoPonto.tipoMaterial ||
          !this.novoPonto.responsavel ||
          !this.novoPonto.contato
        ) {
          alert("Por favor, preencha todos os campos obrigatórios.");
          return;
        }

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
          body: formData
        });

        if (!response.ok) {
          throw new Error("Erro ao adicionar o ponto de coleta");
        }

        const novoPontoAdicionado = await response.json();
        this.pontosDeColeta.push(novoPontoAdicionado); // Adiciona o novo ponto à lista

        // Resetando o formulário após adicionar
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
        this.$refs.fileInput.value = ""; // Resetar o input de arquivo

        alert("Ponto de coleta adicionado com sucesso!");
        this.currentView = "search"; // Alterando a tela para visualizar os pontos adicionados
      } catch (error) {
        console.error("Erro ao adicionar ponto de coleta:", error);
        alert("Erro ao adicionar ponto de coleta!");
      }
    },

    toggleView(view) {
      if (view === "add") {
        this.adicionarPontoDeColeta(); // Adiciona o ponto de coleta
      } else {
        this.currentView = view; // Alterna para a visualização de busca
        if (view === "search") {
          this.fetchPontosDeColeta(); // Recarrega os pontos ao clicar em buscar
        }
      }
    },

    detalharPonto(index) {
      const ponto = this.pontosDeColeta[index];
      alert(`Detalhes do ponto:\n
        Nome: ${ponto.nome}\n
        Endereço: ${ponto.endereco}\n
        Referência: ${ponto.referencia}\n
        Tipo de Material: ${ponto.tipoMaterial}\n
        Responsável: ${ponto.responsavel}\n
        Contato: ${ponto.contato}\n
        Descrição: ${ponto.descricao}
      `);
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
</style>