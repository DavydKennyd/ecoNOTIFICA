<template>



    <section class="conteine">

        <img :src="require('@/assets/image_fundo.jpg')" alt="imagem de fundo" class="imagem_de_fundo">

        <div class="DeCima inria">
            <center>
                <h1>ECONOTIFICA</h1>

            </center>

        </div>


    </section>


    <Cabecalho />

    <section class="rsIni">

        <hr class="divisoria">
        <div class="rs">
            <div class="R">
                <p class="title">REPENÇAR</p>
                <p class="descricao">O que eu posso fazer para ajudar?</p>
            </div>

            <div class="R">
                <p class="title">RECUSAR</p>
                <p class="descricao">É necessário comprar tudo o que compro? Tudo o que compramos gera resíduos</p>
            </div>

            <div class="R">
                <p class="title">REDUZIR</p>
                <p class="descricao">Eu realmente precisso disso?</p>
            </div>

            <div class="R">
                <p class="title">REUTILIZAR</p>
                <p class="descricao">Essa garrafa precisa ir para o lixo? Sára que eu não posso usar para algo?</p>
            </div>

            <div class="R">
                <p class="title">RECICLAR</p>
                <p class="descricao">Entre no EcoNotifica e vem reciclar!</p>
            </div>
        </div>



    </section>

    <!-- 
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

    </section> -->

    <section class="mapa">



    </section>

    <footer>

        <center>
            <ul class="footer_ul">
                <li class="footer_ul_li">
                    <a href=""><font-awesome-icon :icon="['fab', 'whatsapp']" class="ico" /></a>
                </li>
                <li class="footer_ul_li">
                    <a href=""><font-awesome-icon :icon="['fab', 'instagram']" class="ico" /></a>
                </li>

            </ul>
            <p class="developer">Made by developer the IFRN</p>
            <ul style="display: flex;">
                <li><a href="https://raque-lvi.github.io/Curriculo_onlin/">
                        <p id="footer_i" style="font-size: 20px;"> Web </p>
                    </a></li>
                <li> <a href="https://github.com/Raque-lVi"><i id="footer_i" class="fa-brands fa-github"></i></a></li>
            </ul>

        </center>

    </footer>



</template>

<style>

footer {

    background-color: rgb(0, 46, 15);
}

.ico{
    font-size: 1.5vw;
}
footer ul{
    display: flex;
    right: 0;
    width: 5%;
}
/* .footer_ul {
    display: flex;
    padding-top: 2%;

} */

/* footer ul {
    margin-right: 45%;
    margin-left: 45%;

}

footer ul li {
    margin: 10%;

}

#footer_i {

    font-size: 30px;
    color: var(--cor_basic);
}

#footer_i:hover {

    font-size: 30px;
    color: green;

}

.developer {
    padding-top: 2%;
}

.developer:hover {
    color: var(--cor_principal);
} */






body {
    overflow-x: hidden;
    background: rgb(0, 0, 0);
}

.imagem_de_fundo {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    display: block;
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
    background: linear-gradient(166deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 60%);
}

h1 {
    color: white;
    padding-top: 40vh;
    font-size: 5.5vw;
}

.divisoria {
    width: 100%;
    height: 5px;
    background-color: var(--colorBanco);
    border: none;
    margin: 20px 0;
}




.rsIni {
    margin-top: 100vh;
    color: white;
    text-align: center;
}

.rs {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    padding: 5px;
    margin-top: -2.5vh;
    padding-bottom: 3vh;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.151);
}

.R {

    padding: 1vw;
    margin: calc(10vw/ 5);
    margin-top: 5vw;
    width: calc(60vw / 5);
    border: 2px white solid;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.1);
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

import { library } from '@fortawesome/fontawesome-svg-core'
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons'


library.add(faWhatsapp, faInstagram)




export default {
    name: "index_eco",
    components: {
        Cabecalho,
    },
};
</script>