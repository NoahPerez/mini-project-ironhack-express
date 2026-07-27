import {Schema, model} from 'mongoose'

const StudentsSchema = new Schema(
    {
        firstName: 
        {type: String, required: true},
        lastName:
        {type: String, required: true, },
        email:
        {type: String,required: true, unique: true},
        phone:
        {type: String, required: true},
        linkedInURl: 
        {type:String, default: false},
        languages:
        {type:[String],
            enum:["English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other"]
         },
        program:
        {   type:[String],
            enum:["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"]
        },
        background:
        {type:String, default: ''},
        image:
        {type:String, default: "https://i.imgur.com/r8bo8u7.png"},
        cohort: 
        {type: Schema.Types.ObjectId, ref: "_id"}

    }
)
const Student = model('Student', StudentsSchema)
export default Student
