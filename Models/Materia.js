import {Schema, model} from 'mongoose'

const materiaSchema = Schema([
    {
        id: {
            type: String,
            require: true,
            unique: true
        },
        enlace: {
            type: String,
            require: true,
        },
    },
    {
        versionKey: false
    }
])

export default model("Materia", materiaSchema)