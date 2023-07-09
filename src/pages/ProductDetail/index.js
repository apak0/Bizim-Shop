import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";
import {motion} from "framer-motion"

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, error, data } = useQuery(["products", product_id], () =>
    fetchProduct(product_id)
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = data.photos.map((url) => ({ original: url }));

  return (
    <motion.Box
    initial={{opacity:0}}
    animate={{opacity:1}}
    >
      <Box className="d-flex justify-center ">
        <Box>
          <Text as="h2" fontSize="2xl">
            {data.title}
          </Text>
        </Box>
        <Box>
          <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
        </Box>
      </Box>

      <Box>
        <p>{data.description}</p>
      </Box>
      <Box margin="10">
        <ImageGallery items={images} showThumbnails={false} />
      </Box>
      <Box className="mx-5" mx={"auto"}>
        <Button
          colorScheme={findBasketItem ? "green" : "pink"}
          onClick={() => addToBasket(data, findBasketItem)}
        >
          {findBasketItem ? "Remove from basket" : "Add to Basket"}
        </Button>
      </Box>
    </motion.Box>
  );
}

export default ProductDetail;
