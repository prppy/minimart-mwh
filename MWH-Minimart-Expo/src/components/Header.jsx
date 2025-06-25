import React from 'react';
import { 
  HStack, 
  Button, 
  ButtonText, 
  Image, 
  Box,
  Icon
} from '@gluestack-ui/themed';
import { FaShoppingCart, FaRegSmile, FaMedal, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <Box
      backgroundColor="$white"
      paddingX="$8"
      paddingY="$4"
      borderBottomWidth={1}
      borderBottomColor="$gray200"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      minHeight={72}
    >
      <HStack alignItems="center" space="$4">
        <Image 
          source={require('../../assets/mwh-logo.svg')} 
          alt="MWH Logo" 
          height={48} 
          width={48} 
          resizeMode="contain"
        />
      </HStack>
      <HStack space="$3" alignItems="center">
        <Button 
          variant="outline" 
          size="md"
          backgroundColor="$white"
          borderColor="$blue600"
          px="$4"
          py="$2"
        >
          <Icon as={FaShoppingCart} size="sm" color="$blue600" mr="$2" />
          <ButtonText color="$blue900" fontWeight="$semibold">Catalogue</ButtonText>
        </Button>
        <Button 
          variant="outline" 
          size="md"
          backgroundColor="$white"
          borderColor="$blue600"
          px="$4"
          py="$2"
        >
          <Icon as={FaRegSmile} size="sm" color="$blue600" mr="$2" />
          <ButtonText color="$blue900" fontWeight="$semibold">Feedback</ButtonText>
        </Button>
        <Button 
          variant="solid" 
          size="md" 
          backgroundColor="$blue600"
          borderColor="$blue600"
          px="$4"
          py="$2"
        >
          <Icon as={FaMedal} size="sm" color="$white" mr="$2" />
          <ButtonText color="$white" fontWeight="$semibold">Leaderboard</ButtonText>
        </Button>
        <Button 
          variant="solid" 
          size="md" 
          backgroundColor="$red500"
          borderColor="$red500"
          px="$4"
          py="$2"
        >
          <Icon as={FaUser} size="sm" color="$white" mr="$2" />
          <ButtonText color="$white" fontWeight="$semibold">Sign in</ButtonText>
        </Button>
      </HStack>
    </Box>
  );
};

export default Header; 