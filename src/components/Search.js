

import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = () => {          // for search to navigate the link(url)
        navigate('/search?keyword='+keyword)

    }

       
    return <div className="input-group">
      <input
        type="text"
        id="search_field"
        onChange={(e) => setKeyword(e.target.value)}  //for storing the user enter value
        className="form-control"
        onBlur={searchHandler}   // for seeing all products after seraching
        placeholder="Search ..."
      />
      <button onClick={searchHandler} id="search_btn" className="btn btn-primary">  
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
}