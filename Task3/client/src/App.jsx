import { useEffect, useState } from 'react';
import Characters from './components/Characters'
import SearchBar from './components/SearchBar'
import axios from 'axios';

function App() {

  const [allCharacters, setAllCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);

  const sortingCriteria = (a, b) => {
    return a.name < b.name ? -1 : 1;
  }

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

  useEffect(() => {
    if (document.querySelector("#nameInput").value === "") {
      setCharacters(allCharacters.sort(sortingCriteria));
    }
  }, [characters, allCharacters])
  
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
