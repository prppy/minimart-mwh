import React from "react";
import { Box, HStack, Icon } from "@gluestack-ui/themed";
import Feather from "react-native-vector-icons/Feather";
import NavCard from "../../components/ProductDetails/NavCard";

const Feedback = ({ onNavigateToProductRequest, onNavigateToRateUs }) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <HStack>
        <NavCard
          icon={(props) => <Icon as={Feather} name="box" {...props} />}
          title="Product Request"
          description="Can’t find what you need?"
          onPress={onNavigateToProductRequest}
          // change to navigation
          style={{ marginRight: 60 }}
        />
        <NavCard
          icon={(props) => <Icon as={Feather} name="star" {...props} />}
          title="Rate Us"
          description="Tell us how to improve!"
          onPress={onNavigateToRateUs} // change to navigation
        />
      </HStack>
    </Box>
  );
};

export default Feedback;
