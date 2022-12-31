import {Schema, model} from 'mongoose'

const departmentSchema = Schema([
    {
        name: String,
        description: String
    }
])

export default model("Department", departmentSchema)