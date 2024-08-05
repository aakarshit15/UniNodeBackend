import { useEffect, useState } from 'react';
import Characters from './components/Characters'
import SearchBar from './components/SearchBar'
import axios from 'axios';

function App() {

  // useState hook for characters from server
  const [allCharacters, setAllCharacters] = useState([]);

  // useState hook for characters to display
  const [characters, setCharacters] = useState([]);

  // sorting based on alphabetical orders of names
  const sortingCriteria = (a, b) => {
    return a.name < b.name ? -1 : 1;
  }

  // useEffect hokk to fetch data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/students");
        if(response.data.reqSuccess) {
          setAllCharacters(response.data.students);
        } else {
          console.log("Error fetching data!!!");
        }
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }

    fetchData();
  }, [])

  // useEffect hook for sorting characters from api and displaying it
  useEffect(() => {
    if (document.querySelector("#nameInput").value === "") {
      setCharacters(allCharacters.sort(sortingCriteria));
    }
  }, [characters, allCharacters])
  
  // handling change in search bar
  const handleChange = async (event) => {
    const searchedName = event.target.value
    let chars = []
    allCharacters.forEach((character) => {
      if(searchedName.toLowerCase() === character.name.slice(0, searchedName.length).toLowerCase()) {
        chars.push(character);
      }
    })
    chars.sort(sortingCriteria);
    setCharacters(chars);
  }

  return (
    <>
      <SearchBar handleChange={handleChange} />
      <Characters characters={characters} />
    </>
  )
}

export default App
