import PokemonPage from '@/pages/PokemonPage'
import { shallowMount } from '@vue/test-utils'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage component', () => {
    test('should call mixPokemonArray() when the component is mounted', () => {
        const spyOnMixPokemonArray = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        shallowMount(PokemonPage)

        expect(spyOnMixPokemonArray).toHaveBeenCalled()
    })
    
    test('should match the snapshot once the data has been loaded', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''        
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })
    
    test('should show the PokemonOptions and PokemonPicture components', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''        
                }
            }
        })
        const pokemonPicture = wrapper.find('pokemon-picture-stub')
        const pokemonOptions = wrapper.find('pokemon-options-stub')

        expect(pokemonPicture.exists()).toBeTruthy()
        expect(Number(pokemonPicture.attributes('pokemonid'))).toBe(pokemons[0].id)
        expect(pokemonOptions.exists()).toBeTruthy()
        expect(pokemonOptions.attributes('pokemons')).toBeTruthy()
    })
    
    test('should work properly when showSelectedOption is called', async() => {
        const expectedWrongMessage = `Oops, fallaste! Es ${pokemons[0].name}`
        const expectedRightMessage = `Correcto, es ${pokemons[0].name}`
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''        
                }
            }
        })

        await wrapper.vm.showSelectedOption(pokemons[0].id)

        expect(wrapper.vm.message).toBe(expectedRightMessage)
        
        await wrapper.vm.showSelectedOption(8)
        
        expect(wrapper.vm.message).toBe(expectedWrongMessage)

        expect(wrapper.vm.showAnswer).toBe(true)
        expect(wrapper.vm.showPokemon).toBe(true)
    })
})
