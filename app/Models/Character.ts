import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Nemesis from './Nemesis'

export default class Character extends BaseModel {
  public static table = 'character'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public gender: string

  @column()
  public ability: string

  @column()
  public minimalDistance: number

  @column()
  public weight: string

  @column()
  public born: Date

  @column()
  public inSpaceSince: Date

  @column()
  public beerConsumption: number

  @column()
  public knowsTheAnswer: boolean

  @hasMany(() => Nemesis)
  public nemeses: HasMany<typeof Nemesis>
}
