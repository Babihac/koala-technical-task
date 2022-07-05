import Route from '@ioc:Adonis/Core/Route'

export default Route.group(() => {
  Route.get('/character', 'CharactersController.findAll')
}).prefix('/api')
