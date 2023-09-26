import React from 'react'
import { Flex, Spacer } from '@chakra-ui/react'

export default function Sidebar() {
  return (
    <div style={{display:"flex", flexDirection:"column", width:"23%", backgroundColor:"#2C2C2C"}}>
      

      <div style={{display:"flex", flexDirection:"column", backgroundColor:"black", borderRadius:"6px",margin:"5px"}}>
      <img style={{width:"200px", height:"50px"}} src="https://i.ytimg.com/vi/704PL_KSLPY/maxresdefault.jpg" alt="" />
      <div style={{display:"flex", alignItems:"center",marginBottom:"0px" ,height:"50px"}}>
        <img style={{width:"25px",height:"25px",marginLeft:"28px"}} src="homeicon.png" alt="home" />
        <h3 style={{color:"#787878",marginLeft:"17px"}}>HOME</h3>
      </div>

      <div style={{display:"flex", alignItems:"center",marginTop:"0px",height:"50px" }}>
        <img style={{width:"25px",height:"25px",marginLeft:"28px"}} src="searchicon.png" alt="search" />
        <h3 style={{color:"#F1F1F1",marginLeft:"17px"}}>Search</h3>
      </div>
      </div>
     

      <div style={{display:"flex", flexDirection:"column",backgroundColor:"black", borderRadius:"6px",margin:"5px"}}>
      <div style={{display:"flex", alignItems:"center",marginTop:"0px",height:"50px" }}>
        <img style={{width:"25px",height:"25px",marginLeft:"28px"}} src="libraryicon.png" alt="search" />
        <h3 style={{color:"#787878",marginLeft:"17px"}}>Your Library</h3>
      </div>

      <div style={{display:"flex", flexDirection:"column",backgroundColor:"gray", borderRadius:"6px",margin:"20px"}}>
        <h3 style={{color:"white", height:"30px"}}>Create your first playlist</h3>
        <h4 style={{color:"white", height:"30px", margin:"3px"}}>It's easy we will help you</h4>
        <button style={{width:"200px", borderRadius:"15px", backgroundColor:"white", border:"none", margin:"20px", color:"black", fontWeight:"bold", padding:"5px", fontSize:"17px",marginLeft:"50px"}}>Create Playlist</button>
      </div>


      <div style={{backgroundColor:"black", borderRadius:"6px",margin:"auto", height:"140px",paddingTop:"50px" }}>
         <a style={{textDecoration:"none", color:"#787878", marginLeft:"10px"}} href="">Legal</a>
         <a style={{textDecoration:"none", color:"#787878",marginLeft:"10px"}} href="">Privacy Center</a>
         <a style={{textDecoration:"none", color:"#787878",marginLeft:"10px"}} href="">Privacy Policy</a>
         <a style={{textDecoration:"none", color:"#787878",marginLeft:"10px"}} href="">Cookies</a>
         <a style={{textDecoration:"none", color:"#787878",marginLeft:"10px"}} href="">About App</a>
         <a style={{textDecoration:"none", color:"#787878",marginLeft:"10px"}} href="">Accessibilty</a>
         
         

      </div>
      </div>


      

    </div>
  )
}
