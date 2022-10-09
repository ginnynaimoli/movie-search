import './App.css'
import { useEffect, useState } from 'react'
import SearchIcon from './search.svg'
import MovieCards from './MovieCards'

function App() {
  const [ movies, setMovies ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')

  const searchMovies = async (title) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}&s=${title}`)
      const data = await response.json()
      setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, [])

  return (
      <div className='app'>
        <h1>MovieLand</h1>
        <div className='search'>
          <input placeholder='Search for movies'
                value={searchTerm}
                onChange={(e)=>{setSearchTerm(e.target.value)}}
          />
          <img src={SearchIcon} alt='search' 
              onClick={() => {searchMovies(searchTerm)}}/>
        </div>
        
        {
          movies?.length > 0
            ? (
              <div className='container'>
                {movies.map((movie, index) => (
                  <MovieCards key={index} movie={movie}/>
                ))}
              </div>
            ) : (
              <div className='empty'>
                <h2>No movies found</h2>
              </div>
            )
        }        
      </div>
  )
}

export default App;
