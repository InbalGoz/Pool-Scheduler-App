import express from 'express';
import { createStudent } from '../controllers/registrationForm.js';
//import { deleteAll } from '../controllers/classes.js';

const router = express.Router();

router.post('/register', createStudent);

export default router;



/*
router.route('/register').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const days = req.body.days;
    const swimmingStyle = req.body.swimmingStyle;
    const lessonType = req.body.lessonType;

    const newRegistration = new Registration({
        firstName,
        lastName,
        days,
        swimmingStyle,
        lessonType,
    });

    newRegistration.save();
});*/