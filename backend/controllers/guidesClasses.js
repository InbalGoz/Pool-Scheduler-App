import express from 'express';
import GuidesClassesModel from '../models/guidesClassesModel.js';

const router = express.Router();

export const getClasses = async (req,res) => {
    try {
        const classes = await GuidesClassesModel.find();

        res.status(201).json(classes);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const sendClasses = async (req, res) => {
    //const { startDate, endDate, title, classType, color } = req.body;

    //const newClasses = new ClassesModel({ startDate, endDate, title, classType, color   })

    const name = req.body.name;
    const classType = req.body.classType;
    const swimmingStyle = req.body.swimmingStyle;
    const day = req.body.day;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const students = req.body.students;

    const newClasses = new GuidesClassesModel({
        name,
        classType,
        swimmingStyle,
        day,
        startTime,
        endTime,
        students,
    });

    try {
        await newClasses.save();

        res.status(201).json(newClasses);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;