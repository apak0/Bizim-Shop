import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import {
  Text,
  Button,
  Badge,
  Image,
  Grid,
  Box,
  Flex,
  defineStyleConfig,
} from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import "./styles.css";

import { useBasket } from "../../contexts/BasketContext";
import LinesEllipsis from "react-lines-ellipsis";

import Card from "../../components/Card";
import { useInfiniteQuery } from "react-query";

import { fetchProductList } from "../../api";

function ProductDetail() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;

      if (!morePagesExist) {
        return;
      }

      return allGroups.lenght + 1;
    },
  });
  console.log(data);

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      height={"100%"}
      width={"100%"}
      minW={"230px"}
    >
      <Box flex={1}>
        <Link to={`/product/${item._id}`}>
          <Box borderBottom={"1px"} borderColor="gray.600">
            <Image
              src={item.photos[0]}
              alt="product"
              loading="lazy"
              w={"100%"}
              h={"200px"}
              objectFit={"cover"}
            />
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box
                fontSize={"2xl"}
                fontWeight="bold"
                as="samp"
                lineHeight="tight"
               
              >
                {item.title}
              </Box>

              <Box fontSize={"m"}>
                {moment(item.createdAt).format("DD/MM/YYYY")}
              </Box>
            </Box>
          </Box>

          <LinesEllipsis
            text={item.description}
            onReflow={handleReflow}
            maxLine={4}
          />
        </Link>
      </Box>
      <Box display={"flex"} as="b" fontSize={"2xl"} color={"yellow.400"} mt={5}>
        {item.price} TL{" "}
      </Box>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {inBasket ? ( // if item in basket change the button
          <Button
            colorScheme={"red"}
            variant="solid"
            px={1}
            _hover={{ bg: "white", color: "red", border: "1px solid gray" }}
            onClick={() => removeFromBasket(item._id)}
          >
            Remove
          </Button>
        ) : null}

        {!inBasket ? (
          <>
            {!foundBasketItem ? (
              <Button
                colorScheme={"blue"}
                variant="solid"
                onClick={() => addToBasket(item, foundBasketItem)}
                _hover={{
                  bg: "white",
                  color: "blue.400",
                  border: "1px solid #4299E1",
                }}
              >
                Add to Basket
              </Button>
            ) : (
              <Button colorScheme={"blue"} variant="solid" isDisabled>
                Already in Basket
              </Button>
            )}
          </>
        ) : null}


        <Box>
          <Badge ml="1" fontSize="0.8em" colorScheme="green">
            New
          </Badge>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetail;
