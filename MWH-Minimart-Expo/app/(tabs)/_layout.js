import React from "react";
import { Tabs } from "expo-router";
import { Box } from "@gluestack-ui/themed";
import Header from "../../components/Header";

export default function TabLayout() {
  return (
    <Box flex={1} backgroundColor="$gray50">
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="catalogue" options={{ title: "Catalogue" }} />
        <Tabs.Screen name="leaderboard" options={{ title: "Leaderboard" }} />
        <Tabs.Screen name="feedback" options={{ title: "Feedback" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </Box>
  );
}
