import express from "express"
import mongoose from 'mongoose'
import StudentModel from "../models/students.models.js"

const router = express.Router();

router.post("/students", async (req, res, next) => {
  try{
  const student = await StudentModel.create(req.body);
  res.json(student);
  }catch(err){
    next(err)
  }
});
//not work

// GET /api/students
router.get("/students", async (req, res) => {
  try {
    const student = await Student.find({}).populate("cohort")
    res.status(201).json(student)
  } catch (error) {
    res.status()
  }
})
//not working
// router.get("/students", async (req, res, next) => {
//   try{
//   const students = await StudentModel.find({});
//   res.json(students);
//   }catch(err){
//     next(err)
//   }
// });

// GET /api/students/cohort/:cohortId

router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort")

    res.json(students)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
//ITS WORKING
// router.get("/students/cohort/:cohortId", async (req, res, next) => {
//   try{
//   const cohortObjectId = new mongoose.Types.ObjectId(req.params.cohortId);
//   const students = await StudentModel.find({ cohort: cohortObjectId });
//   res.json(students);
//   }catch(err){
//     next(err)
//   }
// });

router.get("/students/:studentId", async (req, res,next) => {
  try{
  const student = await StudentModel.findById(req.params.studentId);
  if(!student){
      return res.status(404).json({message: "Student not found"})
  }
  res.json(student);
  }catch(err){
    next(err)
  }
});
// ALSO WORKING
router.put("/students/:studentId", async (req, res, next) => {
  try{
      const updatedStudent = await StudentModel.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
      if(!updatedStudent){
        return res.status(404).json({message: "Student not found"})
      }
      res.json(updatedStudent);
    }catch(err){
      next(err);
  }
});

router.delete("/students/:studentId", async (req, res, next) => {
  try{
  const deletedStudent = await StudentModel.findByIdAndDelete(req.params.studentId);
  if(!deletedStudent){
    return res.status(404).json({message : "Student not found"})
  }
  res.json({ message: "Student deleted successfully" });
  }catch(err){
    next(err)
  }
});

export default router;