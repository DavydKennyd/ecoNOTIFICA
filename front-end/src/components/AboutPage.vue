<template>
    <div class="container">
      <!-- Botão de voltar -->
      <button class="back-button" @click="goBack">Voltar</button>
  
      <!-- Conteúdo principal -->
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutPage',
    data() {
      return {
        title: 'Sobre Nós',
        description: 'BLA BLA BLA BLA BLA BLA BLA BLA BLA'
      }
    },
    methods: {
      goBack() {
        //Faz o navegador voltar para a página anterior//
        window.history.back()
      }
    }
  }
  </script>
  
  <style scoped>
  
  
  body {
    
    background-color: #dff6d5;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
  
  .container {
    position: relative;
    text-align: center;
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    
    width: 100%;
    max-width: 800px;
    margin: 40px auto;
  }
  
  .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #1F7F15;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .back-button:hover {
    background-color: #45a049;
  }
  
  h1 {
    color: #333;
  }
  
  p {
    color: #555;
  }
  </style>
  