const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 5
let offset = 0

const maxRecords = 151




function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = [])=>{
       const newHtml = pokemons.map((pokemon)=>`
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img class="detail" src=${pokemon.photo} alt="${pokemon.name}">
                </div>

                <div class="atrtributes">
                    <p>Experiencia: ${pokemon.experience}</p>
                    <p>Altura: ${pokemon.heigth} '</p>
                    <p>Peso: ${pokemon.weight} lb</p>
                </div>

                    <p>HP:</p>
                    <dd>
                        <progress class="progress-bar" max="100" value="${pokemon.hp}"></progress>
                        <span>${pokemon.hp}</span>
                    </dd>


                    <p>Ataque:</p>
                    <dd>
                        <progress class="progress-bar" max="100" value="${pokemon.attack}"></progress>
                        <span>${pokemon.attack}</span>
                    </dd>

                    <p>Defesa:</p>
                    <dd>
                        <progress class="progress-bar" max="100" value="${pokemon.defense}"></progress>
                        <span>${pokemon.defense}</span>
                    </dd>

                    <p>Velocidade:</p>
                    <dd>
                        <progress class="progress-bar" max="100" value="${pokemon.speed}"></progress>
                        <span>${pokemon.speed}</span>
                    </dd>
            </li>
            `).join('')
       pokemonList.innerHTML += newHtml
     })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNexPage = offset + limit

    if(qtdRecordNexPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
})

