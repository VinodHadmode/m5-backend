const express=require("express")
const { DoctorModel } = require("../models/doctor.model")
const { docMW } = require("../middleware/doc.middleware")

const doctorRouter=express.Router()

doctorRouter.post("/appointments",docMW,async(req,res)=>{
    // const {}
    try {
        const appointment=new DoctorModel(req.body)
        await appointment.save()
        res.status(200).json({msg:"New Appointment created!!"})
        
    } catch (error) {
        res.status(400).json({err:error.message})
    }
 
})

doctorRouter.get("/",docMW,async(req,res)=>{
    const docID=req.body.doctorID
    
    try {
        const allDocs=await DoctorModel.find({doctorID:docID})
        res.status(200).json({allDocs})
    } catch (error) {
        res.status(400).json({err:error})
    }
})


module.exports={
    doctorRouter
}