<template>


    <section>
      <div class="funds">
        <img :src="require('@/assets/simbolo da reciclagem.png')" alt="fundo" class="img">
      </div>
      <div class="overlay"></div>
    </section>
  
  
    <header class="header">
      <img :src="require('@/assets/setima_logo.png')" alt="LOGO-ECONOTIFICA" class="logo">
    </header>
  
  
  
    <div id="app" class="login-container">
  
      <div class="content">
        <img :src="require('@/assets/image_planet.png')" alt="Earth" class="globe-img" />
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
          console.log(response.data); // Token de sucesso ou erro
        } catch (error) {
          console.error(error);
        }
      },
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
  }
  
  #app {
    width: 100%;
    height: 100%;
  }
  </style>
  
  <style scoped>
  .logo {
    max-width: 300px;
    height: auto;
    margin: 0 auto;
    display: block;
    filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.8));
  }
  
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    /* background: url('@/assets/simbolo da reciclagem.png') no-repeat center center;
    background-size: 100% auto;
    background-position: center;
    font-family: Arial, sans-serif; */
    color: #fff;
    position: relative;
    width: 100%;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 1) 90%);
    z-index: 0;
  }
  
  .funds .img {
    width: 100vw;
  
  }
  
  .funds {
    position: absolute;
    z-index: -1;
  
  }
  
  .header {
     background: linear-gradient(180deg, #00d15069, #00180946, #00000010); 
    width: 100%;
    padding: 20px 0;
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
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 30px;
    margin-top: 40px;
    margin-right: 90px;
    z-index: 1;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0);
    }
  
    50% {
      transform: translateY(-10px);
    }
  
    100% {
      transform: translateY(0);
    }
  }
  
  .header h1 {
    margin: 0;
    font-size: 2.5rem;
    color: white;
  }
  
  /* Conteúdo */
  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 30px;
    margin-top: 40px;
    margin-right: 90px;
    z-index: 1;
  }
  
  /*ANIMAÇÃO DA IMAGEM DA TERRA*/
  @keyframes float {
    0% {
      transform: translateY(0);
    }
  
    50% {
      transform: translateY(-10px);
    }
  
    100% {
      transform: translateY(0);
    }
  }
  
  
  /* Globo */
  
  .globe img {
    border-radius: 50%;
    width: 500px;
    height: 500px;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    animation: float 5s ease-in-out infinite;
  }
  
  .globe-img {
    border-radius: 50%;
    width: 500px;
    height: 500px;
    object-fit: cover;
    animation: float 5s ease-in-out infinite;
  }
  
  .login-form {
    background-color: rgba(0, 0, 0, 0.6);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    width: 300px;
    z-index: 1;
  }
  
  .login-form h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
    font-size: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 15px;
    width: 285px;
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
  