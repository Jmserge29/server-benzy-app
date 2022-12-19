import {Schema, model } from 'mongoose'

const roleSchema = new Schema(
    {
        property: String
    },
    {
        versionKey: false
    }
);

export default model("Role", roleSchema);