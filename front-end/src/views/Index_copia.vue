<template>


    <Cabecalho />

    <section class="carrosel">

        <img :src="troca.img" alt="imagem de fundo" class="imagem_de_fundo">

        <div class="texto">
            <h1>{{ troca.h1 }}</h1>
            <h3>{{ troca.h3 }}</h3>
        </div>

        <div class="funds">
            <p class="botao">Recicle</p>
        </div>

    </section>
    




    <section class="rs">

        <div class="R">
            <p class="title">REPENÇAR</p>
            <p class="descricao">Oque eu posso fazer para ajudar?</p>
        </div>

        <div class="R">
            <p class="title">RECUSAR</p>
            <p class="descricao">É necessario comprar tudo o que compro? Tudo o que compramos gera residuos</p>
        </div>

        <div class="R">
            <p class="title">REDUZIR</p>
            <p class="descricao">Eu realmente precisso isso?</p>
        </div>

        <div class="R">
            <p class="title">REUTILIZAR</p>
            <p class="descricao">Essa garrafa precisa ir pro lixo? sera que eu não posso usar para algo?</p>
        </div>

        <div class="R">
            <p class="title">RECICLAR</p>
            <p class="descricao">Entre na EcoNotífica e vem reciclar</p>
        </div>


    </section>


    <section class="contabilização">

        <div>
            <p>Peixes salvos</p>
            <p></p>
        </div>
        <div>
            <p>Pessoas Reciclaram</p>
            <p></p>
        </div>
        <div>
            <p>Gases não Liberados</p>
            <p></p>
        </div>

    </section>

    <section class="mapa">


    </section>

</template>

<style>
.carrosel {

    /* margin-top: 1.5vw; */
    color: rgb(255, 255, 255);

}

.imagem_de_fundo {
    position: absolute;
    z-index: -2;
    width: 80vw;
    height: 40vw;
    margin: 0 10vw;
    border-radius: 20px;
}

h1 {
    margin: 0;
    width: 20vw;
    font-size: 30px;
}

.texto {
    position: absolute;
    z-index: 1;
    margin: 10vw 15vw;
    background-color: rgba(0, 0, 0, 0.568);
    border-radius: 20px;
    padding: 1vw;

}

.funds {
    padding-top: 50vw;

}








.rs {
    display: flex;
    justify-content: space-between;
    background-color: rgb(255, 115, 0);

}

.R {

    padding: 1vw;
    margin: calc(10vw/ 5);
    margin-top: 5vw;
    width: calc(60vw / 5);
    border: 2px var(--colorOrigin) solid;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.308);
}
.title{
    padding-bottom: 10px;
}






.contabilização{
    margin: 5vw;
    display: flex;
    justify-content: space-between;
}

.contabilização div{
    padding: 1vw;
    background-color: var(--colorOrigin);
    
}


</style>


<script>
import Cabecalho from "@/components/cabecario.vue";

export default {
    name: "index_eco",
    components: {
        Cabecalho,
    },
    data() {
        return {
            obj: [
                { img: require("@/assets/arvores.jpg"), h1: "A Natureza É Casa", h3: "E nos concede tudo" },
                { img: require("@/assets/polo norte.jpg"), h1: "As Geleiras Derretem", h3: "E os animais sofrem por SUA culpa" },
                { img: require("@/assets/tartaruga e lixo.jpg"), h1: "Até 2050", h3: "Terá mais plásticos que peixes no mar" },
                { img: require("@/assets/lixo e animais.jpg"), h1: "Muitos Animais", h3: "Perderam sua casa para o lixo" },
                { img: require("@/assets/industria.jpg"), h1: "Cuide Como Puder", h3: "Porque esse é o nosso único lar" },
            ],

            vi: 0,

        }
    },
    computed: {
        troca() {

            return this.obj[this.vi];
        },
    },
    methods: {
        carrossel() {
            this.vi = (this.vi + 1) % this.obj.length;
            console.log("passei por aqui")
            //   if (this.vi < this.obj.length - 1) {
            //     this.vi = this.vi + 1;
            // } else {
            //     this.vi = 0
            // }
        },
    },
    mounted() {
        setInterval(this.carrossel, 4000);
    },
};

</script>