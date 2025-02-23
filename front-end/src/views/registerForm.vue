<template>
  <div id="app">
    <header class="header">
      <img :src="require('@/assets/logo_login.png')" alt="LOGO-ECONOTIFICA" class="logo">
    </header>
    <div class="overlay"></div>
    <div class="register-container">
      
      <div v-if="!isLoading" class="content">
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

        
        <div v-if="showSuccessMessage" class="success-message">
          <i class="fas fa-check-circle"></i>
          <p>Cadastro realizado com sucesso!</p>
        </div>

        
        <div v-if="showErrorMessage" class="error-message">
          <i class="fas fa-times-circle"></i>
          <p>{{ errorMessage }}</p>
        </div>
      </div>

      
      <div v-if="isLoading" class="loading-spinner">
        <div class="spinner"></div>
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
      showSuccessMessage: false, 
      showErrorMessage: false,  
      errorMessage: '',         
      isLoading: false,        
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.showErrorMessage = true;
        this.errorMessage = "As senhas não coincidem.";
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000); 
        return;
      }
      try {
        const response = await axios.post('http://localhost:5000/api/auth/cadastro', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        console.log(response.data); 

        
        this.showSuccessMessage = true;

        
        setTimeout(() => {
          this.showSuccessMessage = false; 
          this.isLoading = true; 
        }, 2000);

        
        setTimeout(() => {
          this.$router.push('/login');
        }, 3000);
      } catch (error) {
        console.error(error);
        this.showErrorMessage = true;
        this.errorMessage = error.response?.data?.message || "Erro ao realizar cadastro. Tente novamente.";
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000); 
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
  margin-top: 100px;
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


.success-message {
  position: fixed;
  top: 85px; 
  right: 20px; 
  background-color: rgba(45, 170, 13, 0.8);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  z-index: 1000;
  animation: fadeInScale 0.5s ease-in-out forwards;
}

.success-message i {
  font-size: 48px;
  color: #4CAF50;
  margin-bottom: 10px;
  animation: pulse 1.5s infinite ease-in-out;
}

.success-message p {
  font-size: 18px;
  margin: 0;
}


.error-message {
  position: fixed;
  top: 85px; 
  right: 20px; 
  background-color: rgba(255, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  z-index: 1000;
  animation: fadeInScale 0.5s ease-in-out forwards;
}

.error-message i {
  font-size: 48px;
  color: #fff;
  margin-bottom: 10px;
  animation: pulse 1.5s infinite ease-in-out;
}

.error-message p {
  font-size: 18px;
  margin: 0;
}


.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4CAF50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}
</style>