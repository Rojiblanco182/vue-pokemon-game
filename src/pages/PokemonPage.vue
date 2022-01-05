<template>
    <div v-if="!pokemon">
        <h3>Espere por favor...</h3>
    </div>

    <div v-else>
        <h1>Cuál es este pokémon?</h1>
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
        <PokemonOptions :pokemons="pokemonArr" @selection="showSelectedOption($event)" />
        
        <template v-if="showAnswer">
            <h2> {{ message }} </h2>
            <button @click="restart">Nuevo juego</button>
        </template>
    </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'
import getPokemonOptions from '@/helpers/getPokemonOptions'


export default {
    components: {
        PokemonPicture,
        PokemonOptions
    },
    data() {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        async mixPokemonArray() {
            this.pokemonArr = await getPokemonOptions()
            const randomNumber = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[randomNumber]
        },
        showSelectedOption(selectedOption) {
            this.showPokemon = true
            this.showAnswer = true
            this.message = selectedOption === this.pokemon.id
            ? `Correcto, es ${this.pokemon.name}`
            : `Oops, fallaste! Es ${this.pokemon.name}`
        },
        restart() {
            this.showPokemon = false,
            this.showAnswer = false,
            this.message = '',
            this.pokemon = null,
            this.mixPokemonArray()
        }
    },
    mounted() {
        this.mixPokemonArray()
    }
}
</script>
