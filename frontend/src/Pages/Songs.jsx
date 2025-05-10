import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Footer from "../Components/footer";
import Dummy from "../Components/dummy";
import Add from "../Components/signupad";
import Browser from "../Components/browser";
import { useBreakpointValue } from "@chakra-ui/react";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./Songs.css";
import Player from "./Player";
import Cookies from "js-cookie";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddFavoriteSong,
  DeletFavoriteSong,
  fetchSongs,
  GetAllFavoriteSong,
} from "../Redux/FavoriteSongReducer/Type";
import Loader from "../Components/Loader";

export default function Songs() {
  const token = Cookies.get("login_token");
  const [query, setQuery] = useState("");
  // const [songs, setSongs] = useState([]);
  const [hoveredSong, setHoveredSong] = useState(null);
  const [liked, setLiked] = useState(false);
  const [SearchPrarams, setSeachParams] = useSearchParams();
  const [toggle, setToggle] = useState(false);
  const [likedSongs, setLikedSongs] = useState(
    JSON.parse(localStorage.getItem("likedSongs")) || []
  );
  const location = useLocation();
  const toast = useToast();
  const dispatch = useDispatch();
  const { FavoriteSongData } = useSelector(
    (state) => state.FavoriteSongReducer
  );

  const [index, setIndex] = useState(0);
  const songs=useSelector(state=>state.FavoriteSongReducer.songs)

  // console.log({index,songs})
  // let URL = `https://worried-colt-train.cyclic.app/songs/`;

  // const fetchSongs = (query) => {
  //   axios
  //     .get(URL, query)
  //     .then((res) => setSongs(res.data.data))
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // };
  useEffect(()=>{
    let paramObj = {
      params: {
        q: SearchPrarams.get("q")==null?"":SearchPrarams.get("q"),
      },
    };
    
    dispatch(fetchSongs(paramObj,token));
    dispatch(GetAllFavoriteSong(paramObj,token))
  },[token,location])

  // useEffect(() => {
  //   let paramObj = {
  //     params: {
  //       q: SearchPrarams.get("q"),
  //     },
  //   };
  //   fetchSongs(paramObj);
  // }, [location]);

  // const toggleLike = () => {
  //   setLiked(!liked);
  // };

  // artist: "Diljit Dosanjh";
  //  audio: "https://cdnsongs.com/music/data/Punjabi/202108/MoonChild_Era/128/Lover.mp3";
  //  avatar: "https://www.pagalworld.pw/GpE34Kg9Gq/113515/145952-lover-diljit-dosanjh-mp3-song-300.jpg";
  //  genre: "Indian POP";
  // id: 4;
  //  language: "Panjabi";
  //  title: "LOVER";
  // _id: "651a75e120a97f3e7bd3c462";
  const handleAddToFavorite = (item) => {
    setToggle(!toggle);
    let SongDetails = {
      title: item.title,
      avatar: item.avatar,
      audio: item.audio,
      genre: item.genre,
      artist: item.artist,
      language: item.language,
      songId: item._id,
    };
    console.log(item);
    let bag = true;
    if (Array.isArray(FavoriteSongData)) {
      for (let el of FavoriteSongData) {
        if (el.songId === item._id) {
          bag = false;
        }
      }
    }

    if (bag) {
      dispatch(AddFavoriteSong(SongDetails,token)).then((res) => {
        dispatch(GetAllFavoriteSong('te',token));

        toast({
          title: `You like this song`,
          position: "bottom",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
      // Add the song ID to the likedSongs array in localStorage
      localStorage.setItem(
        "likedSongs",
        JSON.stringify([...likedSongs, item._id])
      );
    } else {
      dispatch(DeletFavoriteSong(item._id,token)).then((res) => {
        console.log({ res });
        dispatch(GetAllFavoriteSong("t",token));
        toast({
          title: `You dislike this song`,
          position: "bottom",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });

      // Remove the song ID from the likedSongs array in localStorage
      localStorage.setItem(
        "likedSongs",
        JSON.stringify(likedSongs.filter((songId) => songId !== item._id))
      );
    }
  };

  // console.log(likedSongs)
  useEffect(() => {
    const localLikedSongs =
      JSON.parse(localStorage.getItem("likedSongs")) || [];
    setLikedSongs(localLikedSongs);
  }, [toggle]);

  // console.log(likedSongs)
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 4, xl: 4 });

  return (
    <>
      <div>
        <div style={{ display: "flex", width: "100%",height:"100%" ,backgroundColor:"#0000009b;" }}>
          <div id="sidebar" style={{ height: "100%" }}>
            <Sidebar />
          </div>


          <div
            style={{
               left: "23%",
              width: "77%",
              position: "fixed",
              zIndex: "2",
             
            }}
          >
            <Navbar />
          </div>
          {/* <=====================Display data====================> */}
          <Box
            marginLeft={"23%"}
            marginTop={"70px"}
            padding={"5px"}
            backgroundColor={"#2C2C2C"}
            zIndex={"0"}
          
            id="songs"
          >
            <SimpleGrid columns={columns} spacing={10}>
              {songs.length > 0 ? (
                songs.map((ele, index) => (
                  <Box className="hover" marginBottom={2}>
                    <Box
                      backgroundColor={"black"}
                      color={"white"}
                      // marginBottom={2}
                      borderRadius={"10px"}
                      height={280}
                    >
                      <Image
                        src={ele.avatar}
                        alt={ele.title}
                        borderTopRadius={"10px"}
                        width={"100%"}
                        height={200}
                      />

                      <Heading size={"md"} paddingLeft={2}>
                        {ele.title}
                      </Heading>
                      <Text paddingLeft={2}>{ele.artist}</Text>
                    </Box>

                    <Box >
                      <Button
                        className="hover-button"
                        borderRadius={"50%"}
                        display={"none"}
                        marginTop={"-150px"}
                        marginLeft={"150px"}
                        position={"absolute"}
                        backgroundColor="green"
                        color={"black"}
                        onClick={() => setIndex(index)}
                      >
                        <FontAwesomeIcon icon={faPlay} />
                      </Button>
                      <button
                        className={`like-button `}
                        // borderRadius={"50%"}
                        
                        // display={"none"}

                        // color={"white"}
                        onClick={() => handleAddToFavorite(ele)}
                      >
                        {/* <FontAwesomeIcon
                        border={"2px solid red"}
                          icon={faHeart}
                          className={`like-icon ${
                            likedSongs.includes(ele._id) ? "liked" : ""
                          }`}
                        /> */}
                        <FontAwesomeIcon
  icon={faHeart}
  className={`like-icon ${
    FavoriteSongData.some((fav)=>fav.songId==ele._id) ? "liked" : "unliked"
  }`}
  style={{
    color: FavoriteSongData.some((fav)=>fav.songId==ele._id) ? "red" : "white",
 
  }}
/>

                        {/* Like */}
                      </button>
                    </Box>
                  </Box>
                ))
              ) : (

                <Box width={1100}>
                  {" "}
                  <div className="loader">
                    <Loader />
                  </div>
                  :
                </Box>

              )}
            </SimpleGrid>
          </Box>
        </div>

        <Footer />
        <div style={{ position: "fixed", bottom: 0,width: "100%", backgroundColor:"#0000009b;" }}>
          {token ? (
            <Player index={index} songs={songs} />
          ) : (
            // ""
            <Add />
          )}
        </div>
      </div>
    </>
  );
}
