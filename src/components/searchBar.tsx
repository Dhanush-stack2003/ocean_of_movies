import React, {useRef, useState} from 'react'
import './searchBar.css'
import { useNavigate,useSearchParams } from 'react-router-dom'

const SearchBar = () => {
const [,setSearchParams] = useSearchParams()
const navigate = useNavigate();
const searchRef = useRef<HTMLInputElement>(null);
const [type,setType] = useState<string>('');
const [year,setYear] = useState<string>('');

const searchHandler = (e:React.FormEvent | React.KeyboardEvent) => {
e.preventDefault();
const query = searchRef.current?.value || '';
setSearchParams({query,year,type})
navigate(`/result?query=${query}&year=${year}&type=${type}`)
}

return (
<div className='searchbar'>

   <h1>Welcome to ocean of movies</h1>
   
   <div className='searchbar_input'>
   <input
    type='text'
    placeholder='type movie name...'
    ref={searchRef}
    onKeyDown={(e) => e.key === 'Enter' && searchHandler(e)}
   />
    <button onClick={searchHandler}>Search</button>
   </div>

   <div className="filter_section">
   <select value={type} onChange={(e)=>setType(e.target.value)}>
    <option value=''>choose type</option>
    <option value='movie'>Movie</option>
    <option value='series'>Series</option>
   </select>
   <select value={year} onChange={(e)=>setYear(e.target.value)}>
    <option value=''>choose year</option>
   {[...Array(2025 - 1950)].map((_,i)=>{
     let year = 1950 + i;
    return <option key={year} value={year}>{year}</option>
   })}
    </select>
   </div>

   </div>
 )
}

export default SearchBar