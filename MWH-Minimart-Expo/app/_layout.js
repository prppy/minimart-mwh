import React from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "../gluestack-ui.config";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="feedback" />
      </Stack>
    </GluestackUIProvider>
  );
}
