import Materia from '../Models/Materia.js'
import Department from '../Models/Department.js'
import User from '../Models/User.model.js'
import Role from '../Models/Role.js'

// Getting All materias (Controller for Users, Moderators and Admins)
const getMaterias = async (req, res) => {
    try {
        await Materia.find({}, (error, materias) => {
            if (error) {
                return res.status(400).json({ success: false, error: error })
            }
            if (!materias.length) {
                return res.status(404).json({
                    success: false,
                    message: `materias not found`
                })
            }
            return res.status(200).json({ success: true, data: materias })
        }).catch(error => console.log(error))
    } catch (error) {
        return es.status(500).json({
            message: 'an error in the server has ocurred'
        })
    }
}

// Creating Matters (Controller for Admins)
const createMaterias = async (req, res) => {
    const { id, enlace, description, tutors, department } = req.body
    try {
        // Error prevention field id (name)
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'You dont provided id (name) of the materia'
            })
        }

        if (!enlace) {
            return res.status(400).json({
                success: false,
                message: 'enlace not provided'
            })
        }

        if (!tutors) {
            return res.status(400).json({
                success: false,
                message: 'tutors not provided'
            })
        }

        if (!department) {
            return res.status(400).json({
                success: false,
                message: 'department not provided'
            })
        }

        const materiacreate = new Materia(
            {
                id: id,
                enlace: enlace,
                description: description,
            }
        )

        // Add departments in the information of the matter
        const departmentFound = await Department.find({ name: department })
        if (departmentFound.length === 0) {
            res.status(400).json({
                message: 'department provided not exist'
            })
        }
        materiacreate.department = departmentFound.map((dato) => dato._id)

        // Add tutors in the information of the matter
        const tutorsFound = await User.find({ email: tutors }, { materias: 0, password: 0, assignations: 0 })
        if (tutorsFound.length === 0) {
            res.status(400).json({
                message: 'the tutors provided not exist'
            })
        }

        // List the users moderators provided
        var listTutors = []
        for (var j = 0; j < tutorsFound.length; j++) {
            var roleUser = await Role.find({ _id: { $in: tutorsFound[j].roles } })
            for (var i = 0; i < roleUser.length; i++) {
                if (roleUser[i].property === 'moderator') {
                    listTutors.push(tutorsFound[j].email)
                    break
                }
            }
        }
        materiacreate.tutors = listTutors

        const materiaFound = await Materia.find({ id: id })
        if (materiaFound.length > 0) {
            return res.status(400).json({
                message: 'the id (name) provided exist, input other id again'
            })
        }

        //Saving Matter in the DataBase MongoDB
        const materiaCreated = await materiacreate.save()

        return res.status(200).json({
            data: materiaCreated
        })
    } catch (error) {
        return res.status(500).json({
            message: 'an error have ocurred in the server'
        })
    }
}

// Deleting Matters By Id (Controller for Admins)
const deleteMaterias = async (req, res) => {
    try {
        await Materia.findByIdAndDelete(req.params.id)
        res.status(204).json({
            message: 'The materia has been deleted'
        })
    } catch (error) {
        res.status(500).json({
            message: 'An error have ocurred into the server :('
        })
    }
}

// Updating Matters By Id (Controller for Admins)
const updateMaterias = async (req, res) => {
    try {
        const { id, enlace, description, tutors, department } = req.body
        const materia = await Materia.findById(req.params.id)
        if (materia.length === 0) return res.status(400).json({ message: 'the materia not exist' })

        // Error prevention field id (name)
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'You dont provided id (name) of the materia'
            })
        }

        if (!enlace) {
            return res.status(400).json({
                success: false,
                message: 'enlace not provided'
            })
        }

        if (!description) {
            return res.status(400).json({
                success: false,
                message: 'description not provided'
            })
        }

        if (!tutors) {
            return res.status(400).json({
                success: false,
                message: 'tutors not provided'
            })
        }

        if (!department) {
            return res.status(400).json({
                success: false,
                message: 'department not provided'
            })
        }

        const materiaResult = {
            id,
            enlace,
            description,
            tutors,
            department
        }

        // Add departments in the information of the matter
        const departmentFound = await Department.find({ name: department })
        if (departmentFound.length === 0) {
            res.status(400).json({
                message: 'department provided not exist'
            })
        }
        materiaResult.department = departmentFound.map((dato) => dato._id)

        // Add tutors in the information of the matter
        const tutorsFound = await User.find({ email: tutors }, { materias: 0, password: 0, assignations: 0 })
        if (tutorsFound.length === 0) {
            res.status(400).json({
                message: 'the tutors provided not exist'
            })
        }

        // List the users moderators provided
        var listTutors = []
        for (var j = 0; j < tutorsFound.length; j++) {
            var roleUser = await Role.find({ _id: { $in: tutorsFound[j].roles } })
            for (var i = 0; i < roleUser.length; i++) {
                if (roleUser[i].property === 'moderator') {
                    listTutors.push(tutorsFound[j].email)
                    break
                }
            }
        }
        materiaResult.tutors = listTutors

        const materiaFound = await Materia.find({ id: id })
        if (materiaFound.length > 0) {
            return res.status(400).json({
                message: 'the id (name) provided exist, input other id again'
            })
        }

        const materiaUpdated = await Materia.findByIdAndUpdate(req.params.id, materiaResult, {
            new: true,
        });
        res.status(200).json({
            update: materiaUpdated
        })
    } catch (error) {
        res.status(500).json({
            message: 'An error have ocurred into the server :('
        })
    }
}

// Getting Matter By Id (Controller for Users, Moderators and Admins)
const getMateriasById = async (req, res) => {
    try {
        const materia = await Materia.findById(req.params.id);
        if (materia.length === 0) return res.json({ message: 'the materia not exist' })
        res.status(200).json(materia)
    } catch (error) {
        res.status(500).json({
            message: 'An error have ocurred into the server :('
        })
    }
}

export default {
    getMaterias,
    createMaterias,
    deleteMaterias,
    updateMaterias,
    getMateriasById,
}