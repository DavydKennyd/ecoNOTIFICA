<template>
  <div id="app">
    <header class="header">
      <img :src="require('@/assets/logo_login.png')" alt="LOGO-ECONOTIFICA" class="logo">
    </header>
    <div class="overlay"></div>
    <div class="login-container">
      <div class="content">
        <form @submit.prevent="login" class="login-form">
          <h2>Login</h2>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="email" id="email" placeholder="exemplo@gmail.com" required />
            <p v-if="erroEmail" class="erro-mensagem">{{ erroEmail }}</p>
          </div>
          <div class="form-group">
            <label for="password">Senha:</label>
            <input type="password" v-model="password" id="password" placeholder="******" required />
            <p v-if="erroSenha" class="erro-mensagem">{{ erroSenha }}</p>
          </div>
          <a href="#" class="forgot-password">Esqueceu a senha?</a>
          <button type="submit" class="btn-login">ENTRAR</button>
          <!-- Link para cadastro -->
          <router-link to="/cadastro" class="register-link">
            Não tem cadastro? <span>Clique aqui</span>
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginForm",
  data() {
    return {
      email: '',
      password: '',
      erroEmail: '', // Mensagem de erro para e-mail
      erroSenha: '', // Mensagem de erro para senha
    };
  },
  methods: {
    async login() {
      // Limpa as mensagens de erro antes de tentar o login
      this.erroEmail = '';
      this.erroSenha = '';

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
        if (error.response) {
          const { data } = error.response; // Removida a variável 'status', pois não está sendo usada

          // Verifica a mensagem de erro retornada pela API
          if (data.error === "Senha incorreta") {
            this.erroSenha = "Senha incorreta. Tente novamente.";
          } else if (data.error === "E-mail não cadastrado") {
            this.erroEmail = "E-mail não cadastrado. Verifique ou crie uma conta.";
          } else {
            // Outros erros genéricos
            this.erroEmail = "Erro ao realizar login. Tente novamente.";
          }
        } else {
          // Erro de conexão ou outros problemas
          this.erroEmail = "Erro de conexão. Verifique sua internet e tente novamente.";
        }
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
  display: block;
  filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 1));
}

.login-container {
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
}

.login-form {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 350px;
  text-align: center;
}

.login-form h2 {
  margin-bottom: 20px;
  color: #fff;
  font-size: 1.5rem;
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

.erro-mensagem {
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 5px;
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

.btn-login {
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

.btn-login:hover {
  background-color: #218838;
}

/* Estilo do link de cadastro */
.register-link {
  display: block;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #ccc;
  text-align: center;
  text-decoration: none;
}

.register-link span {
  color: #06DB58;
  cursor: pointer;
}

.register-link:hover span {
  text-decoration: underline;
}
</style>