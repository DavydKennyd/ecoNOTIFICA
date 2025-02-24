<template>

  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
// Não precisa importar LoginForm aqui, o Vue Router cuida disso
export default {
  name: 'App',
};
</script>

<style>
/* Importação da fonte */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');

/* Aplicar a fonte globalmente */
body {
  font-family: 'Nunito', sans-serif;
}

/* Opcional: Aplicar a fonte em todos os elementos */
* {
  font-family: 'Nunito', sans-serif;
}
</style>