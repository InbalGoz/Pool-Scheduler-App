import express from 'express';
import ClassesModel from '../models/classesModel.js';

const router = express.Router();

export const getClasses = async (req,res) => {
    try {
        const classes = await ClassesModel.find();

        res.status(201).json(classes);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const sendClasses =  (req, res) => {
    //const { startDate, endDate, title, classType, color } = req.body;

    //const newClasses = new ClassesModel({ startDate, endDate, title, classType, color   })

    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const title = req.body.title;
    const classType = req.body.classType;
    const startcolorDate = req.body.color;

    const newClasses = new ClassesModel({
        startDate,
        endDate,
        title,
        classType,
        startcolorDate,
    });

    try {
        console.log('post')
        newClasses.save();

        res.status(201).json(newClasses );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export default router;