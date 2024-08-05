import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: String,
    gender: String,
    DOB: Date,
    house: String,
    wand: {
        wood: String,
        core: String,
        length: Number
    },
    patronus: String
});

const Student = mongoose.model("Student", studentSchema);

export default Student;

/*
    Student Schema ------------------------->

    {
        id: OID,
        name:
        gender:
        DOB:
        house:
        wand: {
            wood:
            core:
            length:
        }
        patronus:
    }

*/