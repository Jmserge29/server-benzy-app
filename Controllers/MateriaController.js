import Materia from '../Models/Materia.js'

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
const createMaterias = async(req, res)=>{
    const {id, enlace} = req.body
    try {
        // Error prevention field id (name)
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'You dont provided id (name) of the materia'
            })
        }

        const materiacreate = new Materia(
            {
                id: id,
                enlace: enlace
            }
        )

        const materiaFound = await Materia.find({id: id})
        if(materiaFound.length > 0){
            return res.status(400).json({
                message: 'the id (name) provided exist, input other id again'
            })
        }

        const materiaCreated = await materiacreate.save()

        return res.status(200).json({
            data: materiaCreated
        })
    } catch (error) {
        return res.staus(500).json({
            message: 'an error have ocurred in the server'
        })
    }
}

// Deleting Matters By Id (Controller for Admins)
const deleteMaterias = async(req, res) =>{
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
const updateMaterias = async(req, res) =>{
    try {
        const materia = await Materia.findById(req.params.id)
        if(materia.length===0) return res.json({message: 'the materia not exist'})
        const materiaUpdated = await Materia.findByIdAndUpdate(req.params.id, req.body, {
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
const getMateriasById = async(req, res) =>{
    try {
        const materia = await Materia.findById(req.params.id);
        if(materia.length===0) return res.json({message: 'the materia not exist'})
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