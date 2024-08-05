import React from 'react'
import CharacterCard from './CharacterCard'

const CharacterCards = (props) => {
  return (
    <>
        <div className="characterCards row gap-5 justify-content-center">
            {
                props.characters.map((character) => {
                    return(<CharacterCard key={character._id} character={character} />)
                })
            }
        </div>
    </>
  )
}

export default CharacterCards
