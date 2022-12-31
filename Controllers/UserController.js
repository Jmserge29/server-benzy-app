// Imports dependences
import jwt from "jsonwebtoken";
import moment from "moment";
// Imports Models MongoDB
import User from "../Models/User.model.js"
import Role from '../Models/Role.js'
import Assignation from '../Models/Assignation.js';
import Materia from '../Models/Materia.js'
import mongoose from 'mongoose'

var time = moment().format('MMMM Do YYYY, h:mm:ss a');

// Controllers
const signIn = async (req, res) => {
    try {
        // Received iniformation client
        const { email, password } = req.body
        // user search by email
        const user = await User.findOne({ email: email })
        console.log(user)
        // validation if user exist or not
        if (!user) {
            return res.status(404).json({
                succes: false,
                message: "User not found:("
            })
        }
        // Descrypted password and validation if this password is correct or not
        const passwordCompared = await User.comparePassword(password, user.password)
        if (!passwordCompared) {
            return res.status(404).json({
                auth: false,
                token: null,
                message: 'Invalided password'
            })
        }

        // Store _id the user in the token {_id: "Usuario2123321"}
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_TOKEN, {
            expiresIn: 60 * 60 * 24
        })

        await User.findByIdAndUpdate(user._id, {lastActivity: time})

        // Creating cookie for store token in cookies the browser
        res.status(202).cookie('Token', token, {
            sameSite: 'strict',
            path: '/',
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
        })

        res.status(200).json({
            auth: true,
            token: token,
            message: 'welcome!'
        })

    } catch (error) {
        res.status(404).json({
            message: 'advertence, an error has ocurred!'
        })
    }
}

const signUp = async (req, res) => {
    try {
        // Input form data-body
        const { email, password, roles, lastActivity, materias, assignations } = req.body

        // Error prevention field email
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'You must provide a user, error email'
            })
        }

        // The proccess of data transformations for save in database
        const passwordEncrypted = await User.encryptPassword(password)

        // Creating user in the model
        const userCreate = new User(
            {
                email,
                password: passwordEncrypted,
                lastActivity: time
            }
        )
        
        // Verify roles and store in userCreate
        if (roles) {
            const rolesFound = await Role.find({ property: { $in: roles } });
            userCreate.roles = rolesFound.map((role) => role._id)
        }
        else {
            const role = await Role.findOne({ property: 'user' })
            userCreate.roles = [role._id]
        }

        // Verify materias and store in userCreate
        if(materias){
            const materiasFound = await Materia.find({ id: { $in: materias }})
            userCreate.materias = materiasFound.map((materia)=> materia._id)
        }
        else {
            userCreate.materias = []
        }

        // Verify assignations (Subdocuments) and store => status by progress
        if(assignations){
            const assignFound = await Assignation.find({ name: { $in: assignations } });
            //Getting Id of (Assignation) => Array
            const infoId=assignFound.map((dato)=>dato._id)
            //Getting propierty materia of (Assignation) => Array
            const infoMateria=assignFound.map((dato)=>dato.materia)
            const materiasId = userCreate.materias
            // var cont is counter of cicle for
            var cont=0
            for(var i=0; i<infoId.length;i++){
                for(var j=0; j<materiasId.length;j++){
                    // console.log('Materia: '+materiasId[j])
                    if(infoMateria[i].equals(materiasId[j])){
                        // console.log('Iguales: '+infoMateria[i]+materiasId[j])
                        userCreate.assignations[cont]={as: infoId[i], status: false, date: ''}
                        cont++
                    }
                }
            }
        } else{
            userCreate.assignations=[]
        }    

        // saving user created
        const userCreated = await userCreate.save()
        const token = jwt.sign({ id: userCreated._id }, process.env.SECRET_KEY_TOKEN)
        // Error prevention user not assigned
        if (!userCreated) {
            return res.status(400).json({
                success: false,
                message: 'The user has not been created :('
            })
        }
        return res.status(200).json({
            data: userCreated,
            token: token
        });

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message: 'advertence, an error has ocurred!',
        })
    }
}

const signOut = async (req, res) => {
    try {

        res.send('Oh, signOut, i hope see soon:)')

    } catch (error) {
        res.status(404).json({
            message: 'advertence, an error has ocurred!'
        })
    }
}

const getUsers = async (req, res) => {
    try {
        await User.find({}, (error, users) => {
            if (error) {
                return res.status(400).json({ success: false, error: error })
            }
            if (!users.length) {
                return res.status(404).json({
                    success: false,
                    message: `users not found`
                })
            }
            return res.status(200).json({ success: true, data: users })
        }).catch(error => console.log(error))
    } catch (error) {
        return res.status(404).json({
            message: 'advertence, an error has ocurred!'
        })
    }
}

