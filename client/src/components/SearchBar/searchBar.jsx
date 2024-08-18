import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
   const navigate = useNavigate();
   const [searchTerm, setSearchTerm] = useState('');
   const handleSearch =  async () => {
      if(searchTerm){
         navigate({
            pathname: '/bookSearch',
            search: `q=${searchTerm}`,
            })
      }

   }

   return (
      <div className="navbar-search">
        <input
          type="text"
          style={{ width: "250px" }}
          placeholder="Search for books..."
          className="search-input"
          value= {searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
   )
}

export default SearchBar;