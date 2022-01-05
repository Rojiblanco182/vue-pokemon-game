import pokemonApi from "@/api/pokemonApi"

const getPokemons = () => {
    const pokemonsArray = Array.from( Array(650) )
    return pokemonsArray.map((item, idx) => idx++)
}

const getPokemonOptions = async () => {
    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)

    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))

    return pokemons
}

const getPokemonNames = async ( [pokemon1, pokemon2, pokemon3, pokemon4] = [] ) => {
    const promiseArray = [
        pokemonApi.get(`/${pokemon1}`),
        pokemonApi.get(`/${pokemon2}`),
        pokemonApi.get(`/${pokemon3}`),
        pokemonApi.get(`/${pokemon4}`)
    ]

    const [p1, p2, p3, p4] = await Promise.all(promiseArray)

    return [
        { name: p1.data.name, id: p1.data.id },
        { name: p2.data.name, id: p2.data.id },
        { name: p3.data.name, id: p3.data.id },
        { name: p4.data.name, id: p4.data.id }
    ] 
}

export default getPokemonOptions