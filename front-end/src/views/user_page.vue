<template>
  <div id="perfil-page">
    <Lateral_sidebar /> 
    <div id="content">
      <h1>Bem-vindo ao perfil do usuário</h1>
      <!-- Conteúdo adicional -->
    </div>
  </div>
</template>

<script>
import Lateral_sidebar from "@/components/sidebar.vue";

export default {
  name: "userPerfil",
  components: {
    Lateral_sidebar,
  },
};
</script>

<style scoped>
#perfil-page {
  display: flex;
}

#content {
  margin-left: 250px;
  padding: 20px;
  flex: 1;
}
</style>
