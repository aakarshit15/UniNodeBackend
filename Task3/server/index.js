import express from "express";
import mongoose from "mongoose";
import Student from "./StudentModel.js";
import wood from "./wood.js";
import core from "./core.js";
import patronus from "./patronus.js";
import house from "./house.js";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";

env.config();

mongoose.connect(process.env.MONGO_DB_SERVER);

const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(bodyParser.urlencoded({extended: true}));

// Get all students
app.get("/students", async (req, res) => {
    try {
        const studentDetails = await Student.find();
        res.status(200).json({reqSuccess: true, students: studentDetails});
    } catch (error) {
        console.error(`Error querying data: ${error}`);
        res.status(500).json({reqSuccess: false, reqErrMsg: error});
    }
});

// Get a student
app.get("/student/:id", async (req, res) => {
    try {
        const student = await Student.find({_id: req.params.id});
        res.status(200).json({reqSuccess: true, student: student});
    } catch (error) {
        console.error(`Error searching student: ${error}`);
        res.status(500).json({reqSuccess: false, reqErrMsg: error});
    }
});

// Create a student
app.post("/student", async (req, res) => {
    try {
        const studentDetails = {
            ...req.body,
            house: house[Math.floor(Math.random() * house.length)],
            wand: {
                wood: wood[Math.floor(Math.random() * wood.length)],
                core: core[Math.floor(Math.random() * core.length)],
                length: Math.floor((Math.random() * 17) + 8)
            },
            patronus: patronus[Math.floor(Math.random() * patronus.length)]
        }
        const newStudent = new Student(studentDetails);
        newStudent.save();
        res.status(201).json({reqSuccess: true});
    } catch (error) {
        console.error(`Error inserting data: ${error}`);
        res.status(500).json({reqSuccess: false, reqErrMsg: error});
    }
});

// Update a student
app.patch("/student/:id", async (req, res) => {
    try {
        let newStudentData = {};
        for(const [key, value] of Object.entries(req.body)) {
            newStudentData = {...newStudentData, [key]: value};
        }
        await Student.updateOne({_id: req.params.id}, newStudentData);
        res.status(201).json({reqSuccess: true});
    } catch (error) {
        console.error(`Error updating data: ${error}`);
        res.status(500).json({reqSuccess: false, reqErrMsg: error});
    }
});

// Delete a student
app.delete("/student/:id", async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({_id: req.params.id});
        res.status(200).json({reqSuccess: true, student: student});
    } catch (error) {
        console.error(`Error deleting student: ${error}`);
        res.status(500).json({reqSuccess: false, reqErrMsg: error});
    }
});

// 404 Error
app.all("*", (req, res) => {
    res.status(404).send("<h1>404 Error</h1><h2>Page not found.</h2>")
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});