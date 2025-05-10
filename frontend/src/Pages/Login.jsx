import React, { useEffect, useState } from "react";
import {
  Flex,
  Image,
  Box,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Button,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import login from "../Components/images/login_laptop.webp";
import login1 from "../Components/images/login_mobile.jpg";
import logo from "../Components/images/logo.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { USER_FAIL, USER_LOGIN_SUCCESS } from "../Redux/actionTypes";
import Cookies from "js-cookie";
import { userlogin } from "../Redux/authReducer/action";
import { Helmet } from "react-helmet";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../GoogleAuth/firebase-config";
import axios from "axios";
export default function Login() {
  const lock = <FontAwesomeIcon size="lg" icon={faLock} />;
  const google = <FontAwesomeIcon size="lg" icon={faGoogle} />;
  const facebook = <FontAwesomeIcon size="lg" icon={faFacebook} />;
  const envelope = <FontAwesomeIcon size="lg" icon={faEnvelope} />;
  const eye = <FontAwesomeIcon size="lg" icon={faEye} />;
  const closeye = <FontAwesomeIcon size="lg" icon={faEyeSlash} />;

  const [show, setShow] = useState(false);
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const toast = useToast();
  const token = Cookies.get("login_token");
  const name = Cookies.get("login_name");
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.authReducer.loading);
  const location = useLocation();

  const apiUrl = process.env.REACT_APP_SAREGAMA_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userlogin(formdata))
      .then((res) => {
        dispatch({ type: USER_LOGIN_SUCCESS });

        if (res.data.msg === "Login Successfull!") {
          setFormdata({ email: "", password: "" });
          Cookies.set("login_token", `${res.data.token}`, { expires: 7 });
          Cookies.set("login_name", `${res.data.existingUser.name}`, {
            expires: 7,
          });
          Cookies.set("login_email", `${res.data.existingUser.email}`, {
            expires: 7,
          });
          formdata.password === "admin"
            ? Cookies.set("login_role", "admin", { expires: 7 })
            : Cookies.set("login_role", "user", { expires: 7 });
          toast({
            title: `Welcome ${res.data.existingUser.name}`,
            position: "bottom",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setTimeout(() => {
            if (location.state === null) {
              navigate("/");
            } else {
              navigate(`${location.state}`, { replace: true });
            }
          }, 2000);
        } else if (res.data.error === "Invalid Password!") {
          toast({
            title: `${res.data.error}`,
            position: "bottom",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else if (res.data.error === "User Not Found!") {
          toast({
            title: `${res.data.error}`,
            position: "bottom",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: `Something Went Wrong, Try again!!`,
            status: "error",
            position: "bottom",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: USER_FAIL });
        toast({
          title: `Something Went Wrong, Try again!!`,
          status: "error",
          position: "bottom",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithRedirect(auth, provider); // triggers Google login redirect
  };

  // Call this after redirect completes
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const tokenId = await result.user.getIdToken();

          const response = await axios.post(`${apiUrl}/users/loginWithGoogle`, {
            tokenId,
          });

          if (response.status === 200 || response.status === 201) {
            Cookies.set("login_token", `${response.data.token}`, {
              expires: 7,
            });
            Cookies.set("login_name", `${response.data.user.name}`, {
              expires: 7,
            });
            Cookies.set("login_email", `${response.data.user.email}`, {
              expires: 7,
            });

            toast({
              title: `Welcome ${response.data.user.name}`,
              position: "bottom",
              status: "success",
              duration: 2000,
              isClosable: true,
            });

            setTimeout(() => {
              if (location.state === null) {
                navigate("/");
              } else {
                navigate(`${location.state}`, { replace: true });
              }
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Google login failed:", error.message);
        toast({
          title: "Login failed",
          description: "Please try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    handleRedirectResult();
  }, [navigate, location.state, toast]);

  // const loginWithGoogle = async () => {
  //   try {
  //     // Force the user to select an account every time
  //     const provider = new GoogleAuthProvider();
  //     provider.setCustomParameters({ prompt: "select_account" });

  //     const result = await signInWithPopup(auth, provider);
  //     const tokenId = await result.user.getIdToken(); // Get Google ID token

  //     const response = await axios.post(`${apiUrl}/users/loginWithGoogle`, {
  //       tokenId,
  //     });

  //     console.log(response, "response");
  //     if (response.status === 200 || response.status === 201) {
  //       Cookies.set("login_token", `${response.data.token}`, { expires: 7 });
  //       Cookies.set("login_name", `${response.data.user.name}`, {
  //         expires: 7,
  //       });
  //       Cookies.set("login_email", `${response.data.user.email}`, {
  //         expires: 7,
  //       });
  //       toast({
  //         title: `Welcome ${response.data.user.name}`,
  //         position: "bottom",
  //         status: "success",
  //         duration: 2000,
  //         isClosable: true,
  //       });
  //       setTimeout(() => {
  //         if (location.state === null) {
  //           navigate("/");
  //         } else {
  //           navigate(`${location.state}`, { replace: true });
  //         }
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.error("Google login failed:", error);
  //   }
  // };
  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      direction={{
        base: "column",
        sm: "column",
        md: "row",
        lg: "row",
        xl: "row",
      }}
    >
      <Helmet>
        <title>Login | Sa Re Ga Ma</title>
      </Helmet>
      <Box
        w={{ base: "100%", sm: "100%", md: "48%", lg: "48%", xl: "48%" }}
        height={{
          base: "210px",
          sm: "210px",
          md: "auto",
          lg: "auto",
          xl: "auto",
        }}
        backgroundImage={{
          base: login1,
          sm: login1,
          md: login,
          lg: login,
          xl: login,
        }}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      ></Box>
      <Box w={{ base: "100%", sm: "100%", md: "48%", lg: "48%", xl: "48%" }}>
        <Box
          w={{
            base: "290px",
            sm: "330px",
            md: "330px",
            lg: "330px",
            xl: "330px",
          }}
          m="auto"
          mt={{ base: "30px", sm: "50px", md: "70px", lg: "70px", xl: "70px" }}
          mb="70px"
        >
          {/* <Image w="50%" src={logo} alt="signup" /> */}
          <Text
            mt="25px"
            color="#7f07f7f5"
            fontWeight="bold"
            fontSize="27px"
            fontFamily="Franklin Gothic Medium"
          >
            Log in
          </Text>
          <Text>Log in to save and review your favorite recipes.</Text>
          <br />
          <form
            onSubmit={handleSubmit}
            className="animate__animated animate__fadeInUp"
          >
            <FormControl isRequired>
              <FormLabel>EMAIL</FormLabel>
              <InputGroup>
                <InputLeftElement
                  borderRadius="5px 0px 0px 5px"
                  color="white"
                  bg="#9750ddf5"
                >
                  {envelope}
                </InputLeftElement>
                <Input
                  value={formdata.email}
                  onChange={(e) =>
                    setFormdata({ ...formdata, email: e.target.value })
                  }
                  border="1px solid #b655e2fa"
                  bg="#f5f5f5"
                  _focus={{
                    border: "1px solid #b655e2fa",
                    boxShadow: "#b655e2fa 0px 3px 8px",
                    bg: "#fff",
                  }}
                  _hover={{ bg: "#fff" }}
                  type="email"
                  placeholder=" Enter Your Email"
                  required
                />
              </InputGroup>
              <br />

              <FormLabel>PASSWORD</FormLabel>
              <InputGroup>
                <InputLeftElement
                  borderRadius="5px 0px 0px 5px"
                  color="white"
                  bg="#7f07f7f5"
                >
                  {lock}
                </InputLeftElement>
                <InputRightElement
                  cursor="pointer"
                  onClick={() => setShow(!show)}
                  aria-label="Toggle password visibility"
                >
                  {show ? eye : closeye}
                </InputRightElement>
                <Input
                  value={formdata.password}
                  onChange={(e) =>
                    setFormdata({ ...formdata, password: e.target.value })
                  }
                  border="1px solid #b655e2fa"
                  bg="#f5f5f5"
                  _focus={{
                    border: "1px solid #b655e2fa",
                    boxShadow: "#b655e2fa 0px 3px 8px",
                    bg: "#fff",
                  }}
                  _hover={{ bg: "#fff" }}
                  type={show ? "text" : "password"}
                  placeholder=" Enter Your Password"
                  required
                />
              </InputGroup>
              <Text
                m="5px 0px 15px 0px"
                textAlign="right"
                fontSize="14px"
                fontWeight="semibold"
                _hover={{ cursor: "pointer", textDecoration: "underline" }}
                color="#7f07f7f5"
                onClick={() => navigate("/forgot_password")}
              >
                Forgot Password?
              </Text>

              {loading ? (
                <Button
                  isLoading
                  w="100%"
                  color="white"
                  bg="#7f07f7f5"
                  _hover={{ bg: "#7f07f7f5" }}
                ></Button>
              ) : (
                <button type="submit" className="custom-btn btn-7">
                  <span>Log in...</span>
                </button>
              )}

              <Text textAlign="center" mt="10px">
                New User?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  style={{
                    color: "#7f07f7f5",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Create Account
                </span>
              </Text>
              <br />

              <Flex
                w="100%"
                fontSize="13px"
                justifyContent="space-between"
                gap="18px"
                alignItems="center"
              >
                <span
                  style={{
                    display: "block",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "rgb(219, 219, 219)",
                  }}
                ></span>
                <span>OR</span>
                <span
                  style={{
                    display: "block",
                    width: "100%",
                    height: "1px",
                    backgroundColor: "rgb(219, 219, 219)",
                  }}
                ></span>
              </Flex>
              <br />

              <Button
                leftIcon={google}
                bg="#4285F4"
                color="white"
                w="100%"
                border="2px solid #4285F4"
                _hover={{
                  bg: "transparent",
                  color: "#4285F4",
                }}
                _focus={{ boxShadow: "none" }}
                onClick={loginWithGoogle}
              >
                Log in with Google
              </Button>
              <Button
                leftIcon={facebook}
                mt="6px"
                w="100%"
                bg="#3B5998"
                _hover={{ bg: "#3B5998" }}
                color="white"
              >
                Log in with Facebook
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}
