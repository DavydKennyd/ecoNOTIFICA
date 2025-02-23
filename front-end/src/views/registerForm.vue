<template>
  <div id="app">
    <header class="header">
      <img :src="require('@/assets/logo_login.png')" alt="LOGO-ECONOTIFICA" class="logo">
    </header>
    <div class="overlay"></div>
    <div class="register-container">
      <div class="content">
        <form class="register-form" @submit.prevent="register">
          <h2>Cadastro</h2>
          <div class="form-group">
            <label for="username">Usuário:</label>
            <input v-model="username" type="text" id="username" placeholder="Seu nome de usuário" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" placeholder="exemplo@gmail.com" required />
          </div>
          <div class="form-group">
            <label for="password">Senha:</label>
            <input v-model="password" type="password" id="password" placeholder="******" required />
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirmação de senha:</label>
            <input v-model="confirmPassword" type="password" id="confirm-password" placeholder="******" required />
          </div>
          <router-link to="/login" class="login-link">
            Já tem cadastro? <span>Clique aqui</span>
          </router-link>
          <button type="submit" class="btn-register">CADASTRAR</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "cadastroForm",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }
      try {
        const response = await axios.post('http://localhost:5000/api/auth/cadastro', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        console.log(response.data); // Resposta de sucesso ou erro
        alert("Cadastro realizado com sucesso!");
        this.$router.push('/login'); // Redireciona para a tela de login
      } catch (error) {
        console.error(error);
        alert("Erro ao realizar cadastro. Tente novamente.");
      }
    },
  },
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.logo {
  max-width: 265px;
  height: auto;
  display: block;
  filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 1));
}

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/image_fundo.jpg') no-repeat center center;
  background-size: cover;
  font-family: Arial, sans-serif;
  color: #fff;
  width: 100%;
  height: 100vh;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.header {
  background: linear-gradient(to bottom, #1B3C29, #355E3B, #4CAF50);
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 2;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 2;
  margin-top: 100px; /* Adicionado para descer o formulário */
}

.register-form {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 350px;
  text-align: center;
}

.register-form h2 {
  margin-bottom: 20px;
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
  color: #ccc;
}

.form-group input {
  width: 330px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #fff;
}

.login-link {
  display: block;
  margin: 10px 0;
  font-size: 0.9rem;
  color: #ccc;
  text-align: center;
}

.login-link span {
  color: #06DB58;
  cursor: pointer;
}

.btn-register {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.btn-register:hover {
  background-color: #218838;
}
</style>