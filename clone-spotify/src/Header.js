import React from 'react'
import './Header.css'
import { MdOutlineSearch} from "react-icons/md";
import { useDataLayerValue} from "./DataLayer";
//import {Avatar} from "@mui/material";
function Header() {
    const [{user}, dispatch] = useDataLayerValue();
  return (
    <div className='header'>
      <div className='header__left'>
        <MdOutlineSearch/>
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </div>
      <div className='header__right'>
      <img 
        className='header__pic'
         src ={user?.images[0]?.url}
         alt= {user?.display_name}/>
       
        <h4>{user?.display_name}</h4>
      </div>

    </div>
  )
}

export default Header
