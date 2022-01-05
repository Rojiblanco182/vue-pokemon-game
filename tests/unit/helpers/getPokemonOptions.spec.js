import getPokemonOptions, { getPokemons, getPokemonNames } from "@/helpers/getPokemonOptions"

describe('getPokemonOptions helpers', () => {
    test('getPokemons should return a sorted array of numbers 1-650', () => {
        const sortedArray = getPokemons()

        expect(sortedArray.length).toBe(650)
        expect(sortedArray[0]).toBe(1)
        expect(sortedArray[649]).toBe(650)
        expect(sortedArray[599]).toBe(600)
    })
    
    test('getPokemonNames should return a 4-item-array with Pokemon names and ids', async() => {
        const pokemons = await getPokemonNames([1, 2, 3, 4])
        const expectedResult = [
            {name: 'bulbasaur', id: 1},
            {name: 'ivysaur', id: 2},
            {name: 'venusaur', id: 3},
            {name: 'charmander', id: 4}
        ]

        expect(pokemons).toStrictEqual(expectedResult)
    })
    
    test('getPokemonOptions should return an unsorted 4-item-array containing the pokemons info', async() => {
        const pokemons = await getPokemonOptions()
        const expectedResult = [
            {
                name: expect.any(String),
                id: expect.any(Number)
            },
            {
                name: expect.any(String),
                id: expect.any(Number)
            },
            {
                name: expect.any(String),
                id: expect.any(Number)
            },
            {
                name: expect.any(String),
                id: expect.any(Number)
            }
        ]

        expect(pokemons.length).toBe(4)
        expect(pokemons).toEqual(expectedResult)
    })
    
})