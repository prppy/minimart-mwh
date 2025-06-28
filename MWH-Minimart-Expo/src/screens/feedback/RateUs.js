import React from "react";
import { Box, Text, Center } from "@gluestack-ui/themed";

export default function RateUs() {
  return (
    <Center flex={1} bg="$white">
      <Box p="$4">
        <Text size="2xl" fontWeight="bold" color="$gray800">
          RateUs
        </Text>
      </Box>
    </Center>
  );
}
