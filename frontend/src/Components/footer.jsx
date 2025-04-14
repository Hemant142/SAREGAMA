import React from 'react'
import { Flex } from '@chakra-ui/react'
import "../Pages/css/home.css"
import "../Pages/css/navi.css"
export default function Footer() {
  return (
  <div id='footer'>
 <Flex style={{ color:"white", justifyContent:"space-around", padding:"26px",backgroundColor:"black"}}>
     <Flex direction={"column"}>
          <h5 style={{fontWeight:"bold"}}>Company</h5>
          <p>About</p>
          <p>Jobs</p>
          <p>For the Record</p>


          </Flex>



          <Flex className='footer-com' direction={"column"}>
          <h5 style={{fontWeight:"bold"}}>Communities</h5>
          <p>For Artists</p>
          <p>Developers</p>
          <p>Advertising</p>
          <p>Investors</p>
          <p>Vendors</p>


          </Flex>   


          <Flex className='footer-com' direction={"column"}>
          <h5 style={{fontWeight:"bold"}}>Support</h5>
          <p>Free Mobile App</p>
          


          </Flex> 

          <Flex style={{justifyContent:"space-around", width:"13%"}}>
            <img style={{width:"35px", borderRadius:"50%",height:"35px"}} src="https://cdn.mos.cms.futurecdn.net/z3bn6deaxmrjmQHNEkpcZE.jpg" alt="" />

            <img style={{width:"35px", borderRadius:"50%",height:"35px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJNu5L51jR5WCNaVVMC-2vVvECpdp5axXpELDafKg&s" alt="" />

            <img style={{width:"35px",height:"35px", borderRadius:"50%"}} src="https://cdn.mos.cms.futurecdn.net/6dDoc8GV9fYUPExgLYPqqT.jpg" alt="" />
            
            </Flex> 

    </Flex >


    <Flex style={{backgroundColor:"black", color:"white", justifyContent:"space-around", padding:"26px",borderTop:"1px solid "}}>
    <a style={{textDecoration:"none", color:"#787878", marginLeft:"0px"}} href="">Legal</a>
         <a style={{textDecoration:"none", color:"#787878",marginLeft:"10px"}} href="">Privacy Center</a>
         <a style={{textDecoration:"none", color:"#787878",marginLeft:"10px"}} href="">Privacy Policy</a>
         <a style={{textDecoration:"none", color:"#787878",marginLeft:"10px"}} href="">Cookies</a>
         <a style={{textDecoration:"none", color:"#787878",marginLeft:"10px"}} href="">About App</a>
         <a style={{textDecoration:"none", color:"#787878",marginLeft:"10px"}} href="">Accessibilty</a>
         
    </Flex>
  </div>
   


      

    
  )
}