<template>
  <div class="about-page">
    <!-- capa Section -->
    <section class="capa">
      <h1>SOBRE NÓS</h1>
      <p>Ajudamos as pessoas a ver dados de novas formas, descobrir insights e desbloquear possibilidades infinitas.</p>
    </section>

    <!-- About Section -->
    <section class="about-content">
      <h2>Sobre Nós</h2>
      <p>Bem-vindo à nossa empresa! Nosso objetivo é fornecer soluções inovadoras que fazem a diferença.</p>
    </section>

    <!-- Time Section -->
    <section class="Time">
      <h2>Nossa Equipe</h2>
      <div class="Time-container">
        <div class="Time-member" v-for="(member, index) in Time" :key="index">
          <img :src="member.image" :alt="member.name" />
          <h3>{{ member.name }}</h3>
          <p>{{ member.role }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Time: [
        { name: "John Doe", role: "Desenvolvedor", image: "Time-member1.jpg" },
        { name: "Jane Smith", role: "Gerente de Projeto", image: "Time-member2.jpg" },
      ],
    };
  },
};
</script>

<style scoped>
.about-page {
  background: #f4f4f4;
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
  padding: 20px;
}

/* Capa Section */
.capa {
  background: #1F7F15;
  color: white;
  padding: 40px 20px;
  border-radius: 5px;
}

.capa h1 {
  margin-bottom: 10px;
}
.capa p {
  font-size: 1.1rem;
}

/* About sessão */
.about-content {
  margin: 30px 0;
}

/* sessão do time */
.Time-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}
.Time-member {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
}
.Time-member img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}
</style>
