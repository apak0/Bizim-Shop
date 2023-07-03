import React from "react";
import { Grid, Box, Flex, Button, defineStyleConfig } from "@chakra-ui/react";
import Card from "../../components/Card";
import { useInfiniteQuery } from "react-query";

import { fetchProductList } from "../../api";

import "./style.css";
import { useBasket } from "../../contexts/BasketContext";

function Products() {
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

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <Box className=" items-center justify-center min-h-screen container mx-auto" py={5}>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 " px={20} >
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => {
              return (
                <Box className="box " w={"100%"} rounded={"lg"} key={item._id}>
                  <Card item={item} inBasket={false} />
                </Box>
              );
            })}
          </React.Fragment>
        ))}
      </Box>

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

export default Products;
