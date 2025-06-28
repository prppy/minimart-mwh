import React, { useState } from "react";
import { useRouter, usePathname } from "expo-router";
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Pressable,
  useBreakpointValue,
} from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import MWHLogo from "./MWHLogo";
const Header = ({ activeTab = "catalogue", onTabChange }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Get current tab based on pathname
  // const getCurrentTab = () => {
  //   if (pathname.startsWith("/product/")) return "catalogue";
  //   if (pathname === "/" || pathname === "/catalogue") return "catalogue";
  //   if (pathname === "/leaderboard") return "leaderboard";
  //   if (pathname === "/feedback") return "feedback";
  //   if (pathname === "/profile") return "profile";
  //   return "catalogue";
  // };
  const getCurrentTab = () => {
    if (pathname.startsWith("/product/")) return "catalogue";
    if (pathname === "/" || pathname.includes("/catalogue")) return "catalogue";
    if (pathname.includes("/leaderboard")) return "leaderboard";
    if (pathname.includes("/feedback")) return "feedback";
    if (pathname.includes("/profile")) return "profile";
    return "catalogue";
  };

  const currentTab = getCurrentTab();

  const logoSize = useBreakpointValue({ base: 40, md: 48 });
  const fontSizes = {
    lg: 18,
    xl: 24,
  };
  const logoTextSize = useBreakpointValue({
    base: fontSizes.lg,
    md: fontSizes.xl,
  });

  // const tabs = [
  //   { id: "catalogue", label: "Catalogue", path: "/catalogue" },
  //   { id: "leaderboard", label: "Leaderboard", path: "/leaderboard" },
  //   { id: "feedback", label: "Feedback", path: "/feedback" },
  //   { id: "profile", label: "Profile", path: "/profile" },
  // ];
  const tabs = [
    { id: "catalogue", label: "Catalogue", path: "/(tabs)/catalogue" },
    { id: "leaderboard", label: "Leaderboard", path: "/(tabs)/leaderboard" },
    { id: "feedback", label: "Feedback", path: "/(tabs)/feedback" },
    { id: "profile", label: "Profile", path: "/(tabs)/profile" },
  ];

  // const handleTabPress = (tabId, path) => {
  //   if (path === "/catalogue") {
  //     router.push("/catalogue");
  //   } else {
  //     router.push(path);
  //   }

  //   if (onTabChange) {
  //     onTabChange(tabId);
  //   }
  // };
  const handleTabPress = (tabId, path) => {
    router.push(path);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <Box
        backgroundColor="$white"
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.08}
        shadowRadius={8}
        elevation={6}
        px="$4"
        py="$4"
        position="sticky"
        top={0}
        zIndex={10}
        boxShadow="0 2px 8px rgba(0, 0, 0, 0.08)"

        // _web={{
        //   position: "sticky",
        //   top: 0,
        //   zIndex: 10,
        //   boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        // }}
      >
        <HStack
          px="$6"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left: Logo and Title */}
          <HStack alignItems="center" space="$4">
            <MWHLogo style={{ marginRight: 10 }} />

            <VStack space="$1">
              <Text
                fontSize={logoTextSize}
                fontWeight="$bold"
                color="$primary700"
                // lineHeight={logoTextSize * 1.2}
              >
                {currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}
              </Text>
              <Text fontSize="$xs" color="$gray600" lineHeight="$xs">
                MWH Minimart
              </Text>
            </VStack>
          </HStack>

          {/* Right: Tabs */}
          <HStack space="$5">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <Pressable
                  key={tab.id}
                  onPress={() => handleTabPress(tab.id, tab.path)}
                >
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
    </SafeAreaView>
  );
};

export default Header;
