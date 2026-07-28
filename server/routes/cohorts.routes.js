import express from "express"
import CohortModel from "../models/cohorts.models.js"

const router = express.Router();



// POST /api/cohorts - Creates a new cohort
router.post("/cohorts", async (req,res,next)=>{
    try{
    const cohort = await CohortModel.create(req.body)
    res.status(201).json(cohort)
    } catch(err){
        next(err)
    }
})

// GET /api/cohorts - Retrieves all of the cohorts in the database collection
router.get("/cohorts" , async (req,res,next)=>{
    try{
    const cohort = await CohortModel.find({})
    res.json(cohort)
    } catch (err){
        next(err)
    }

})
//GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
router.get("/cohorts/:cohortId", async (req,res,next)=>{
    try{
    const updatedCohort = await CohortModel.findByIdAndUpdate(req.params.cohortId, req.body/*, {new: true}*/)
    if(!updatedCohort){
        return res.status(404).json({message: "Cohort not found"})
    }
    res.json(updatedCohort);
    }catch(err){
        next(err)
    }
})

//PUT /api/cohorts/:cohortId - Updates a specific cohort by id
router.put("/cohorts/:cohortId", async (req,res, next)=>{
    try{
    const updatedCohort = await CohortModel.findByIdAndUpdate(req.params.cohortId, req.body/*, {new: true}*/)
    if(!updatedCohort){
        return res.status(404).json({message: "Cohort not found"})
    }
    res.json(updatedCohort);
    }catch(err){
        next(err)
    }
})
//DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id
router.delete("/cohorts/:cohortId", async (req,res,next)=>{
    try{
    const deletedCohort =await CohortModel.findByIdAndDelete(req.params.cohortId);
    if(!deletedCohort){
        return res.status(404).json({message:"Cohort not found"})
    }
    res.json({message: 'Cohort deleted successfully'})
    } catch (err){
        next(err)
    }
}) 

export default router;