import React from 'react';
import { 
  Box, 
  HStack, 
  Image, 
  Text 
} from '@gluestack-ui/themed';

const Footer = () => {
  return (
    <Box
      backgroundColor="$white"
      paddingY="$3"
      borderTopWidth={1}
      borderTopColor="$gray200"
      alignItems="center"
      width="100%"
    >
      <HStack justifyContent="center" alignItems="center" space="$2">
        <Image 
          source={require('../../assets/mwh-logo.svg')} 
          alt="MWH Logo" 
          height={28} 
          width={28} 
          resizeMode="contain"
        />
        <Text 
          size="xs" 
          color="$gray500" 
          textAlign="center"
          fontWeight="$normal"
        >
          MUHAMMADIYAH WELFARE HOME © 2025 | An institution of MUHAMMADIYAH ASSOCIATION
        </Text>
      </HStack>
    </Box>
  );
};

export default Footer; 