import express from 'express';
import RegistrationModel from '../models/registrationModel.js';

const router = express.Router();

export const createStudent = async (req,res) => {
    
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const days = req.body.days;
    const swimmingStyle = req.body.swimmingStyle;
    const lessonType = req.body.lessonType;

    const newRegistration = new RegistrationModel({
        firstName,
        lastName,
        days,
        swimmingStyle,
        lessonType,
    });

    try {
        await newRegistration.save();

        res.status(201).json(newRegistration);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export default router;