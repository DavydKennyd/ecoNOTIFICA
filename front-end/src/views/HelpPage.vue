<template>
  <div id="help-page">
    <div id="navbar">
      <img :src="require('@/assets/logo_login.png')" alt="LOGO" class="logo" />
      <h1 class="page-title">AJUDA</h1>
      <button class="btn-logout" @click="logout">Sair</button>
    </div>

    <div id="content-container">
      <Lateral_sidebar />
      <div id="content">
        <section class="help-content">
          <h2>Perguntas Frequentes</h2>
          <p>Encontre respostas para as dúvidas mais comuns abaixo. Se precisar de mais ajuda, entre em contato conosco.</p>
          <div class="faq">
            <div class="faq-item">
              <h3>Como posso alterar minha senha?</h3>
              <p>Para alterar sua senha, vá até a página de Perfil e insira sua nova senha no campo apropriado.</p>
            </div>
            <div class="faq-item">
              <h3>Onde posso encontrar meu endereço de e-mail?</h3>
              <p>Seu endereço de e-mail está disponível na página de Perfil.</p>
            </div>
            <div class="faq-item">
              <h3>Como posso entrar em contato com a equipe de suporte?</h3>
              <p>Para entrar em contato com a equipe de suporte, acesse a página de Contato e preencha o formulário.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Lateral_sidebar from "@/components/sidebar.vue";

export default {
  components: {
    Lateral_sidebar,
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@200..1000&display=swap');

body {
  font-family: "Nunito", sans-serif;
  margin: 0;
  padding: 0;
}

#help-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(231, 231, 231);
}

#navbar {
  height: 65px;
  background: linear-gradient(to bottom, #1B3C29, #355E3B, #4CAF50);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 24px;
  font-weight: bold;
}

.logo {
  width: 210px;
  height: auto;
}

#content-container {
  display: flex;
  flex: 1;
  overflow: hidden;
  background-color: #f5f5f5;
}

#content {
  margin-left: 0;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.help-content {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  text-align: center;
}

.help-content h2 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #1B3C29;
}

.help-content p {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.faq {
  text-align: left;
}

.faq-item {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.faq-item h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #1B3C29;
}

.faq-item p {
  font-size: 14px;
  color: #555;
}

.btn-logout {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-logout:hover {
  background-color: #d32f2f;
}
</style>