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

app.get("/students", async (req, res) => {
    try {
        const studentDetails = await Student.find();
        res.json({reqSuccess: true, students: studentDetails});
    } catch (error) {
        console.error(`Error querying data: ${error}`);
        res.json({reqSuccess: false, reqErrMsg: error});
    }
});

app.get("/student/:id", async (req, res) => {
    try {
        const student = await Student.find({_id: req.params.id});
        res.json({reqSuccess: true, student: student});
    } catch (error) {
        console.error(`Error searching student: ${error}`);
        res.json({reqSuccess: false, reqErrMsg: error});
    }
});

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
        res.json({reqSuccess: true});
    } catch (error) {
        console.error(`Error inserting data: ${error}`);
        res.json({reqSuccess: false, reqErrMsg: error});
    }
});

app.patch("/student/:id", async (req, res) => {
    try {
        let newStudentData = {};
        for(const [key, value] of Object.entries(req.body)) {
            newStudentData = {...newStudentData, [key]: value};
        }
        await Student.updateOne({_id: req.params.id}, newStudentData);
        res.json({reqSuccess: true});
    } catch (error) {
        console.error(`Error updating data: ${error}`);
        res.json({reqSuccess: false, reqErrMsg: error});
    }
});

app.delete("/student/:id", async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({_id: req.params.id});
        res.json({reqSuccess: true, student: student});
    } catch (error) {
        console.error(`Error deleting student: ${error}`);
        res.json({reqSuccess: false, reqErrMsg: error});
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});