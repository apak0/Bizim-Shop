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
    <Box mx={20}>
      <Grid px={20} pt={10} templateColumns="repeat(4, 3fr)" gap={10}>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box className="box" rounded={"lg"} w="100%" key={item._id}>
                <Card item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>

      <Flex mt="10" justifyContent="center">
        <Button
          m={5}
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </Box>
  );
}

export default ProductDetail;
