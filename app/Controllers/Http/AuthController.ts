import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreatUserValidator from 'App/Validators/CreatUserValidator'

export default class AuthController {

    public async showLogin({ view }: HttpContextContract) {

        return view.render('showLoginForm')
    }

    public async login({ auth, request, response }: HttpContextContract) {

        const { email, password } = request.all()
        await auth.attempt(email, password)
        return response.redirect().toPath('/')
    }

    public async showRegister({ view }: HttpContextContract) {

        return view.render('showRegisterForm')
    }

    public async register({ request, response }: HttpContextContract) {

        const payload = await request.validate(CreatUserValidator)
        User.create(payload)
        return response.redirect().back()
    }
    public async logout({ auth, response }: HttpContextContract) {
      
        await auth.logout()
        return response.redirect('/login')
    }

}
