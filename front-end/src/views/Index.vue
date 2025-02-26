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
    
    <section class="quemsomos">
        <h2 class="tituloSecao">Quem Somos?</h2>

        <div class="texto">
            
            <div>
                <p>A EcoNotifíca é uma plataforma inovadora com a missão de conectar catadores de materiais recicláveis
                    diretamente aos cidadãos, promovendo um ciclo de reaproveitamento e reciclagem que beneficia tanto o
                    meio ambiente quanto a economia local. </p>
                <p>Nosso objetivo é reduzir a sujeira urbana, aumentar a conscientização ambiental e, ao mesmo tempo,
                    proporcionar uma fonte de renda digna para os catadores e recicladores.</p>

                <p>Acreditamos que cada ação conta quando se trata de cuidar do nosso planeta. Por isso, criamos uma
                    solução
                    simples e eficiente, onde os cidadãos podem notificar a plataforma sobre materiais recicláveis que
                    desejam descartar, enquanto os catadores têm acesso direto a essas informações, podendo coletá-los e
                    destiná-los de forma correta.</p>

                <p>A EcoNotifíca tem como prioridade a sustentabilidade, incentivando o descarte responsável e
                    promovendo a
                    economia circular. Ao escolher utilizar nossa plataforma, você contribui para um futuro mais limpo,
                    justo e ecológico, ajudando a transformar o lixo em um recurso valioso para todos.</p>
                <p>Junte-se a nós nessa jornada! O futuro do nosso planeta depende das pequenas atitudes de cada um.
                    Vamos
                    fazer a diferença, juntos!</p>
            </div>

            <img :src="require('@/assets/lixão.jpg')" alt="imagem" id="imagens">
        </div>
    </section>
    

    <section class="mapa">



    </section>

    <footer>

        <center><img :src="require('@/assets/logo_login.png')" alt="LOGO-ECONOTIFICA" class="imagens"></center>

        <ul class="footer_ul">

            <div>
                <li>
                    <p>Sobre</p>
                </li>
                <li>
                    <p>Opçoes de coleta</p>
                </li>
                <li>
                    <p>Login</p>
                </li>
                <li>
                    <p>Cadastro</p>
                </li>
            </div>
            <div>
                <li class="footer_ul_li">
                    <a href=""><font-awesome-icon :icon="['fab', 'whatsapp']" class="ico" /></a>
                </li>
                <li class="footer_ul_li">
                    <a href=""><font-awesome-icon :icon="['fab', 'instagram']" class="ico" /></a>
                </li>
            </div>


        </ul>

    </footer>



</template>

<style>
.tituloSecao {
    color: black;
    padding: 10px;
    width: 90vw;
    margin-left: 5vw;
    margin-right: 5vw;
    background-color: white;
    text-align: center;
    border-radius: 20px;
    margin-bottom: 3vh;


}

.quemsomos {
    background-color: rgb(32, 32, 32);
    padding-top: 10vh;
    width: 100%;
    padding-bottom: 5vh;
}


.texto {
    margin: 5vh;
    margin-bottom: 0;
    padding-bottom: 5vh;
    display: flex;
    width: 100%;
}


.texto p {
    color: white;
    margin-bottom: 2vh;
    width: 50vw;
    

}
#imagens{
    margin-left: 3vw;
    width: 30vw;
    border-radius: 40px;
}




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
    background-color: white;
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








footer {
    padding: 2.5vw;
    background-color: rgb(0, 46, 15);
    color: white;
    border-top: white solid 2px;
}

.ico {
    font-size: 1.7vw;
}

.ico:hover {
    color: rgb(183, 255, 142);

}

footer ul li p:hover {
    color: rgb(183, 255, 142);
    cursor: pointer;
}

footer ul {
    display: flex;
}

footer ul li {
    padding: 10px;
    font-size: 15px;
    margin-left: 5vw;
    margin-right: 5vw;
}



.imagens {
    width: 10vw;
    margin-bottom: 5vh
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