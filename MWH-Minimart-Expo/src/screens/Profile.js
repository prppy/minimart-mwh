import React from "react";
import { Box, VStack, Heading, Text } from "@gluestack-ui/themed";

const Profile = () => {
  return (
    <Box flex={1} backgroundColor="$gray50">
      <VStack flex={1} alignItems="center" justifyContent="center" p="$8">
        <Heading size="2xl" color="$gray800" mb="$4">
          👤 Profile
        </Heading>
        <Text color="$gray600" textAlign="center">
          Manage your account and view your rewards history.
        </Text>
      </VStack>
    </Box>
  );
};

export default Profile;
