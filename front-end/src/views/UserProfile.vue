<template>
    <div class="user-profile">
      <h1>Perfil</h1>
      <div class="user-info">
        <p><strong>Nome Completo:</strong> {{ fullName }}</p>
        <p><strong>E-mail:</strong> {{ email }}</p>
        <div class="change-password">
          <label for="password">Alterar Senha:</label>
          <input type="password" id="password" v-model="newPassword" />
          <button @click="updatePassword">Salvar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        newPassword: ''
      }
    },
    methods: {
      updatePassword() {
        // Lógica para atualizar a senha do usuário
        console.log('Senha atualizada:', this.newPassword)
      }
    }
  }
  </script>
  
  <style>
  .user-profile {
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 5px;
  }
  .user-info {
    margin-top: 20px;
  }
  .change-password {
    margin-top: 20px;
  }
  </style>