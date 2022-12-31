import {Schema, model} from 'mongoose'

const materiaSchema = new Schema(
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
        tutors: [
            {
                type: String,
                ref: "Tutor"
            },
        ],
        description: {
            type: String,
            require: true
        },
        department: [
            {
                type: Schema.Types.ObjectId,
                ref: "Department"
            }
        ],
    },
    {
        versionKey: false
    }
)

export default model("Materia", materiaSchema)