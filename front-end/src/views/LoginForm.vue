<template>

  
  <header class="header">
    <img :src="require('@/assets/logo_login.png')" alt="LOGO-ECONOTIFICA" class="logo">
  </header>
  <div class="overlay"></div>
  <div id="app" class="login-container">

    <div class="content">
      <form @submit.prevent="login" class="login-form">
        <h2>Login</h2>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" placeholder="exemplo@gmail.com" required />
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" v-model="password" id="password" placeholder="******" required />
        </div>
        <a href="#" class="forgot-password">Esqueceu a senha?</a>
        <center><button type="submit" class="btn-login botao--">ENTRAR</button></center>
      </form>
    </div>
  </div>
</template>




/*Exportação*/

<script>
import axios from 'axios';

export default {
  name: "LoginForm",
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        const { token, user } = response.data;

        // Armazenar o token e o nome de usuário no localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', user.username);

        // Redirecionar para a página de perfil
        this.$router.push('/perfil');
      } catch (error) {
        console.error(error.response?.data?.message || 'Erro ao realizar login');
      }
    }
  },

};
</script>

<style>
html,
body {
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
  margin: 0 auto;
  display: block;
  filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 1));
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: url('@/assets/image_fundo.jpg') no-repeat center center;
  background-size: cover;
  background-position: center;
  font-family: Arial, sans-serif;
  color: #fff;
  position: relative;
  top: -4.5vh;
  width: 100vh;
  height: 100vh;
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
  height: 50px;
  padding: 15px;
  text-align: center;
  position: relative;
  top: 0;
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
  color: white;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
  margin-right: 90px;
  z-index: 1;
}


/* .header h1 {
    margin: 0;
    font-size: 2.5rem;
    color: white;
  } */

/* Conteúdo */
/* .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 30px;
    margin-top: 40px;
    margin-right: 90px;
    z-index: 1;
  } */

.login-form {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 350px;
  z-index: 2;
  position: relative;
  margin-top: 65px;
  margin-left: 130px;
  display: flex;
}


.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  font-size: 1.5rem;
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

.forgot-password {
  display: block;
  margin: 10px 0;
  text-align: right;
  font-size: 0.9rem;
  color: #ccc;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

/* Botão */
/* .btn-login {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-login:hover {
    background-color: #218838;
  } */
</style>
