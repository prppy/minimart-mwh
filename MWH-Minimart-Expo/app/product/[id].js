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
  ScrollView,
  useBreakpointValue,
} from "@gluestack-ui/themed";
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

  // Handle case where no product is found
  if (!product) {
    return (
      <Box
        flex={1}
        backgroundColor="$white"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="$gray600" fontSize="$lg">
          Product not found
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1} backgroundColor="$white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box px="$6" py="$8" maxWidth={1400} mx="auto" width="100%">
          {/* Main Product Content */}
          <HStack
            alignItems="center"
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
              space="$20" // help idk why i cannot space them apart even with this
              alignItems="flex-start"
              width="100%"
              maxWidth={isWeb ? "50%" : "100%"}
            >
              {/* Product Name */}
              <Heading
                size="3xl"
                color="$gray900"
                fontWeight="$bold"
                lineHeight="$3xl"
              >
                {product.name}
              </Heading>

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
                  letterSpacing={1.2}
                >
                  {product.category}
                </Text>
              </Box>

              {/* Points Display */}
              <HStack alignItems="baseline" space="$2">
                <Text color="$primary600" fontSize="$4xl" fontWeight="$bold">
                  {product.points}
                </Text>
                <Text color="$gray600" fontSize="$xl" fontWeight="$medium">
                  points
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ProductDetails;
