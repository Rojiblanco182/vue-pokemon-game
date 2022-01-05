import PokemonPicture from '@/components/PokemonPicture'
import { shallowMount } from '@vue/test-utils'

describe('PokemonPicture component', () => {
    test('should match the snapshot', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
             pokemonId: 1,
             showPokemon: false 
            } 

        })

        expect(wrapper.html()).toMatchSnapshot()
    })
    
    test('should show the hidden image and pokemon #100', () => {
        const pokemonId = 100
        const expectedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: pokemonId,
                showPokemon: false
            }
        })
        const [hiddenImg, revealedImg] = wrapper.findAll('img')

        expect(hiddenImg.exists()).toBeTruthy()
        expect(hiddenImg.classes('hidden-pokemon')).toBeTruthy()
        expect(hiddenImg.attributes('src')).toBe(expectedUrl)
        expect(revealedImg).toBeUndefined()
    })

    test('should reveal the pokemon if showPokemon:true', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: true
            }
        })
        const revealedImg = wrapper.find('img')

        expect(revealedImg.exists()).toBeTruthy()
        expect(revealedImg.classes('hidden-pokemon')).toBeFalsy()
        expect(revealedImg.classes('fade-in')).toBeTruthy()
    })
})
