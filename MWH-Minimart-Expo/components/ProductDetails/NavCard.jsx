import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Pressable,
  Icon,
} from "@gluestack-ui/themed";

const NavCard = ({
  icon: IconComponent,
  title,
  description,
  onPress,
  style,
}) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Box
        borderWidth={1}
        borderColor="#ebeae8" //TODO: change to fixed color later
        borderRadius={15}
        padding={30}
        width={280}
        height={200}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$white"
        // shadow
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={3}
      >
        <VStack alignItems="center">
          <Icon
            as={IconComponent}
            size={45}
            color="$primary700"
            style={{ marginBottom: 20 }}
          />

          <Heading
            size="lg"
            color="$primary700"
            textAlign="center"
            style={{ marginBottom: 5 }}
          >
            {title}
          </Heading>
          <Text fontSize="$md" color="$gray600" textAlign="center">
            {description}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default NavCard;
