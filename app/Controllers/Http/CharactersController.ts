import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Character from 'App/Models/Character'

export default class CharactersController {
  public async findAll({ response }: HttpContextContract) {
    try {
      const characters = await Character.query()
        .select('*')
        .preload('nemeses', (nemesesQuery) => {
          nemesesQuery.preload('secrets')
        })

      const currentYear = new Date().getFullYear()
      const charactersWithWeight = characters.filter((character) => character.weight).length

      const characterStatistics = characters.reduce(
        (acc, curr) => {
          //compute average only for characters with defined weight same as avg function in SQL
          if (curr.weight) {
            acc.averageCharacterWeight += parseFloat(curr.weight) / charactersWithWeight
          }
          const characterAge = currentYear - curr.born.getFullYear()
          acc.averageCharacterAge += characterAge / characters.length
          acc.nemesisCount += curr.nemeses.length
          acc.nemesisWithYearsCount += curr.nemeses.filter((nemesis) => nemesis.years).length
          return acc
        },
        {
          averageCharacterWeight: 0,
          averageCharacterAge: 0,
          nemesisCount: 0,
          nemesisWithYearsCount: 0,
          characterCount: characters.length,
        }
      )

      //same as with character's weight
      const averageNemesisAge =
        characters
          .flatMap((character) => character.nemeses)
          .reduce((acc, curr) => acc + curr.years, 0) / characterStatistics.nemesisWithYearsCount

      response.status(200).json({
        statistics: {
          averageCharacterAge: Math.round(characterStatistics.averageCharacterAge),
          averageCharacterWeight: characterStatistics.averageCharacterWeight.toFixed(2),
          averageNemesisAge: Math.round(averageNemesisAge),
          characterCount: characterStatistics.characterCount,
          nemesisCount: characterStatistics.nemesisCount,
        },
        characters,
      })
    } catch (error) {
      response.status(500).json({
        error: error.message,
      })
    }
  }
}
