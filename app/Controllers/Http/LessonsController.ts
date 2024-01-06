import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson'

export default class LessonsController {
    public async index({ view }: HttpContextContract) {
        const lessons = Lesson.all()
        return view.render('welcome', { lessons })
    }
    public async show({ params, view }: HttpContextContract) {
        const lesson = await Lesson.findOrFail(params.id)
        return view.render('showLesson', { lesson })

    }
    public async create({ view }: HttpContextContract) {
        return view.render('createLesson',)


    }

    public async store({ request, response }: HttpContextContract) {
        const payload = request.all()
        Lesson.create(payload)
        return response.redirect().back()
    }
    public async edit({ }: HttpContextContract) {

    }
    public async update({ params, request , response }: HttpContextContract) {
        const book = await Lesson.findOrFail(params.id)
        book
            .merge({
                title: request.input("title"),
            })
            .save();
        return response.redirect("/");

    }
    public async destroy({ params, response}: HttpContextContract) {
        const lesson = await Lesson.findOrFail(params.id)
        await lesson.delete()
        return  response.redirect('/')

    }

}
