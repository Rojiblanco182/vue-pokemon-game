import PokemonOptions from '@/components/PokemonOptions'
import { shallowMount } from '@vue/test-utils'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonOptions component', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons
            }
        })
    })
    test('should match the snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
    
    test('should show 4 options to the user', () => {
        const liItems = wrapper.findAll('li')

        expect(liItems.length).toBe(4)
        expect(liItems[0].text()).toBe(pokemons[0].name)
        expect(liItems[1].text()).toBe(pokemons[1].name)
        expect(liItems[2].text()).toBe(pokemons[2].name)
        expect(liItems[3].text()).toBe(pokemons[3].name)
    })
    
    test('should emit the selection event when a pokemon is selected by the user', () => {
        const [li1, li2, li3, li4] = wrapper.findAll('li')

        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')

        expect(wrapper.emitted('selection').length).toBe(4)
        expect(wrapper.emitted('selection')[0]).toEqual([pokemons[0].id])
        expect(wrapper.emitted('selection')[1]).toEqual([pokemons[1].id])
        expect(wrapper.emitted('selection')[2]).toEqual([pokemons[2].id])
        expect(wrapper.emitted('selection')[3]).toEqual([pokemons[3].id])
    })
    
})
