<template>
    <div id="perfil-page">
      <div id="navbar">
        <img :src="require('@/assets/logo_login.png')" alt="LOGO" class="logo" />
      </div>
      <div id="content-container">
        <Lateral_sidebar />
        <div id="content">
          <div class="header">
            <h1>Perfil</h1>
          </div>
          <div class="container-wrapper">
            <div class="container">
              <div class="user-info">
                <p><strong>Nome:</strong> Artur Killdragon</p>
                <p><strong>E-mail:</strong> artur@mail.com</p>
              </div>
              <div class="password-section">
                <h2>Alterar Senha</h2>
                <form>
                  <label for="current-password">Senha Atual:</label>
                  <input type="password" id="current-password" name="current-password" required>
                  <label for="new-password">Nova Senha:</label>
                  <input type="password" id="new-password" name="new-password" required>
                  <label for="confirm-password">Confirmar Nova Senha:</label>
                  <input type="password" id="confirm-password" name="confirm-password" required>
                  <button type="submit">Atualizar Senha</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Lateral_sidebar from "@/components/sidebar.vue";
  
  export default {
    name: 'UserProfile',
    components: {
      Lateral_sidebar,
    },
  }
  </script>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
  
    body {
      font-family: "Nunito", sans-serif;
      margin: 0;
      padding: 0;
    }
  
    #perfil-page {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
      background-color: rgb(231, 231, 231);
    }
  
    .logo {
      position: absolute;
      top: 12px;
      left: 5px;
      width: 210px;
      height: auto;
      z-index: 10;
      filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.7));
    }
  
    #navbar {
      height: 65px;
      background: linear-gradient(to bottom, #1B3C29, #355E3B, #4CAF50);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
      font-weight: bold;
    }
  
    #content-container {
      display: flex;
      flex: 1;
      overflow: hidden;
      position: relative;
    }
  
    #content {
      margin-left: 100px;
      padding: 20px 20px 40px; /* Adicionado padding inferior */
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
  
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
  
    .container-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 20px; /* Adicionado margem superior */
    }
  
    .container {
      max-width: 600px;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      min-height: 300px;
      padding: 15px;
    }
  
    .user-info {
      margin-bottom: 15px;
    }
  
    .password-section {
      border-top: 1px solid #ccc;
      padding-top: 15px;
    }
  
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10px;
    }
  
    button {
      grid-column: 1 / 3;
      justify-self: end;
      background-color: #4caf50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #45a049;
    }
  </style>