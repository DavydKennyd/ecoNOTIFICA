<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <div id="sidebar">
    <nav class="sidebar">
      <div class="btn-expandir">
        <i class="bi bi-list"></i>
      </div><!--btn-expandir-->
      <ul>
        <li class="item-perfil">
          <a href="/perfil">
            <span class="icon"><i class="bi bi-person-square"></i></span>
            <span class="txt-link">Perfil</span>
          </a>
        </li>

        <!-- Novo botão "Feed" -->
        <li class="item-perfil">
          <a href="/feed">
            <span class="icon"><i class="bi bi-house-door"></i></span>
            <span class="txt-link">Feed</span>
          </a>
        </li>

        <li class="item-perfil">
          <a href="/sobre">
            <span class="icon"><i class="bi bi-exclamation-circle"></i></span>
            <span class="txt-link">Sobre</span>
          </a>
        </li> 
        
        <li class="item-perfil">
          <a href="/contato">
            <span class="icon"><i class="bi bi-telephone"></i></span>
            <span class="txt-link">Contato</span>
          </a>
        </li>

        <li class="item-perfil">
          <a href="/ajuda">
            <span class="icon"><i class="bi bi-question-circle-fill"></i></span>
            <span class="txt-link">Ajuda</span>
          </a>
        </li> 
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
  width: 40px;
  height: 100%;
  background-color: #1F7F15; /* Cor verde */
  color: white;
  display: flex;
  flex-direction: column;
  padding: 40px 0 40px 1%;
  overflow: hidden;
}

#sidebar:hover {
  width: 200px;
}

.btn-expandir {
  width: 100%;
  padding-left: 1px; 
}

.btn-expandir > i {
  color: white;
  font-size: 20px;
  cursor: pointer;
}

ul {
  height: 100%;
  list-style-type: none;
}

ul li.item-perfil a {
  font-size: 22px;
  padding: 20px 4%;
  display: flex;
}

ul li.item-perfil {
  transition: 0.3s;
}

ul li.item-perfil:hover {
  background-color: lightgreen;
}

ul li.item-perfil a .txt-link {
  margin-left: 20px;
}

ul li.item-perfil a .icon > i {
  font-size: 20px;
}

.logo {
  font-size: 24px;
  margin-bottom: 20px;
  text-transform: uppercase;
}

nav ul {
  list-style: none;
  padding: 0;
  display: block;
}

nav li {
  margin: 15px 0;
  display: block;
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