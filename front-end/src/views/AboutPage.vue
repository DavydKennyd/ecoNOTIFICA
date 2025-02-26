<template>
  <div id="about-page">
    <div id="navbar">
      <img :src="require('@/assets/logo_login.png')" alt="LOGO" class="logo" />
      <h1 class="page-title">SOBRE NÓS</h1>
    </div>
    <button class="btn-logout" @click="logout">Sair</button>
    
    <div id="content-container">
      <Lateral_sidebar />
      <div id="content">
        <!-- Capa Section -->
        <section class="capa">
          <p>Ajudamos as pessoas a ver dados de novas formas, descobrir insights e desbloquear possibilidades infinitas.</p>
        </section>

        <!-- About Section -->
        <section class="about-content">
          <h2>Sobre Nós</h2>
          <p>Bem-vindo à nossa empresa! Nosso objetivo é fornecer soluções inovadoras que fazem a diferença.</p>
        </section>

        <!-- Time Section -->
        <section class="time">
          <h2>Nossa Equipe</h2>
          <div class="time-container">
            <div class="time-member" v-for="(member, index) in Time" :key="index">
              <img :src="member.image" :alt="member.name" />
              <h3>{{ member.name }}</h3>
              <p>{{ member.role }}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Lateral_sidebar from "@/components/sidebar.vue";

export default {
  components: {
    Lateral_sidebar,
  },
  data() {
    return {
      Time: [
        { name: "Davyd Kennyd", role: "Desenvolvedor Full-Stack", image: "/images/davyd.jpeg" },
        { name: "Vivian Raquel", role: "Gerente de Projeto e Desenvolvedora Front-end", image: "/images/vivian.jpeg" },
        { name: "Welson Rodrigues", role: "Desenvolvedor Back-end", image: "/images/welson.jpeg" },
        { name: "Jainy Eduarda", role: "Desenvolvedora Front-end e Designer ", image: "/images/jaminy.jpg" },
      ],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@200..1000&display=swap');

body {
  font-family: "Nunito", sans-serif;
  margin: 0;
  padding: 0;
}

#about-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(231, 231, 231);
}

#navbar {
  height: 65px;
  background: linear-gradient(to bottom, #1B3C29, #355E3B, #4CAF50);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 24px;
  font-weight: bold;
}

.logo {
  width: 210px;
  height: auto;
}

#content-container {
  display: flex;
  flex: 1;
  overflow: hidden;
  background-color: #f5f5f5;
}

#content {
  margin-left: 0;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.capa {
  background: linear-gradient(135deg, #1F7F15, #4CAF50);
  color: white;
  padding: 40px 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.about-content {
  margin: 30px 0;
  text-align: center;
  max-width: 800px;
}

.about-content h2 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #1B3C29;
}

.about-content p {
  font-size: 18px;
  color: #555;
}

.time-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.time-member {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 200px;
}

.time-member:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.time-member img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.time-member h3 {
  font-size: 18px;
  margin: 10px 0;
  color: #1B3C29;
}

.time-member p {
  font-size: 14px;
  color: #777;
}

.btn-logout {
  position: fixed;
  top: 75px; /* Logo abaixo do navbar */
  right: 20px;
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 9999;
}

.btn-logout:hover {
  background-color: #d32f2f;
}
</style>