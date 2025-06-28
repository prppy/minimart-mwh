import React from "react";
import { Box, HStack, Icon } from "@gluestack-ui/themed";
import Feather from "react-native-vector-icons/Feather";
import NavCard from "../../../components/ProductDetails/NavCard";
import { router } from "expo-router";

const Feedback = () => {
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
    >
      <HStack>
        <NavCard
          icon={(props) => <Icon as={Feather} name="box" {...props} />}
          title="Product Request"
          description="Can’t find what you need?"
          onPress={() => router.push("/(tabs)/feedback/product-request")}
          style={{ marginRight: 60 }}
        />
        <NavCard
          icon={(props) => <Icon as={Feather} name="star" {...props} />}
          title="Rate Us"
          description="Tell us how to improve!"
          onPress={() => router.push("/(tabs)/feedback/rate-us")}
        />
      </HStack>
    </Box>
  );
};

export default Feedback;
