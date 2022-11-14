const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10
let offset = 0;

 

function convertPokemonToHtml(pokemon){
        return ` <li class="pokemon ${pokemon.type }">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}
    </span>
    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type)=> `<li class="type ${type}">${type}</li>`).join(' ')}
        </ol>

        <img src="${pokemon.photo}">
    </div>  
    </li>
    `
}


function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then ((pokemons = []) => {
        const newHtml = pokemons.map (convertPokemonToHtml).join('')
        pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join(' ')
        pokemonList.innerHTML += newHtml
        })
        
}

loadMoreButton.addEventListener('click', ()=>{
    offset += limit

    const qtdRecord = offset + limit

    if (qtdRecord >= maxRecords){
    const newLimit = qtdRecord - maxRecords
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
}else{

    loadPokemonItens(offset, limit)
}
})