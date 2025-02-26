<template>
  <div id="contact-page">
    <div id="navbar">
      <img :src="require('@/assets/logo_login.png')" alt="LOGO" class="logo" />
      <h1 class="page-title">CONTATO</h1>
    </div>
    <button class="btn-logout" @click="logout">Sair</button>

    <div id="content-container">
      <Lateral_sidebar />
      <div id="content">
        <section class="contact-form">
          <h2>Entre em Contato</h2>
          <p>Tem alguma dúvida ou sugestão? Preencha o formulário abaixo e entraremos em contato!</p>
          <form @submit.prevent="sendMessage">
            <div class="form-group">
              <label for="name">Nome:</label>
              <input type="text" id="name" v-model="name" placeholder="Digite seu nome" required />
            </div>
            <div class="form-group">
              <label for="email">E-mail:</label>
              <input type="email" id="email" v-model="email" placeholder="Digite seu e-mail" required />
            </div>
            <div class="form-group">
              <label for="message">Mensagem:</label>
              <textarea id="message" v-model="message" placeholder="Digite sua mensagem" required></textarea>
            </div>
            <button type="submit">Enviar Mensagem</button>
          </form>
          <p v-if="mensagemSucesso" class="mensagem-sucesso">{{ mensagemSucesso }}</p>
          <p v-if="mensagemErro" class="mensagem-erro">{{ mensagemErro }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Lateral_sidebar from "@/components/sidebar.vue";
import axios from 'axios';

export default {
  components: {
    Lateral_sidebar,
  },
  data() {
    return {
      name: '',
      email: '',
      message: '',
      mensagemSucesso: '', // Mensagem de sucesso
      mensagemErro: '', // Mensagem de erro
    };
  },
  methods: {
    async sendMessage() {
      // Limpa as mensagens anteriores
      this.mensagemSucesso = '';
      this.mensagemErro = '';

      try {
        // Endpoint do Formspree (substitua pelo seu endpoint)
        const endpoint = 'https://formspree.io/f/mgvojqyw';

        // Envia os dados do formulário para o Formspree
        const response = await axios.post(endpoint, {
          name: this.name,
          email: this.email,
          message: this.message,
        });

        // Verifica se o envio foi bem-sucedido
        if (response.status === 200) {
          this.mensagemSucesso = 'Mensagem enviada com sucesso!';
          this.name = '';
          this.email = '';
          this.message = '';
        } else {
          this.mensagemErro = 'Erro ao enviar a mensagem. Tente novamente.';
        }
      } catch (error) {
        this.mensagemErro = 'Erro ao enviar a mensagem. Tente novamente.';
      }
    },
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

#contact-page {
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

.contact-form {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.contact-form h2 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #1B3C29;
}

.contact-form p {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #4CAF50;
  outline: none;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

button[type="submit"] {
  background: linear-gradient(135deg, #1F7F15, #4CAF50);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button[type="submit"]:hover {
  background: linear-gradient(135deg, #4CAF50, #1F7F15);
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

.btn-logout:hover {
  background-color: #d32f2f;
}

.mensagem-sucesso {
  color: #4CAF50;
  margin-top: 10px;
}

.mensagem-erro {
  color: #f44336;
  margin-top: 10px;
}
</style>