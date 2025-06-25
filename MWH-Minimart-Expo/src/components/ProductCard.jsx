import React from 'react';
import { 
  Box, 
  VStack, 
  Image, 
  Text, 
  Heading,
  Pressable
} from '@gluestack-ui/themed';

const ProductCard = ({ product }) => {
  return (
    <Pressable>
      <Box
        backgroundColor="$white"
        borderRadius="$lg"
        padding="$4"
        shadowColor="$gray400"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={2}
        margin="$3"
        width={220}
        alignItems="center"
        justifyContent="flex-start"
        minHeight={320}
        _web={{ 
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          ':hover': { 
            transform: 'translateY(-2px)',
            shadowColor: '$gray500',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4
          } 
        }}
      >
        <VStack space="$3" alignItems="center">
          <Box
            width={160}
            height={160}
            borderRadius="$md"
            overflow="hidden"
            backgroundColor="$gray100"
            alignItems="center"
            justifyContent="center"
          >
            <Image 
              source={product.image} 
              alt={product.name}
              width={160}
              height={160}
              resizeMode="contain"
            />
          </Box>
          <VStack space="$1" alignItems="center">
            <Heading size="sm" color="$gray800" fontWeight="$semibold" textAlign="center">
              {product.name}
            </Heading>
            <Text size="md" color="$blue600" fontWeight="$semibold" textAlign="center">
              {product.points}pts
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default ProductCard; 