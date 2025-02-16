<template>
    <div class="contact-page">
      <h1>Contato</h1>
      <form>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="name" />
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="email" />
        <label for="message">Mensagem:</label>
        <textarea id="message" v-model="message"></textarea>
        <button @click.prevent="sendMessage">Enviar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        message: ''
      }
    },
    methods: {
      sendMessage() {
        // Lógica para enviar a mensagem
        console.log('Nome:', this.name)
        console.log('E-mail:', this.email)
        console.log('Mensagem:', this.message)
      }
    }
  }
  </script>
  
  <style>
  .contact-page {
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 5px;
  }
  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
  input, textarea {
    margin-bottom: 10px;
    padding: 5px;
  }
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>