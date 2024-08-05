import React from 'react'

const SearchBar = (props) => {
  return (
    <>
        <div className="container mt-3">
            <form className="row justify-content-center">
                <input id="nameInput" onChange={(event) => props.handleChange(event)} type="text" name="name" className="col-10" placeholder="Type name" />
            </form>
        </div>
    </>
  )
}

export default SearchBar
