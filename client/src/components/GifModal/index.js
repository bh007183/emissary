import React, {useEffect, useState} from 'react'
import axios from "axios"
import "./style.css"



export default function GifModal() {
    const [search, setSearch] = useState(null)
    const [results, setResults] = useState([])
  

   
    const handleChange = async (event) => {
        
        setSearch(event.target.value)
    }
    const handleSearch = async (event) => {
        let res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_APIKEY}&q=${search}&rating=pg`).catch(err => console.log(err))
        setResults(res.data.data)
        
    }

    const selectGif = (event) => {
        console.log(event.currentTarget.dataset.url)

    }
    return (
        <div id="GifModal">
            <div className="centerFlex">
            <div id="gifResult">
                {results.length ? results.map(gif => <img onClick={selectGif} data-url={gif.images.fixed_width.url} src={gif.images.fixed_width.url}></img>) : <></>}

            </div>
            </div>
            <div id="gifInputContain">
            <input onChange={handleChange} placeholder="Search Gif" id="gifInput"></input> <button onClick={handleSearch}>Enter</button>
            </div>
        </div>
    )
}
