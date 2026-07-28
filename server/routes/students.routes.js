import express from "express"
import StudentModel from "../models/students.models.js"

const router = express.Router();

// POST /api/students - Creates a new student
router.post("/students", async (req, res, next) => {
  try{
  const student = await StudentModel.create(req.body);
  res.json(student);
  }catch(err){
    next(err)
  }
});


// GET /api/students - Retrieves all of the students in the database collection
router.get("/students", async (req,res,next)=>{
  try{
    const students = await StudentModel.find()
    res.json(students)
  }catch(err){
    next(err)
  }
})

//GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
router.get("/students/cohort/:cohortId", async (req, res) => {
  try {
    const students = await StudentModel.find({}).populate("cohort")
    res.json(students)
  } catch (err) {
    next(err)
  }
})

// GET /api/students/:studentId - Retrieves a specific student by id
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

// PUT /api/students/:studentId - Updates a specific student by id
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

// DELETE /api/students/:studentId - Deletes a specific student by id
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