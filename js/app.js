//"characters": "https://rickandmortyapi.com/api/character",
//"locations": "https://rickandmortyapi.com/api/location",
//"episodes": "https://rickandmortyapi.com/api/episode"

const page = 2 
const baseUrl = 'https://rickandmortyapi.com/api'

//end-point necessários 
//requisição  de character
const loadCharacter = async () => {
     const res = await fetch(`${baseUrl}/character?=${page}`);
     //vamos armazenar informações
     const data = await res.json()
     //mostrar uma  certa quantidade de imagens para mostrar na tela do site usando slice(), puxamos o data onde deixamos um await para esperar a mensagem e puxamos sua informações e logo após mostramos a quantidade que queremos
     const limiteData = data.results.slice(0,6)
     return {results : limiteData}
}
//requisição  de location
const loadLocation = async () => {
    const res = await fetch(`${baseUrl}/location`);
     return await res.json() 
}
//requisição  de episode 
const loadEpisode = async () => {
    const res = await fetch(`${baseUrl}/episode`);
     return await res.json() 
}

//função para executar todas as funções acima 

const loadAllWithPromiseAll = async () => {
    //criar uma array para todas as funções acima, ele vai esperar todas os paramentros 
    const [character, location, episode] = await Promise.all([
          loadCharacter(), 
          loadLocation(),
          loadEpisode()
    ])
    //console para chamar todas funções, promisse.all - chamar todas as funções async criadas 
    //'console.log("Character:",character.results)' //results, esse results vem no console onde vamos puxar as informações - 
    //chamar somente os nomes dos personagens

    showCharacter(character.results) //função para executar todas as promisse do resultado
    console.log("Location:",location.results)
    console.log("Episode:",episode.results)    

}

loadAllWithPromiseAll()

//função para os personagem - precisa recber a lista dos caracteres (results)
function showCharacter (characters) {
    //pegou o id para aparecer no html - na tela 
    const charactercontainer = document.getElementById("character-container")
    //character.map para listar todos os nomes 
    //characters.map((characters) => console.log(character))
    //MAP LISTAR TODOS OS NOMES 
    characters.map((character) =>{
        //fazendo isso, podemos misturar o html no JS  criando um elemento, nesse caso é a div 
        const divCharacter = document.createElement('div')
        divCharacter.innerHTML = `
          <img src="${character.image}" alt="Imagem do personagem"/>

          <article class="character-info">

              <h3>${character.name}</h3>
              <div class="icon"></div>
              <span class="statusSpecies">${character.status} - ${character.species}</span>

              <span class="location">Last known location:</span>
              <a href="${character.location.url}">${character.location.name}</a>
              
              <span class="origin">First seen in:</span>
              <a href="${character.origin.url}">${character.origin.name}</a>

          </article>
        `;
        //chamamos a div, atribuimos uma class e chamos ela para expor na tela do site
        divCharacter.classList.add('character-box')
        charactercontainer.appendChild(divCharacter)
    })
}