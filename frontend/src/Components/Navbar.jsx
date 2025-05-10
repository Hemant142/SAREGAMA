import React, { useEffect, useState } from "react";
import { Input, InputGroup, InputLeftElement, Tooltip, useToast } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faHome } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { userlogout } from "../Redux/authReducer/action";
import {
  USER_FAIL,
  VALID_USER_LOGOUT_SUCCESS,
} from "../Redux/actionTypes";
export default function Navbar({setSow}) {
  const token = Cookies.get("login_token");
  const name=Cookies.get("login_name")
 
  const [SearchPrarams,setSeachParams]=useSearchParams();
  let initialSearch= SearchPrarams.get("q")
const [q,setQuery] = useState(initialSearch||"")

const handleSearch=(e)=>{
  setQuery(e.target.value)  
   
}

useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    let queryParam = {};
    if (q) queryParam.q = q;
    setSeachParams(queryParam);
  }, 500); // Adjust debounce time (500ms is a good choice)

  return () => clearTimeout(delayDebounceFn); // Cleanup previous timeout
}, [q, setSeachParams]);

  const toast = useToast();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userlogout(token)).then((res) => {
  
      dispatch({ type: VALID_USER_LOGOUT_SUCCESS });
      if (res.data.msg === "User has been loggged out") {
        toast({
          title: `Logged Out Successfully!!`,
          position: "bottom",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        Cookies.remove("login_token");
        Cookies.remove("login_email");
        Cookies.remove("login_name");
        Cookies.remove("login_role");
        Cookies.remove("login_avatar");
        window.location.reload();
      } else {
        toast({
          title: `Something Went Wrong, Try again!!`,
          position: "bottom",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }).catch((err) => {
      dispatch({ type: USER_FAIL });
      toast({
        title: `Something Went Wrong, Try again!!`,
        position: "bottom",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <div
    style={{
      display: "flex",
      alignItems: "center",
      height: "70px",
      backgroundColor: "#2C2C2C",
      width: "100%",
    }}
    >


        {/* Home Icon (visible on mobile) */}
        <div style={{ display: "none", marginRight: "10px" }}>
        <Link to="/">
          <FontAwesomeIcon icon={faHome} size="lg" color="white" />
        </Link>
      </div>
     
      <InputGroup style={{ marginLeft: "10px", flexGrow: 1 }}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.600" />}
          style={{ marginTop: "7px" }}
        />
        <Input value={q}  onChange={handleSearch}
          style={{
            width: "100%",
            borderRadius: "30px",
            height: "50px",
            border: "none",
            paddingLeft: "35px",
            color: "#H8H8H8",
            fontSize: "17px",
          }}
          type="text"
          placeholder="what you want to listen"
        />
      </InputGroup>

        {/* Profile Icon (visible on mobile) */}
        <div style={{ display: "none", marginLeft: "10px"  }}>
        <FontAwesomeIcon icon={faUserCircle} size="lg" color="white" />
      </div>
      {!token?(// If not logged in
        <div style={{ display: "flex" }}>
      <div style={{ display: "flex", margin: "10px" }}>
        <a
          style={{
            textDecoration: "none",
            color: "#969696",
            fontSize: "18px",
            margin: "5px",
          }}
          href=""
        >
          Premium
        </a>
        <a
          style={{
            textDecoration: "none",
            color: "#969696",
            fontSize: "18px",
            margin: "5px",
          }}
          href=""
        >
          Support
        </a>
        <a
          style={{
            textDecoration: "none",
            color: "#969696",
            fontSize: "18px",
            margin: "5px",
          }}
          href=""
        >
          Download
        </a>
      </div>


     <button
        style={{
          width: "100px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "30px",
          height: "50px",
          border: "none",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      > <Link to={"/signup"}>
        Sign Up
        </Link>
      </button>
      

      <button
        style={{
          width: "100px",
          backgroundColor: "white",
          color: "black",
          borderRadius: "30px",
          marginLeft: "10px",
          marginRight: "25px",
          height: "50px",
          border: "none",
          fontWeight: "bold",
        }}
      >
        <Link to={"/login"}>
        Log in
        </Link>
      </button>
      </div>):(
      // If logged in

      <div style={{ display: "flex", marginLeft: "10px", gap:"10px" }}>
       <Link to={"/songs"}>   <button 

        style={{
          width: "100px",
          backgroundColor: "white",
          color: "black",
          borderRadius: "30px",
          height: "50px",
          border: "none",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Songs
      </button></Link> 
      <Link to={"/myfavorite"}>
   <button
    // onClick={()=>setSow(true)}
        style={{
          width: "100px",
          backgroundColor: "white",
          color: "black",
          borderRadius: "30px",
          height: "50px",
          border: "none",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Liked Song
      </button>
      </Link>

      <button
        style={{
          width: "100px",
          color: "white",
          borderRadius: "30px",
          marginLeft: "10px",
          marginRight: "25px",
          height: "50px",
          border: "none",
          fontWeight: "bold",
        }}
        onClick={handleLogout}
      >
        <Tooltip label={name}>
        <FontAwesomeIcon icon={faUserCircle} size="lg" color="white" />
        </Tooltip>
      </button>
    </div>
      )}
      
    </div>
  );
}
