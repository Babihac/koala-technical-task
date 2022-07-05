import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

export default class Secret extends BaseModel {
  public static table = 'secrete'

  @column({ isPrimary: true })
  public id: number

  @column()
  public secreteCode: number

  @column()
  public nemesisId: number

  @belongsTo(() => Secret, { foreignKey: 'nemesis_id' })
  public nemesis: BelongsTo<typeof Secret>
}
