import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import { User } from './models/userSchema.js';
import bcrypt from 'bcryptjs';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

try{
    await mongoose.connect('mongodb://localhost:27017/phantomchain/users');
    console.log("Connected to MongoDB");
}
catch(error){
    console.log("Error connecting to MongoDB:", error);
    alert("Error connecting to MongoDB:", error);
}

app.get('/api/health', (req, res) => {
    res.send('Hello World!');
});


//Signup Route
app.post('/api/signup', async(req,res)=>{
    const {name, email , password, userphoto} = req.body;
    if (password.length < 6 || password.length > 10) {
        return res.status(400).json({ errors: ['Password must be between 6 and 10 characters long'] });
    }

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({errors: ['User with email already exists']});
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hashedPassword(password, saltRounds);

        const newUser = new User({name,email,hashedPassword,userphoto});
        await newUser.save();
        res.status(201).json({message: 'User created successfully', user:
            {name: newUser.name , email: newUser.email , password: hashedPassword , userphoto: newUser.userphoto}
        });
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ errors: messages });
        }
        res.status(500).json({ message: 'Something went wrong' });
    }

})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});