const dataUser = async(req, res) => {
    try {
        const {email} = req.body
        const user = await User.find({email: email})
        var listStatus = []
        var listComplet = []
        var countFalse=0
        var countTrue=0
        var assignationsP=[]
        var arrayComplet = new Array()
        
        for(var i=0; i<user[0].assignations.length;i++){
            // Getting the object the Assignation
            var idAss = await Assignation.findById(user[0].assignations[i].as)
            listStatus.push(user[0].assignations[i].status)
            listComplet.push({_id: user[0].assignations[i].as, status: user[0].assignations[i].status})
            if(user[0].assignations[i].status===false){
                countFalse++
                assignationsP.push(idAss.name)
            }
            else if(user[0].assignations[i].status===true) countTrue++

            // Extract _id materia the Object Assignation
            for(var j=0; j<user[0].materias.length;j++){
                if(idAss.materia.equals(user[0].materias[j])){
                    const nameMater = await Materia.findById(user[0].materias[j])
                    arrayComplet.push(nameMater.id)
                }
            }
        }
        // Cant Assignations x Matter and storage in a array into document Json
        var listSecond=[]
        for(var j=0; j<listComplet.length;j++){
            const {materia} = await Assignation.findById(listComplet[j]._id)
            const {id} = await Materia.findById(materia)
            listSecond.push({matter: id, status: listComplet[j].status})
        }

        const met = listSecond.filter((matter, i) => i == 0 ? true : arrayComplet[i - 1] != matter.matter);
        const counterMet = met.map(mat => {
            return {matter: mat.matter, count: 0, falses: 0, trues: 0, progress: 0+'%'};
        });

        counterMet.map((countMet, i) =>{
            const actualMatLength = listSecond.filter(matter => matter.matter === countMet.matter).length;
            countMet.count = actualMatLength;
            const cantFalses = listSecond.filter(matter =>matter.matter === countMet.matter && matter.status === false).length;
            countMet.falses = cantFalses;
            const cantTrues = listSecond.filter(matter => matter.matter === countMet.matter && matter.status === true).length;
            countMet.trues = cantTrues;
            // progress By Matter
            if(cantTrues!=0){
                countMet.progress=((cantTrues*100)/actualMatLength)+'%'
            }
        })

        // progress General User by Assignations
        var progress=0;
        if(countTrue!=0){
            progress=(countTrue*100)/listStatus.length
        }

        return res.status(200).json({
            estadistics: counterMet,
            progress: progress+'%',
            assignationsP: assignationsP
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'an error in the server has ocurred'
        })
    }
}

const registration = async(req, res)=>{
    try {
        const {matter} = req.params
        const {user} = req.body
        // prevention if _id matter is in the URL of Request
        if(!matter){
            return res.status(400).json({
                message: 'materia not provided'
            })
        }
        // Validation if _id matter is a ObjectId or not
        if (!mongoose.Types.ObjectId.isValid(matter)) {
            return res.status(400).json({
                message: '_id materia provided is not valid'
            })
        }
        // Validation if the Matter exist or not exist in the database
        const materia = await Materia.findById(matter)
        if(materia===null) return res.status(404).json({message: 'materia not found:('})   
        
        // Validation if the Matter is already registered for the user
        const userFound = await User.find({email: user}, {password: 0})
        for(var i=0; i< userFound[0].materias.length; i++){
            if(userFound[0].materias[i].equals(matter)){
                return res.status(404).json({
                    message: 'The materia entered already registrated'
                })
            }
        }
        // Updating user array matters (adding the new matter)
        await User.updateOne({email: user}, {
            $push: {
                materias: materia._id
            }
        });

        // User Updated after the changes
        const userUpdated = await User.find({email: user}, {password: 0, roles: 0})
        return res.status(200).json({
            message: 'matter successfully registered',
            matter: userUpdated[0].materias
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'advertence, an error has ocurred!',
        })
    }
}

const assignation = async(req, res) =>{
    try {
        const {assignation} = req.params
        const {user} = req.body
        // prevention if _id assignation is in the URL of Request
        if(!assignation){
            return res.status(400).json({
                message: 'the assignation not provided'
            })
        }
        // Validation if _id assignation is a ObjectId or not
        if (!mongoose.Types.ObjectId.isValid(assignation)) {
            return res.status(400).json({
                message: '_id assignation provided is not valid'
            })
        }
        // Validation if the Assignation exist or not exist in the database
        const assignationFound = await Assignation.findById(assignation)
        if(assignationFound===null) return res.status(404).json({message: 'asignacion not found:('})   

        // Validation if the Assigantion registered complies with the user's registered the matters
        const userFound = await User.find({email: user}, {password: 0, roles: 0})
        const boolean = userFound[0].materias.indexOf(assignationFound.materia)
        if(boolean===-1) return res.status(400).json({message: 'You can not assign this assignation because it is not registered in user´s list matters'})

        // Validation if the asignation is already registered for the user
        for(var i=0; i< userFound[0].assignations.length; i++){
            if(userFound[0].assignations[i].as.equals(assignation)){
                return res.status(404).json({
                    message: 'The assignation entered already registrated'
                })
            }
        }
        const assignationAdd = {as: assignation, status: false, date: ""}
        // Adding Assignation for User
        await User.updateOne({email: user}, {
            $push: {
                assignations: assignationAdd
            }
        });

        // User Updated after the changes
        const userUpdated = await User.find({email: user})
        return res.status(200).json({
            message: 'You are assignation tasks for user',
            data: userUpdated
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'advertence, an error has ocurred!',
        })
    }
}

//Exporting controllers --> Routes
export default {
    signIn,
    signUp,
    signOut,
    getUsers,
    dataUser,
    registration,
    assignation,
    
}