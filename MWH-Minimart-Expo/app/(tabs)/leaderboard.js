import React from "react";
import { Box, VStack, Heading, Text } from "@gluestack-ui/themed";

const Leaderboard = () => {
  return (
    <Box flex={1} backgroundColor="$gray50">
      <VStack flex={1} alignItems="center" justifyContent="center" p="$8">
        <Heading size="2xl" color="$gray800" mb="$4">
          🏆 Leaderboard
        </Heading>
        <Text color="$gray600" textAlign="center">
          Swee who's leading in points and rewards.
        </Text>
      </VStack>
    </Box>
  );
};

export default Leaderboard;
