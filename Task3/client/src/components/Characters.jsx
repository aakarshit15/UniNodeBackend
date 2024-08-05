import React, { useEffect } from 'react'
import CharacterCards from './CharacterCards'

const Characters = (props) => {

//   useEffect(() => {
//     console.log(props.characters);
//   }, [props.characters]);

  return (
    <>
        <div className="characters container mt-3">
            <CharacterCards characters={props.characters} />
        </div>
    </>
  )
}

export default Characters
