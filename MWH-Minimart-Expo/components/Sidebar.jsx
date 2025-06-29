import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  Pressable,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Icon,
  Divider,
} from "@gluestack-ui/themed";
// import { FaTimes } from 'react-icons/fa';
import { CloseIcon } from "@gluestack-ui/themed";

const Sidebar = ({
  allCategories,
  selectedCategories,
  handleCategoryChange,
  allTypes,
  selectedTypes,
  handleTypeChange,
  points,
  setPoints,
}) => {
  return (
    <Box
      width={280}
      backgroundColor="$white"
      borderRadius="$lg"
      shadowColor="$gray400"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.08}
      shadowRadius={8}
      elevation={2}
      padding="$8"
      marginBottom="$6"
      minHeight={600}
    >
      <VStack space="$8">
        {/* Category Section */}
        <VStack space="$4">
          <Heading size="lg" color="$gray900" fontWeight="$bold" mb="$1">
            Category
          </Heading>
          <HStack flexWrap="wrap" gap="$2" mb="$2">
            {selectedCategories.map((category) => (
              <Pressable
                key={category}
                onPress={() => handleCategoryChange(category)}
                style={{ marginBottom: 8 }}
              >
                <HStack
                  alignItems="center"
                  space="$1"
                  backgroundColor="$blue100"
                  px="$3"
                  py="$1"
                  borderRadius="$full"
                  borderWidth={1}
                  borderColor="$blue400"
                  mb="$1"
                >
                  <Text size="sm" color="$blue800" fontWeight="$bold">
                    {category}
                  </Text>
                  <CloseIcon size="xs" color="$blue600" ml="$1" />
                </HStack>
              </Pressable>
            ))}
          </HStack>
          <VStack space="$2">
            {allCategories.map((category) => (
              <HStack key={category} alignItems="center" space="$4">
                <Checkbox
                  value={category}
                  isChecked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  size="md"
                >
                  <CheckboxIndicator />
                </Checkbox>
                <Text size="md" color="$gray800">
                  {category}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
        <Divider my="$2" />
        {/* Type Section */}
        <VStack space="$4">
          <Heading size="lg" color="$gray900" fontWeight="$bold" mb="$1">
            Type
          </Heading>
          <HStack flexWrap="wrap" gap="$2" mb="$2">
            {selectedTypes.map((type) => (
              <Pressable
                key={type}
                onPress={() => handleTypeChange(type)}
                style={{ marginBottom: 8 }}
              >
                <HStack
                  alignItems="center"
                  space="$1"
                  backgroundColor="$blue100"
                  px="$3"
                  py="$1"
                  borderRadius="$full"
                  borderWidth={1}
                  borderColor="$blue400"
                  mb="$1"
                >
                  <Text size="sm" color="$blue800" fontWeight="$bold">
                    {type}
                  </Text>
                  <CloseIcon size="xs" color="$blue600" ml="$1" />
                </HStack>
              </Pressable>
            ))}
          </HStack>
          <VStack space="$2">
            {allTypes.map((type) => (
              <HStack key={type} alignItems="center" space="$4">
                <Checkbox
                  value={type}
                  isChecked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  size="md"
                >
                  <CheckboxIndicator />
                </Checkbox>
                <Text size="md" color="$gray800">
                  {type}
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
        <Divider my="$2" />
        {/* Points Section */}
        <VStack space="$4">
          <Heading size="lg" color="$gray900" fontWeight="$bold" mb="$1">
            Points
          </Heading>
          <VStack space="$2">
            <Text size="sm" color="$gray700" mb="$1">Filter by maximum points</Text>
            <Slider
              max={500}
              min={0}
              step={10}
              value={points}
              onChange={(value) => setPoints(value)}
              size="lg"
              backgroundColor="$gray100"
              borderRadius={8}
              height={8}
            >
              <SliderTrack>
                <SliderFilledTrack backgroundColor="$blue600" />
              </SliderTrack>
              <SliderThumb backgroundColor="$blue600" />
            </Slider>
            <HStack justifyContent="space-between" mt="$1">
              <Text size="sm" color="$gray500">0</Text>
              <Text size="sm" color="$blue800" fontWeight="$bold">{points}pts</Text>
              <Text size="sm" color="$gray500">500</Text>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebar;
