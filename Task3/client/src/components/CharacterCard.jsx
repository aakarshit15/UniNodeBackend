import React, { useEffect, useState } from 'react'

const CharacterCard = (props) => {

    // useState for DOB
    const[DOB, setDOB] = useState("")

    // adding zeros in dates
    // Eg: 7/5/2024 => 07/05/2024
    const addZero = (dataItem) => {
        return (`${dataItem}`).length === 1 ? `0${dataItem}` : `${dataItem}`;
    }

    // converting timestamp to date
    const getFullDate = (dateStr) => {
        const d = new Date(dateStr);
        const dDate = addZero(d.getDate());
        const dMonth = addZero(d.getMonth() + 1);
        const dYear = d.getFullYear();
        return `${dYear}-${dMonth}-${dDate}`
    }

    // useEffect hook to set DOB
    useEffect(() => {
        setDOB(getFullDate(props.character.DOB));
    }, [DOB])

  return (
    <>
        <div className="card col-12 col-md-6 col-lg-4 col-xl-3" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{props.character.name}</h5>
                <div className="card-text">
                <ul className="list-group">
                    <li className="list-group-item"><b>Gender:</b> {props.character.gender}</li>
                    <li className="list-group-item"><b>House:</b> {props.character.house}</li>
                    <li className="list-group-item"><b>DOB:</b> {DOB.split("-").reverse().join("-")}</li>
                    <ul className="list-group">
                        <b>Wand:</b>
                        <li className="list-group-item"><b>Core:</b> {props.character.wand.core}</li>
                        <li className="list-group-item"><b>Wood:</b> {props.character.wand.wood}</li>
                        <li className="list-group-item"><b>Length:</b> {props.character.wand.length}</li>
                    </ul>
                    <li className="list-group-item mt-2"><b>Patronus:</b> {props.character.patronus.length}</li>

                </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default CharacterCard
