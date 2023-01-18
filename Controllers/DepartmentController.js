import Department from '../Models/Department.js'

const getDepartments = async(req, res) => {
    try {
        await Department.find({}, (error, departments) => {
            if (error) {
                return res.status(400).json({ success: false, error: error })
            }
            if (!departments.length) {
                return res.status(404).json({
                    success: false,
                    message: `departments not found`
                })
            }
            return res.status(200).json({ success: true, data: departments })
        })
    } catch (error) {
        return res.status(500).json({message: 'error the server :('})
    }
}

export default {
    getDepartments
}