import React from 'react'
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
   Alert,
   AlertIcon,
   AlertTitle,
   AlertDescription,
   SimpleGrid,
   Flex,
   Box,
   Button,
   Icon,
   Image

 } from '@chakra-ui/react'


export default function Dummy() {
  return (
    
<Box  marginLeft={"23%"} marginTop={"70px"} padding={"5px"} backgroundColor={"#2C2C2C"}>
   
    <Box backgroundColor={"black"} borderRadius={"5px"} padding={"5px"}>
    <p style={{marginLeft:"50px", marginTop:"10px", fontFamily:"monospace", fontSize:"30px", fontWeight:"bolder", color:"white"}}>Spotify Playlist's</p>
<Flex
  marginTop={"50px"}
  justifyContent={"space-around"}

 >
 <Box width={"170px"}  height={"270px"} backgroundColor={"#2C2C2C"} color={"white"} borderRadius={"4px"} marginLeft={"20px"}>
     <Image
       className="hover-zoom"
       bg={"#f5f6f6"}
         borderTopRadius={"4px"}
         src='https://i.scdn.co/image/ab67616d0000b27354e544672baa16145d67612b'
        //  width={"400px"}
        //  
       />
       <h2 style={{padding:"5px"}}>Today's Top Hits</h2>
       <h5 style={{padding:"5px"}}>mohit chouhan, ankit tiwari, palak</h5>

     </Box>

     <Box width={"170px"}  height={"270px"} backgroundColor={"#2C2C2C"} color={"white"} borderRadius={"4px"}>
     <Image
       className="hover-zoom"
       bg={"#f5f6f6"}
         borderTopRadius={"4px"}
         src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeIqwmo0Mm33mrIQLlhddwaJn8X1z3dpVmfw&usqp=CAU'
        //  width={"400px"}
        //  
       />
       <h2 style={{padding:"5px"}}>Top Hits</h2>
       <h5 style={{padding:"5px"}}>mohit chouhan</h5>

     </Box>

     <Box width={"170px"} height={"270px"} backgroundColor={"#2C2C2C"} color={"white"} borderRadius={"4px"}>
     <Image
       className="hover-zoom"
       bg={"#f5f6f6"}
         borderTopRadius={"4px"}
         src='https://cdns-images.dzcdn.net/images/cover/cdd05b8b504a37db5862b434e0300606/264x264.jpg'
        //  width={"400px"}
        //  
       />
       <h2 style={{padding:"5px"}}>All out 2020s</h2>
       <h5 style={{padding:"5px"}}>ankit tiwari, palak, arijit</h5>

     </Box>

     <Box width={"170px"}  height={"270px"} backgroundColor={"#2C2C2C"} color={"white"} borderRadius={"4px"}>
     <Image
       className="hover-zoom"
       bg={"#f5f6f6"}
         borderTopRadius={"4px"}
         src='https://cdns-images.dzcdn.net/images/artist/89599fb7a6ef3a9ce7e6b735b86f2233/500x500.jpg'
        //  width={"400px"}
        //  
       />
       <h2 style={{padding:"5px"}}>Chill Hits</h2>
       <h5 style={{padding:"5px"}}>Kick back to the best recent chill hits</h5>

     </Box>

     <Box width={"170px"} height={"270px"} backgroundColor={"#2C2C2C"} color={"white"} borderRadius={"4px"}>
     <Image
       className="hover-zoom"
       bg={"#f5f6f6"}
         borderTopRadius={"4px"}
         src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbQZxY6mD6Z4n1QkJPCQzGwXJWVExaAaYazw&usqp=CAU'
        //  width={"400px"}
        //  
       />
       <h2 style={{padding:"5px"}}>Viva latino</h2>
       <h5 style={{padding:"5px"}}>Today's top hit</h5>

     </Box>

 </Flex>


 <p style={{marginLeft:"50px", marginTop:"200px", fontFamily:"monospace", fontSize:"30px", fontWeight:"bolder", color:"white"}}>Sleep</p>
   

 <Flex
  marginTop={"50px"}
  justifyContent={"flex-start"}
  marginBottom={"70px"}
 >
 <Box width={"170px"}  height={"270px"} backgroundColor={"#2C2C2C"} color={"white"} borderRadius={"4px"} marginLeft={"50px"}>
     <Image
       className="hover-zoom"
       bg={"#f5f6f6"}
         borderTopRadius={"4px"}
         src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTVCl_W_fu2MwkoeacteIbMx5GJNxTPzcS-GKyJwjGCeTPEhzYvyHVCZ8lpyRM_Ocdz-U&usqp=CAU'
        //  width={"400px"}
        //  
       />
       <h2 style={{padding:"5px"}}>Sleep</h2>
       <h5 style={{padding:"5px"}}>Gentle ambient piano</h5>

     </Box>





     <Box width={"170px"}  height={"270px"} backgroundColor={"#2C2C2C"} color={"white"} borderRadius={"4px"} marginLeft={"50px"}>
     <Image
       className="hover-zoom"
       bg={"#f5f6f6"}
         borderTopRadius={"4px"}
         src='https://i.scdn.co/image/ab67616d00001e02ed13f27bdffafaffabef67d5'
        //  width={"400px"}
        //  
       />
       <h2 style={{padding:"5px"}}>DayDreamer</h2>
       <h5 style={{padding:"5px"}}>Drift away with instrumetals</h5>

     </Box>

    


   

 </Flex>
    </Box>
   
</Box>
  
   
 
     
       
       
     

   
  
   
  )
}