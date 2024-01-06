/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/



import Route from '@ioc:Adonis/Core/Route'
import Lesson from 'App/Models/Lesson'

Route.get('/', async ({ view }) => {
  const lessons = await Lesson.all()

  return view.render('welcome', { lessons })
}).middleware('auth')

Route.get('/login', 'AuthController.showLogin')
Route.post('/login', 'AuthController.login')
Route.get('/register', 'AuthController.showRegister')
Route.post('/register', 'AuthController.register')
Route.post('/logout', 'AuthController.logout')

Route.group(() => {
  Route.get('/lesson', 'LessonsController.index')
  Route.post('/lesson', 'LessonsController.store')
  Route.get('/lesson/:id', 'LessonsController.show')
  Route.post('/lesson/:id', 'LessonsController.update')
  Route.post('/lesson/del/:id', 'LessonsController.destroy')
}).middleware('auth')

Route.group(()=>{
  Route.get('/', async ({ view }) => {
    const lessons = await Lesson.all()
  
    return view.render('welcome', { lessons })
  }).middleware('auth')
  
  Route.get('/login', 'AuthControllerApi.showLogin')
  Route.post('/login', 'AuthControllerApi.login')
  Route.get('/register', 'AuthControllerApi.showRegister')
  Route.post('/register', 'AuthControllerApi.register')
  Route.post('/logout', 'AuthControllerApi.logout')
  
  Route.group(() => {

   Route.group(()=>{
    Route.get('/', 'LessonsControllerApi.index')
    Route.post('/', 'LessonsControllerApi.store')
    Route.get('/:id', 'LessonsControllerApi.show')
    Route.post('/:id', 'LessonsController.Apiupdate')
    Route.post('/del/:id', 'LessonsControllerApi.destroy')
   }).prefix('/lesson')

  }).middleware('auth')
  
}).prefix('/api/v1')







// Route.get('/test', async ({request}:HttpContextContract) => {

//   return request.hostname.toJSON })