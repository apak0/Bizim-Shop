import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import {
  Badge,
  Box,
  Image,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

import { BiLogOut } from "react-icons/bi";

import { SlBasket, SlBasketLoaded } from "react-icons/sl";

import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useBasket();
  const navigate = useNavigate();

  // loggedIn changed because login transaction bind to access token

  const handleLogout = () => {
    localStorage.removeItem("basket");
    logout()
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box className={styles.nav} >
      <Box display={"flex"} mr={"auto"} alignItems={"center"} className="">
        <Box className="" >
          <NavLink  to="/">
            <Image 
            
              borderRadius="full"
              height={"50px"}
              minW={"88px"}
              src="https://logos-world.net/wp-content/uploads/2020/12/Lays-Logo.png"
              alt="Dan Abramov"
            />
          </NavLink>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          ml={5}
          color={"white"}
          
        >
          <NavLink to="/">
            <Text  className="text-orange-400">
              Bizim Shop
            </Text>
          </NavLink>
        </Box>
      </Box>
      <Box display={"flex"} mr={10}>
        {!localStorage.getItem("access-token") && (
          <>
            <UnorderedList display={"flex"} gap={5} styleType="none">
              <ListItem>
                <NavLink
                  style={({ isActive, isPending }) => {
                    return {
                      color: isActive ? "MediumAquamarine" : "white",
                      borderBottom: isActive ? "solid" : "",
                    };
                  }}
                  to="/signin"
                >
                  Login
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  style={({ isActive, isPending }) => {
                    return {
                      color: isActive ? "MediumAquamarine" : "white",
                      borderBottom: isActive ? "solid" : "",
                    };
                  }}
                  to="/signup"
                >
                  Register
                </NavLink>
              </ListItem>
            </UnorderedList>
          </>
        )}

        {localStorage.getItem("access-token") && (
          <Box display={"flex"}>
            <Box display={"flex"} alignItems={"center"}>
              <UnorderedList display={"flex"} gap={5} styleType="none">
                <ListItem>
                  {user?.role === "admin" && (
                    <NavLink
                      style={({ isActive, isPending }) => {
                        return {
                          color: isActive ? "MediumAquamarine" : "white",
                          borderBottom: isActive ? "solid" : "",
                        };
                      }}
                      to="/admin/home"
                    >
                      Admin
                    </NavLink>
                  )}
                </ListItem>
                <ListItem>
                  <NavLink
                    style={({ isActive, isPending }) => {
                      return {
                        color: isActive ? "MediumAquamarine" : "white",
                        borderBottom: isActive ? "solid" : "",
                      };
                    }}
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </ListItem>
                {/* Button item length */}
              </UnorderedList>
            </Box>
          </Box>
        )}

        <Box ml={5}>
          <NavLink
            style={({ isActive, isPending }) => {
              return {
                color: isActive ? "MediumAquamarine" : "white",
                borderBottom: isActive ? "solid" : "",
              };
            }}
            to="/basket"
          >
            Basket{" "}
            <Box display={"inline-block"}>
              <Box
                _hover={{
                  color: "blue",
                }}
                display={"flex"}
                alignItems={"center"}
              >
                {items.length < 1 ? (
                  <Box>
                    <SlBasket
                      style={{
                        color: "white",
                        height: 20,
                        width: 20,
                      }}
                    />{" "}
                  </Box>
                ) : (
                  <Box display={"flex"}>
                    {" "}
                    <SlBasketLoaded
                      style={{
                        color: "#FFC23C",
                        height: 20,
                        width: 20,
                      }}
                    />
                    <Box>
                      <Badge
                        position={"absolute"}
                        height={"1rem"}
                        rounded={"full"}
                        bg={"red"}
                        color={"white"}
                      >
                        {!items.length < 1 && `${items.length}`}
                      </Badge>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </NavLink>
        </Box>
      </Box>
      {user && (
        <Box className="hidden md:block">
          <Box id={styles.profilePhotoBoxOutside}>
            <Menu>
              <MenuButton>
                <Image
                  alt="not found"
                  width={"40px"}
                  height={"40px"}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3c17auGFTgUHE9FM8j99aPo-VSVD9q5HOA&usqp=CAU"
                  objectFit={"cover"}
                  className={styles.profilePhotoBoxInside}
                />
              </MenuButton>

              {/* There is down sign but it has a problem, cant opacity 1 */}
              {/* <Box className={styles.downButton}>
                <BsChevronDown />
              </Box> */}

              <MenuList minW={0}>
                <MenuItem as={"b"} color={"black"} mr={10}>
                  <NavLink to={"/profile"}>
                    <span>Profile</span>
                  </NavLink>
                </MenuItem>
                <MenuItem as={"b"} color={"black"}>
                  <NavLink to={"/basket"}>
                    <span>Basket</span>
                  </NavLink>
                </MenuItem>
                <MenuItem minH="40px">
                  <Box color={"red"}>
                    <NavLink onClick={handleLogout} to="/">
                      <Box display={"flex"} alignItems={"center"} gap={3}>
                        <Text>Logout</Text>
                        <BiLogOut />
                      </Box>
                    </NavLink>
                  </Box>
                </MenuItem>
              </MenuList>
            </Menu>

            <NavLink to={"/profile"} className="nav-profile-name"></NavLink>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Navbar;
