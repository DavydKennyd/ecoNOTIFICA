<template>
  <div id="perfil-page">
    <div id="navbar">
      <h1 class="navbar-title">ECONOTIFICA</h1>
    </div>
    <div id="content-container">
      <Lateral_sidebar />
      <div id="content">
        <div class="header">
          <button class="btn">Adicionar ponto de coleta</button>
          <button class="btn">Buscar ponto de coleta</button>
        </div>
        <div class="form-container">
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
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
body{
  font-family: "Nunito", sans-serif;
}
/* Layout principal */
#perfil-page {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Garantir que o layout use a altura completa da tela */
  overflow: hidden;
}

/* Navbar */
#navbar {
  height: 60px;
  background-color: #4caf50; /* Mesma cor da sidebar */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.navbar-title {
  margin: 0;
}

/* Content Container */
#content-container {
  display: flex;
  flex: 1; /* Preencher o restante da altura */
  overflow: hidden;
}

/* Sidebar e Conteúdo */
#content {
  margin-left: 100px; /* Largura da sidebar */
  padding: 20px;
  flex: 1;
  overflow-y: auto; /* Scroll no conteúdo */
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
  background-color: #e8f5e9;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px; /* Mantém o formulário compacto */
  margin-left: 0; /* Remove centralização */
  margin-right: auto; /* Garante que fique alinhado à esquerda */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve */
  max-height: 80vh; /* Limitar altura para evitar overflow */
  overflow-y: auto; /* Scroll interno se necessário */
  -ms-overflow-style: none; /* Esconde a barra no IE/Edge */
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
</style>
