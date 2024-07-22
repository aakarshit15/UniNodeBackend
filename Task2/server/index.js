//Importing required packages
import express from "express";
import axios from "axios";

//Initializing constants
const app = express();
const port = 3000;
const api = "https://hp-api.onrender.com";

//GET all characters
app.get("/characters", async (req, res) => {
    try {
        const response = await axios.get(`${api}/api/characters`);
        res.status(200).json({reqSuccess: true, reqData: response.data});
    } catch (error) {
        console.error(`Error getting characters: ${error}`);
        res.status(400).json({reqSuccess: false, reqErrMsg: error});
    }
});

//GET all students
app.get("/characters/students", async (req, res) => {
    try {
        const response = await axios.get(`${api}/api/characters/students`);
        res.status(200).json({reqSuccess: true, reqData: response.data});
    } catch (error) {
        console.error(`Error getting characters students: ${error}`);
        res.status(400).json({reqSuccess: false, reqErrMsg: error});
    }
});

//GET all staff
app.get("/characters/staff", async (req, res) => {
    try {
        const response = await axios.get(`${api}/api/characters/staff`);
        res.status(200).json({reqSuccess: true, reqData: response.data});
    } catch (error) {
        console.error(`Error getting characters staff: ${error}`);
        res.status(400).json({reqSuccess: false, reqErrMsg: error});
    }
});

//GET all house
app.get("/characters/:house", async (req, res) => {
    try {
        const response = await axios.get(`${api}/api/characters/house/${req.params.house}`);
        res.status(200).json({reqSuccess: true, reqData: response.data});
    } catch (error) {
        console.error(`Error getting characters house: ${error}`);
        res.status(400).json({reqSuccess: false, reqErrMsg: error});
    }
});

//GET all characters by id
app.get("/character/:id", async (req, res) => {
    try {
        const response = await axios.get(`${api}/api/character/${req.params.id}`);
        res.status(200).json({reqSuccess: true, reqData: response.data});
    } catch (error) {
        console.error(`Error getting characters id: ${error}`);
        res.status(400).json({reqSuccess: false, reqErrMsg: error});
    }
});

//GET all spells
app.get("/spells", async (req, res) => {
    try {
        const response = await axios.get(`${api}/api/spells`);
        res.status(200).json({reqSuccess: true, reqData: response.data});
    } catch (error) {
        console.error(`Error getting spells: ${error}`);
        res.status(400).json({reqSuccess: false, reqErrMsg: error});
    }
});

//Listening on port 3000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});