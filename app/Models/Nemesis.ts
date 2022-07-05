import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Character from './Character'
import Secret from './Secret'

export default class Nemesis extends BaseModel {
  public static table = 'nemesis'

  @column({ isPrimary: true })
  public id: number

  @column()
  public isAlive: boolean

  @column()
  public years: number

  @column()
  public characterId: number

  @belongsTo(() => Character, { foreignKey: 'character_id' })
  public character: BelongsTo<typeof Character>

  @hasMany(() => Secret)
  public secrets: HasMany<typeof Secret>
}
