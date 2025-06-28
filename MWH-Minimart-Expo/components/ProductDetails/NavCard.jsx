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
        width={400}
        height={300}
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
            size={80}
            color="$primary700"
            style={{ marginBottom: 20 }}
          />

          <Text
            color="$primary700"
            textAlign="center"
            style={{ marginBottom: 15, fontSize: 30, fontWeight: "bold" }}
          >
            {title}
          </Text>
          <Text fontSize="$lg" color="$gray600" textAlign="center">
            {description}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default NavCard;
