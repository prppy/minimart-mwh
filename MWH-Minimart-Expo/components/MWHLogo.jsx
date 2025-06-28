import React from "react";
import { Platform, Image } from "react-native";

const MWHLogo = ({ width = 32, height = 32, style }) => {
  if (Platform.OS === "web") {
    return (
      // on web, use SVG image

      <Image
        source={require("../assets/mwh-logo.svg")}
        alt="MWH Logo"
        style={[{ width, height }, style]}
        resizeMode="contain"
      />
    );
  } else {
    // on iOS/Android, use PNG image
    return (
      <Image
        source={require("../assets/mwh-logo.png")}
        alt="MWH Logo"
        style={[{ width, height }, style]}
        resizeMode="contain"
      />
    );
  }
};

export default MWHLogo;
