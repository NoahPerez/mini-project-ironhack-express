import {Schema,model} from 'mongoose';

const UserSchema = new Schema ({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
     username:{
        type: String,
        required:[true,"Username is required"],
        unique:true,
    }
})

const User = model('User', UserSchema)
export default User