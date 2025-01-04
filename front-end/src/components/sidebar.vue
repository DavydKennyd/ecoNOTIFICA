<template>
  <div id="sidebar">
    <h1 class="logo">ECONOTIFICA</h1>
    <nav>
      <ul>
        <li><a href="#perfil">Perfil</a></li>
        <li><a href="#sobre">Sobre</a></li>
        <li><a href="#contato">Contato</a></li>
        <li><a href="#ajuda">Ajuda</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Lateral_sidebar",
};
</script>

<style scoped>
#sidebar {
  width: 250px;
  height: 100vh;
  background-color: #4caf50; /* Cor verde */
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.logo {
  font-size: 24px;
  margin-bottom: 20px;
  text-transform: uppercase;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  margin: 15px 0;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

nav a:hover {
  text-decoration: underline;
}
</style>
