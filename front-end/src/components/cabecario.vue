<template>


    <ul>
        <div>
            <li><img :src="require('@/assets/simbolo.png')" alt="icone" class="icone"></li>
        </div>
        <div class="div2">
            <li><router-link :to="rota1">
                    <p class="botao--">{{nome1}}</p>
                </router-link></li>
            <li><router-link :to="rota2">
                    <p class="botao--">{{nome2}}</p>
                </router-link></li>
        </div>
    </ul>



</template>

<style>
.icone {
    width: 3vw;  
    height: auto; 
}

.div2 {
    display: flex;
}

ul {
    justify-content: space-between;
    display: flex;
    padding: 1vw;

}

li {
    padding: 1.5%;
}
</style>



<script>
export default {
    name: "Cabecario_head",
    props: {
        nome1: {
            type: String,
            default: "PESQUISAR",
        },
        rota1: {
            type: String,
            default: "/perfil",
        },
        nome2: {
            type: String,
            default: "ENTRAR", 
        },
        rota2: {
            type: String,
            default: "/login", 
        },
    },
};
</script>