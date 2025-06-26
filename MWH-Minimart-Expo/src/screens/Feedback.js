import React from "react";
import { Box, VStack, Heading, Text } from "@gluestack-ui/themed";

const Feedback = () => {
  return (
    <Box flex={1} backgroundColor="$gray50">
      <VStack flex={1} alignItems="center" justifyContent="center" p="$8">
        <Heading size="2xl" color="$gray800" mb="$4">
          💬 Feedback
        </Heading>
        <Text color="$gray600" textAlign="center">
          Share your thoughts and suggestions with us!
        </Text>
      </VStack>
    </Box>
  );
};

export default Feedback;
