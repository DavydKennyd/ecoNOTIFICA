<template>
  <div id="perfil-page">
    <div id="navbar">
      <img :src="require('@/assets/logo_simples.png')" alt="LOGO" class="logo" />
    </div>
    <div id="content-container">
      <Lateral_sidebar />
      <div id="content">
        <div class="header">
          <button class="btn" @click="toggleView('add')">Adicionar ponto de coleta</button>
          <button class="btn" @click="toggleView('search')">Buscar ponto de coleta</button>
        </div>
        <div v-if="currentView === 'add'" class="form-container">
          <h3>Informações Adicionais</h3>
          <form>
            <label>Nome:</label>
            <input type="text" placeholder="Nome do local" />

            <label>Endereço:</label>
            <input type="text" placeholder="Digite o endereço" />

            <label>Referência:</label>
            <input type="text" placeholder="Digite uma referência" />

            <label>Tipo de Material:</label>
            <input type="text" placeholder="Tipo de material" />

            <label>Responsável:</label>
            <input type="text" placeholder="Nome do responsável" />

            <label>Contato:</label>
            <input type="text" placeholder="Informações de contato" />

            <label>Foto/Video:</label>
            <input type="file" />

            <label>Descrição:</label>
            <textarea placeholder="Adicione uma descrição"></textarea>
          </form>
        </div>
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
            <div v-if="ponto.fotoVideo !== 'Não há mídia disponível'">
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
      username: localStorage.getItem('username'),  // Pegando o nome do usuário
      pontosDeColeta: [
        {
          nome: "Ponto de Coleta - Mercado Central",
          endereco: "Rua Passa Nada (Por trás do beco do sufoco), 157, Bairro do Embassai, Acari, RN.",
          referencia: "Próximo à feira central",
          tipoMaterial: "Plástico, papel, vidro, eletrônicos",
          responsavel: "João da Silva",
          contato: "(84) 99999-9999",
          fotoVideo: "Não há mídia disponível",
          descricao: "Este ponto de coleta aceita materiais recicláveis de segunda a sexta, das 8h às 17h.",
        },
      ],
    };
  },
  methods: {
    toggleView(view) {
      this.currentView = view;
    },
    detalharPonto(index) {
      alert(`Detalhes do ponto de coleta: ${this.pontosDeColeta[index].descricao}`);
    },
  },
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
  top: 7px;
  left: 25px;
  width: 235px;
  height: auto;
  z-index: 10;
  filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.7)); 
}

/* Navbar */
#navbar {
  height: 60px;
  background-color:rgb(53, 94, 59); 
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
  background-color: #E3F8E3;
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
/*COMENTANDO ISSO AQUI PARA PROVAR QUE SEI COMMITAR E ELIEZIO VER*/
</style>
