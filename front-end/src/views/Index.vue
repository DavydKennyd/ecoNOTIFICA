<template>



    <section class="conteine">

        <img :src="require('@/assets/mundo do Index.jpg')" alt="imagem de fundo" class="imagem_de_fundo">

        <div class="DeCima inria">
            <center>
                <h1>ECONOTIFICA</h1>

            </center>

        </div>


    </section>


    <Cabecalho />

    <section class="rsIni">

  <hr style="  width: 100vw; color: var(--colorBanco); height: 5px; margin-left: -10px;">
        <div class="rs">
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
body {
    overflow-x: hidden;
    background: rgb(0, 0, 0);
}

.imagem_de_fundo {
    width: 100vw;
}

.conteine {
    margin-top: 0;

    position: absolute;
    z-index: -2;

}

.DeCima {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 120vh;
    z-index: 0;
    background: rgb(0, 0, 0);
    background: linear-gradient(166deg, rgba(0, 0, 0, 0.44) 0%, rgba(0, 0, 0, 1) 62%);
}

h1 {
    color: white;
    padding-top: 40vh;
    font-size: 5.5vw;
}





.rsIni{
    margin-top: 100vh;
    color: white;
}

.rs {
    display: flex;
    justify-content: space-between;
}

.R {

    padding: 1vw;
    margin: calc(10vw/ 5);
    margin-top: 5vw;
    width: calc(60vw / 5);
    border: 2px white solid;
    border-radius: 20px;
    /* background-color: rgba(255, 255, 255, 0.308); */
}

.title {
    padding-bottom: 10px;
}






.contabilização {
    margin: 5vw;
    display: flex;
    justify-content: space-between;
}

.contabilização div {
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
};
</script>