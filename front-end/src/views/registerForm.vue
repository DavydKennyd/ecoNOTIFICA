<template>
  <header class="header">
    <img :src="require('@/assets/logo_login.png')" alt="logo" class="logo">
  </header>
  <div id="app" class="register-container">
    <div class="overlay"></div>
    <div class="content">
      <form class="register-form" @submit.prevent="register">
        <h2>Cadastro</h2>
        <div class="form-group">
          <label for="username">Usuário:</label>
          <input v-model="username" type="text" id="username" placeholder="Seu nome de usuário" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" placeholder="exemplo@gmail.com" />
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input v-model="password" type="password" id="password" placeholder="******" />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirmação de senha:</label>
          <input v-model="confirmPassword" type="password" id="confirm-password" placeholder="******" />
        </div>
        <router-link to="/login" class="login-link">

        Já tem cadastro? <span>Click aqui</span>
      </router-link>
        <center><button type="submit" class="btn-register botao--">CADASTRAR</button></center>

          <!-- Já tem cadastro? <span>Clique aqui</span>
        </router-link>
        <button type="submit" class="btn-register">CADASTRAR</button> -->

      </form>
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
      } catch (error) {
        console.error(error);
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
  overflow-y: visible;
}

#app {
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
/* Estilo geral */
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: url('@/assets/image_fundo.jpg') no-repeat center center;
  background-size: cover;
  font-family: Arial, sans-serif;
  color: #fff;
  position: relative;
  width: 100%;
  height: 100vh;
  top: -4.5vh;
}

.logo {
  max-width: 265px;
  height: auto;
  margin: 0 auto;
  display: block;
  filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 1));
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

/* Header */
.header {
  background: linear-gradient(to bottom, #1B3C29, #355E3B, #4CAF50);
  width: 100%;
  height: 80px;
  padding: 10px;
  text-align: center;
  position: relative;
  top:0
}



.header h1 {
  margin: 0;
  font-size: 2.5rem;
  color: white;
}

/* Formulário */
.register-form {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 350px;
  z-index: 2;
  position: relative;
  margin-top: 65px;
  margin-left: 50px;
  display: flex;
}

.register-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
  width: 330px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
  color: #ccc;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #fff;
}

.login-link {
  display: block;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #ccc;
  text-align: center;
}

.login-link span {
  color: #06DB58;
  cursor: pointer;
}

/* .btn-register {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.btn-register:hover {
  background-color: #218838;
} */
</style>
