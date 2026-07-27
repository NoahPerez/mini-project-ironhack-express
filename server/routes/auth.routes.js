import express from "express"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'
import isAuth from '../middleware/jwt.middleware.js'
const router = express.Router()
// const saltRounds = 10 /* With "salt round" they actually mean the cost factor. The cost factor controls how much time is needed to calculate a single BCrypt hash. The higher the cost factor, the more hashing rounds are done. Increasing the cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult is brute-forcing.*/

router.post('/signup', async(req,res)=>{
    try{
    const {email, password, username} = req.body

    if(!email || !password || !username){
        return res.status(400).json({message: "Please provide all fields"})
    }
    /*Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character*/
     const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    
     if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8 characters long and contain one uppercase and one lowercase character, a number, and a special character.",
      })
    }
    const foundName = await User.findOne({ $or:[{email},{username}] })
    if (foundName){
        return res.status(409).json({message:"Name already exists"})
    }
    const salts = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salts)

    const createdUser = await User.create({
      email,
      username,
      password: hashedPassword,
    })

    res.status(201).json(createdUser)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }

})


// post login

router.post('/login', async (req,res)=>{
  try{
    const {email,password,username} = req.body

    if((!email && !username) || !password){
      return res
      .status(400)
      .json({message: 'please provide email or username and password'})
    }

    const foundUser = await User.findOne({$or:[{email},{username}] })

    const passwordCheck = await bcrypt.compare(password, foundUser.password)

    if (!passwordCheck){
      return res.status(401).json({message: "Password incorrect" })
    }
    
    const token = await jwt.sign(
      {
        email: foundUser.email,
        username: foundUser.username,
        _id: foundUser._id,
      },
      process.env.TOKEN_SECRET,
      {algorithm: "HS256", expiresIn: "1h"},
    )

    res
      .status(200)
      .json({message: 'Logged in successfully', token, user: foundUser})
} catch(error){
  console.log(error)
  res.status(500).json(error)
}
})

router.get("/verify", isAuth, (req,res)=>{
  console.log(req.user)
  res.status(200).json({user:req.user})
})

export default router;

