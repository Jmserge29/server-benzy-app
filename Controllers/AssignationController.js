import Assignation from "../Models/Assignation.js";
import Materia from "../Models/Materia.js";
import User from "../Models/User.model.js"
import mongoose from 'mongoose'
import moment from 'moment'

var time = moment().format('MMMM Do YYYY, h:mm:ss a');

// Creating Assignations By Id (Controller for Moderators And Admins)
const createAssignation = async (req, res) => {
    // Inputs variables -> assignation
    const { name, date, materia } = req.body

    try {
        //Creating assignation object
        const assignationCreate = new Assignation(
            {
                name,
                date,
            }
        )

        // validation if materia was provided or not
        if (materia) {
            //Seacrch in the database if materia exist into
            const materiaFound = await Materia.findOne({ id: materia })
            if (!materiaFound) {
                return res.status(200).json({
                    message: 'materia no exist'
                })
            }
            assignationCreate.materia = materiaFound._id
            const assignationCreated = await assignationCreate.save()
            res.status(200).json({
                data: assignationCreated
            })
        } else {
            return res.status(404).json({
                message: 'no materia provided'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'an error in the server has ocurred'
        })
    }
}

// Getting Alls Assignation (Controller for Users, Moderators and Admins)*
const getAssignations = async (req, res) => {
    try {
        await Assignation.find({}, (error, assignations) => {
            if (error) {
                return res.status(400).json({ success: false, error: error })
            }
            if (!assignations.length) {
                return res.status(404).json({
                    success: false,
                    message: `assignations not found`
                })
            }
            return res.status(200).json({ success: true, data: assignations })
        }).catch(error => console.log(error))
    } catch (error) {
        return res.status(500).json({
            message: 'an error in the server has ocurred'
        })
    }
}

// Deleting Assignations By Id (Controller for Moderators and Admins)
const deleteAssigantion = async (req, res) => {
    try {
        await Assignation.findByIdAndDelete(req.params.id)
        return res.status(204).json({
            message: 'The assignation has been deleted'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An error have ocurred into the server :('
        })
    }
}

// Updating Assignations By Id (Controller for Moderators and Admins)
const updateAssigantion = async (req, res) => {
    try {
        const assignation = await Assignation.findById(req.params.id)
        if (assignation.length === 0) return res.json({ message: 'the assignation not exist' })
        const assignationUpdated = await Assignation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            update: assignationUpdated
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An error have ocurred into the server :('
        })
    }
}

// Getting Assignation By Id (Controller for Users, Moderators and Admins)*
const getAssigantionById = async (req, res) => {
    try {
        const assignation = await Assignation.findById(req.params.id);
        if (assignation.length === 0) return res.json({ message: 'the assignation not exist' })
        res.status(200).json({
            success: true,
            data: assignation
        })
    } catch (error) {
        return res.status(500).json({
            message: 'An error have ocurred into the server :('
        })
    }
}

const checkAssignation = async (req, res) => {
    try {
        const { assignation } = req.params
        const user = req.body.user
        // Prevention the entered _id assignation in request params
        if (!assignation) return res.status(400).json({ message: 'No assignation provided' })

        // Validation if _id assignation is a ObjectId or not
        if (!mongoose.Types.ObjectId.isValid(assignation)) {
            return res.status(400).json({
                message: '_id assignation provided is not valid'
            })
        }

        const assignationUpdate = await Assignation.findById(assignation)
        if (assignationUpdate === null) return res.status(404).json({ message: "Assignation not found:(" })
        if (!user) return res.status(400).json({ message: 'No user provided ERROR' })

        // Validation if the email provided is real exist or not
        const userFound = await User.find({ email: user }, { password: 0, roles: 0 })
        const element = userFound[0].assignations.find(element => element.as.equals(assignationUpdate._id));

        // validation if the assignation already is true
        var dateSuccess = ''
        var boolean
        if(element.status===false){
            boolean = true
            dateSuccess = time
        }
        else if(element.status===true){
            boolean = false
        }

        const position = (userFound[0].assignations.indexOf(element))
        await User.updateOne({ _id: userFound[0]._id}, {
            $set: {
                [`assignations.${position}.status`]: boolean,
                [`assignations.${position}.date`]: dateSuccess
            }
        })

        const userUpdated = await User.findById(userFound[0]._id)

        // userFound.assignations
        return res.status(200).json({
            user: userUpdated
    })
        } catch (error) {
        return res.status(500).json({
            message: 'An error have ocurred into the server :('
        })
    }
}


export default {
    createAssignation,
    getAssignations,
    deleteAssigantion,
    updateAssigantion,
    getAssigantionById,
    checkAssignation,
}