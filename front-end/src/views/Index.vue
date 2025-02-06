<template>



    <div class="conteine">

        <img :src="require('@/assets/mundo do Index.jpg')" alt="imagem de fundo" class="imagem_de_fundo">

        <div class="DeCima inria">
            <center>
                <h1>ECONOTIFICA</h1>
            </center>

        </div>

        <!--falta fazer o resto do index-->


    </div>

    <Cabecalho />

</template>

<style>
body {
    /* overflow-x: hidden; */
    overflow: hidden;
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
    height: 100vh;
    z-index: 0;
    background: rgb(0, 0, 0);
    background: linear-gradient(166deg, rgba(0, 0, 0, 0.44) 0%, rgba(0, 0, 0, 1) 62%);
}

h1 {
    color: white;
    padding-top: 40vh;
    font-size: 5.5vw;


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