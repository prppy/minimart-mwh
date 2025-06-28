// app/product/[id].js
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Heading,
  Button,
  ButtonText,
  Pressable,
  ScrollView,
  useBreakpointValue,
  Icon,
} from "@gluestack-ui/themed";
import { FaArrowLeft, FaShoppingCart, FaHeart } from "react-icons/fa";
import products from "../../data/products.js";

const ProductDetails = () => {
  const { id: productId } = useLocalSearchParams();
  const router = useRouter();

  // Responsive layout
  const isWeb = useBreakpointValue({ base: false, md: true });
  const imageSize = useBreakpointValue({ base: 350, md: 450, lg: 500 });
  const containerDirection = useBreakpointValue({ base: "column", lg: "row" });

  // Find the product by ID
  const product = products.find((p) => p.id.toString() === productId);

  const handleBack = () => {
    router.back();
  };

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
    // Add your cart logic here
  };

  const handleWishlist = (product) => {
    console.log("Add to wishlist:", product);
    // Add your wishlist logic here
  };

  // Handle case where no product is found
  if (!product) {
    return (
      <Box
        flex={1}
        backgroundColor="$white"
        alignItems="center"
        justifyContent="center"
      >
        <VStack space="$4" alignItems="center">
          <Text color="$gray600" fontSize="$lg">
            Product not found
          </Text>
          <Button onPress={handleBack} backgroundColor="$primary600">
            <ButtonText color="$white">Back to Catalogue</ButtonText>
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor="$white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box px="$6" py="$8" maxWidth={1400} mx="auto" width="100%">
          {/* Back Button */}
          <Pressable
            onPress={handleBack}
            mb="$8"
            _web={{
              cursor: "pointer",
              alignSelf: "flex-start",
            }}
          >
            <HStack alignItems="center" space="$2">
              <Icon as={FaArrowLeft} size="sm" color="$gray700" />
              <Text color="$gray700" fontWeight="$medium" fontSize="$md">
                Back to Catalogue
              </Text>
            </HStack>
          </Pressable>

          {/* Main Product Content */}
          <HStack
            alignItems="flex-start"
            justifyContent="center"
            space={isWeb ? "$12" : "$0"}
            flexDirection={containerDirection}
            width="100%"
          >
            {/* Product Image Section */}
            <Box
              flex={isWeb ? 1 : undefined}
              alignItems="center"
              justifyContent="center"
              mb={isWeb ? "$0" : "$8"}
              maxWidth={isWeb ? "50%" : "100%"}
            >
              <Box
                width={imageSize}
                height={imageSize}
                backgroundColor="$gray50"
                borderRadius="$2xl"
                alignItems="center"
                justifyContent="center"
                p="$6"
                borderWidth={1}
                borderColor="$gray200"
              >
                <Image
                  source={product.image}
                  alt={product.name}
                  width="100%"
                  height="100%"
                  resizeMode="contain"
                />
              </Box>
            </Box>

            {/* Product Information Section */}
            <VStack
              flex={isWeb ? 1 : undefined}
              space="$8"
              alignItems="flex-start"
              width="100%"
              maxWidth={isWeb ? "50%" : "100%"}
            >
              {/* Category Badge */}
              <Box
                backgroundColor="$blue50"
                borderRadius="$md"
                px="$4"
                py="$2"
                alignSelf="flex-start"
              >
                <Text
                  color="$blue700"
                  fontSize="$sm"
                  fontWeight="$semibold"
                  textTransform="uppercase"
                  letterSpacing="$wide"
                >
                  {product.category}
                </Text>
              </Box>

              {/* Product Name */}
              <Heading
                size="3xl"
                color="$gray900"
                fontWeight="$bold"
                lineHeight="$3xl"
                mb="$-4"
              >
                {product.name}
              </Heading>

              {/* Points Display */}
              <HStack alignItems="baseline" space="$2">
                <Text color="$primary600" fontSize="$4xl" fontWeight="$bold">
                  {product.points}
                </Text>
                <Text color="$gray600" fontSize="$xl" fontWeight="$medium">
                  points
                </Text>
              </HStack>

              {/* Description */}
              <Box>
                <Text
                  color="$gray700"
                  fontSize="$lg"
                  lineHeight="$xl"
                  leading="relaxed"
                >
                  {product.description}
                </Text>
              </Box>

              {/* Action Buttons */}
              <VStack space="$4" width="100%" mt="$4">
                <Button
                  backgroundColor="$primary600"
                  borderRadius="$xl"
                  py="$4"
                  px="$8"
                  width="100%"
                  onPress={() => handleAddToCart(product)}
                  _web={{
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    ":hover": {
                      backgroundColor: "$primary700",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <HStack
                    alignItems="center"
                    space="$3"
                    justifyContent="center"
                  >
                    <Icon as={FaShoppingCart} size="md" color="$white" />
                    <ButtonText
                      color="$white"
                      fontSize="$lg"
                      fontWeight="$semibold"
                    >
                      Redeem with Points
                    </ButtonText>
                  </HStack>
                </Button>

                <Button
                  variant="outline"
                  borderColor="$gray300"
                  borderWidth={2}
                  borderRadius="$xl"
                  py="$4"
                  px="$8"
                  width="100%"
                  backgroundColor="$white"
                  onPress={() => handleWishlist(product)}
                  _web={{
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    ":hover": {
                      backgroundColor: "$gray50",
                      borderColor: "$gray400",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <HStack
                    alignItems="center"
                    space="$3"
                    justifyContent="center"
                  >
                    <Icon as={FaHeart} size="md" color="$gray700" />
                    <ButtonText
                      color="$gray700"
                      fontSize="$lg"
                      fontWeight="$semibold"
                    >
                      Add to Wishlist
                    </ButtonText>
                  </HStack>
                </Button>
              </VStack>
            </VStack>
          </HStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ProductDetails;
