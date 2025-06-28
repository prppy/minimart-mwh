import React from "react";
import {
  Box,
  Center,
  Text,
  Input,
  Button,
  VStack,
  Pressable,
  ButtonText,
  InputField,
} from "@gluestack-ui/themed";

export default function ProductRequest({ onBack }) {
  return (
    <Center flex={1} bg="$white" px={4}>
      {/* padding left/right for margin */}
      <Box
        borderWidth={1}
        borderColor="#ebeae8"
        borderRadius={15}
        padding={30}
        width={400}
        maxWidth="100%" // make responsive on smaller screens
        alignItems="stretch" // stretch children width-wise
        backgroundColor="$white"
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={3}
      >
        <VStack space={4}>
          {" "}
          {/* vertical stack with spacing */}
          <Box paddingVertical={10}>
            <Text mb={10} fontSize="$md">
              Your Name
            </Text>
            <Input variant="outline">
              <InputField placeholder="Enter name" />
            </Input>
          </Box>
          <Box paddingVertical={10}>
            <Text mb={10} fontSize="$md">
              Product Requested
            </Text>
            <Input variant="outline">
              <InputField placeholder="Enter product name" />
            </Input>
          </Box>
          <Button
            size="lg"
            mt={10}
            width="100%"
            onPress={() => alert("Submitted!")}
            backgroundColor="#D5442A" // TODO: change to color theme (secondary?)
          >
            <ButtonText>Submit</ButtonText>
          </Button>
          <Pressable onPress={onBack}>
            <Text mt={20} color="$primary700" textAlign="center">
              Back
            </Text>
          </Pressable>
        </VStack>
      </Box>
    </Center>
  );
}
