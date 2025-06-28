import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Pressable,
  useBreakpointValue,
  Center,
} from "@gluestack-ui/themed";

const Header = ({ activeTab = "catalogue", onTabChange }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  // const logoSize = useBreakpointValue({ base: 40, md: 48 });
  // const logoTextSize = useBreakpointValue({ base: "lg", md: "xl" });

  // had exception error with the above
  const logoSize = useBreakpointValue({ base: 40, md: 48 });
  const fontSizes = {
    lg: 18,
    xl: 24,
  };

  const logoTextSize = useBreakpointValue({
    base: fontSizes.lg,
    md: fontSizes.xl,
  });

  const tabs = [
    { id: "catalogue", label: "Catalogue" },
    { id: "leaderboard", label: "Leaderboard" },
    { id: "feedback", label: "Feedback" },
    { id: "profile", label: "Profile" },
  ];

  const handleTabPress = (tabId) => {
    setCurrentTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <Box
      backgroundColor="$white"
      shadowColor="$black"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.08}
      shadowRadius={8}
      elevation={6}
      px="$4"
      py="$4"
      _web={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      }}
    >
      <HStack
        px="$6"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Left: Logo and Title */}
        <HStack alignItems="center" space="$4">
          <Image
            source={require("../../assets/mwh-logo.svg")}
            alt="MWH Logo"
            width={logoSize}
            height={logoSize}
            resizeMode="contain"
            mr="$2" // adds some spacing directly
          />
          <VStack space="$1">
            <Text
              fontSize={logoTextSize}
              fontWeight="$bold"
              color="$primary700"
              lineHeight="$xs"
            >
              {currentTab.toUpperCase()}
            </Text>
            <Text fontSize="$xs" color="$gray600" lineHeight="$xs">
              Web-based Minimart
            </Text>
          </VStack>
        </HStack>

        {/* Right: Tabs */}
        <HStack space="$5">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <Pressable key={tab.id} onPress={() => handleTabPress(tab.id)}>
                <Box
                  px="$4"
                  py="$2"
                  position="relative"
                  _web={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    _hover: {
                      transform: "translateY(-2px)",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      color: "$primary600",
                    },
                  }}
                >
                  <Text
                    fontSize="$md"
                    fontWeight={isActive ? "$semibold" : "$medium"}
                    color={isActive ? "$primary600" : "$gray700"}
                  >
                    {tab.label}
                  </Text>
                  {isActive && (
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      height={2}
                      backgroundColor="$primary600"
                      borderRadius="$full"
                      _web={{
                        animation: "slideIn 0.3s ease",
                        "@keyframes slideIn": {
                          "0%": {
                            transform: "scaleX(0)",
                            opacity: 0,
                          },
                          "100%": {
                            transform: "scaleX(1)",
                            opacity: 1,
                          },
                        },
                      }}
                    />
                  )}
                </Box>
              </Pressable>
            );
          })}
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
