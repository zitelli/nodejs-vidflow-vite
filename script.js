import axios from "axios";

//console.log(axios);

const containerVideos = document.querySelector(".videos__container");

// Uso de == em vez de ===
const x = 9;

if (x === "10") {
  // Esta condição pode ser verdadeira mesmo que x não seja do tipo string
}

async function buscarEMostrarVideos() {
  try {
    // const busca = await fetch("http://localhost:3000/videos");
    // const videos = await busca.json();
    // const busca = await axios.get("http://localhost:3000/videos");

    // const urlVideos = import.meta.env.PROD
    //   ? "https://gist.githubusercontent.com/zitelli/4ea29d7a1ed49fbc9bcbd4b87c6b60ac/raw/70bc1d81ed71baa89a37b8d7f52bd7ddfaf1d7ac/videos.json"
    //   : "http://localhost:3000/videos";

    const urlVideos = import.meta.env.VITE_URL_VIDEOS;

    const busca = await axios.get(urlVideos);

    // console.log(busca);

    const videos = busca.data;

    videos.forEach((video) => {
      if (video.categoria == "") {
        throw new Error("Vídeo não tem categoria");
      }
      containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
                `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`;
  }
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
  const videos = document.querySelectorAll(".videos__item");

  if (barraDePesquisa.value != "") {
    for (let video of videos) {
      let titulo = video
        .querySelector(".titulo-video")
        .textContent.toLowerCase();
      let valorFiltro = barraDePesquisa.value.toLowerCase();

      if (!titulo.includes(valorFiltro)) {
        video.style.display = "none";
      } else {
        video.style.display = "block";
      }
    }
  } else {
    for (let video of videos) {
      video.style.display = "block";
    }
  }
}

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
  let nomeCategoria = botao.getAttribute("name");
  botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll(".videos__item");
  for (let video of videos) {
    let categoria = video.querySelector(".categoria").textContent.toLowerCase();
    let valorFiltro = filtro.toLowerCase();

    if (!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  }
}
