<template>
    <div class="about-page">
      <h1>Sobre</h1>
      <p>Esta é a página Sobre do nosso projeto. Aqui você pode encontrar informações sobre a nossa empresa, nossa missão e nossos valores.</p>
      <div class="team">
        <h2>Equipe</h2>
        <div class="team-member">
          <img src="team-member1.jpg" alt="Membro da Equipe 1" />
          <h3>John Doe</h3>
          <p>Desenvolvedor</p>
        </div>
        <div class="team-member">
          <img src="team-member2.jpg" alt="Membro da Equipe 2" />
          <h3>Jane Smith</h3>
          <p>Gerente de Projeto</p>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  .about-page {
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 5px;
  }
  .team {
    margin-top: 20px;
  }
  .team-member {
    display: inline-block;
    margin-right: 20px;
    text-align: center;
  }
  .team-member img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  </style>