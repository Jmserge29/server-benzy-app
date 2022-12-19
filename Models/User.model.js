// Imports dependences
import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import moment from 'moment'

// Creating Model for User
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            unique: false
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role"
            },
        ],
        lastActivity: {
            type: String,
        },
        assignations: [
            {
                as:{
                    type: Schema.Types.ObjectId,
                    required: true
                },
                status: {
                    type: Boolean,
                    required: true
                }
            }
        ],
        materias: [
            {
                type: Schema.Types.ObjectId,
                ref: "Materia"
            }
        ]
    },
    {
        timestamps: true,
        versionkey: false
    }
)
// FuctionsDev
// Encrypt password the User
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
};
// Comparer Passwords the User 
userSchema.statics.comparePassword = async (password, reveicedPassword) => {
    return await bcrypt.compare(password, reveicedPassword)
}

export default model("User", userSchema)