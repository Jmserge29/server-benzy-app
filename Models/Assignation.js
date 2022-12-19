import {Schema, model} from 'mongoose'

const Assignation = Schema([
    {
        name: {
            type: String,
            require: true,
            unique: true
        },
        materia: {
            type:  Schema.Types.ObjectId,
            require: true
        },
        date: {
            type: String
        }
    },
    {
        versionKey: false
    }
])

export default model("Assignation", Assignation)