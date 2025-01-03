<template>
  <header class="header">
    <h1>ECONOTIFICA</h1>
  </header>
  <div id="app" class="register-container">
    <div class="overlay"></div>
    <div class="content">
      <form class="register-form">
        <h2>Cadastro</h2>
        <div class="form-group">
          <label for="username">Usuário:</label>
          <input type="text" id="username" placeholder="Seu nome de usuário" />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" placeholder="exemple@gmail.com" />
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" placeholder="******" />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirmação de senha:</label>
          <input type="password" id="confirm-password" placeholder="******" />
        </div>
        <router-link to="/login" class="login-link">
        Já tem cadastro? <span>Click aqui</span>
      </router-link>
        <button type="submit" class="btn-register">CADASTRAR</button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  name: "cadastroForm",
};
</script>



<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  
}

#app {
  width: 100%;
  height: 100%;
}
</style>



<style scoped>
/* Estilo geral */
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: url('@/assets/image_fundo.jpg') no-repeat center center;
  background-size: cover;
  font-family: Arial, sans-serif;
  color: #fff;
  position: relative;
  width: 100%;
  height: 100vh;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1; 
}

/* Header */
.header {
  background: linear-gradient(to bottom, #016126, #06DB58, #03e75b);
  width: 100%;
  padding: 20px 0;
  text-align: center;
  position: relative;
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
  color: white;
}

/* Formulário */
.register-form {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  width: 350px;
  z-index: 2;
  position: relative;
  margin-top: 40px;
}

.register-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
  width: 330px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 1rem;
  color: #ccc;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #fff;
}

.login-link {
  display: block;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #ccc;
  text-align: center;
}

.login-link span {
  color: #06DB58;
  cursor: pointer;
}

.btn-register {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.btn-register:hover {
  background-color: #218838;
}
</style>

