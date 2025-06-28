import React from "react";
import { Box, HStack, Image, Text } from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import MWHLogo from "./MWHLogo";
const screenHeight = Dimensions.get("window").height;
const footerHeight = screenHeight * 0.05; // 10% of screen height

const Footer = () => {
  return (
    <Box
      backgroundColor="$white"
      height={footerHeight}
      paddingX={6}
      borderTopWidth={1}
      borderTopColor="#d6d5d2"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <HStack justifyContent="center" alignItems="center" space={4}>
        <MWHLogo style={{ marginRight: 10 }} />
        <Text
          size="sm"
          color="$gray500"
          textAlign="center"
          fontWeight="$normal"
        >
          MUHAMMADIYAH WELFARE HOME © 2025 | An institution of MUHAMMADIYAH
          ASSOCIATION
        </Text>
      </HStack>
    </Box>
  );
};

export default Footer;
