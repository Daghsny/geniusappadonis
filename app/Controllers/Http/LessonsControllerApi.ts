import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson'

export default class LessonsControllerApi {
    public async index({ }: HttpContextContract) {
        const lessons = Lesson.all()
        return lessons
    }
    public async show({ params }: HttpContextContract) {
        try {
            const lesson = await Lesson.findOrFail(params.id)
            if (lesson) {
                return lesson
            }
        } catch (error) {
            console.log(error)
        }

    }
    public async create({ view }: HttpContextContract) {
        return view.render('createLesson',)


    }

    public async store({ request, response }: HttpContextContract) {
        const payload = request.all()
        Lesson.create(payload)
        return response.created
    }
    // public async edit({ }: HttpContextContract) {

    // }
    public async update({ params, request, response }: HttpContextContract) {
        const book = await Lesson.findOrFail(params.id)
        if (book) {
            book
                .merge({
                    title: request.input("title"),
                })
                .save();
            return book
        } return response.status(401)

    }
    public async destroy({ params, response }: HttpContextContract) {
        const lesson = await Lesson.findOrFail(params.id)
        await lesson.delete()
        return response.json({message:'deleted Succfull !'})

    }

}
