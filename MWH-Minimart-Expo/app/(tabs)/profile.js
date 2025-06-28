import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  Image,
  Pressable,
  Icon,
} from "@gluestack-ui/themed";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const Profile = () => {
  // user details
  const [name, setName] = useState("");
  const [leaderboard, setLeaderboard] = useState(-1);
  const [points, setPoints] = useState(0);

  // personalisation
  const [colorTheme, setColorTheme] = useState("#273C73");
  const [style, setStyle] = useState(0); //TODO: update with user selected style next time

  const colorOptions = [
    "#E74C3C", // red
    "#E67E22", // orange
    "#F1C40F", // yellow
    "#2ECC71", // green
    "#3498DB", // light blue
    "#8E44AD", // purple
    "#273C73", // dark blue
  ];

  const styleOptions = ["🖥️", "🏀", "🎨", "🎮"];
  return (
    <Box flex={1} bg="#A0B1DF" p="$20">
      <HStack space="2xl" alignItems="center" p="$4">
        {/* profile pic */}
        <Box
          borderRadius="$full"
          overflow="hidden"
          borderWidth={5}
          borderColor={colorTheme}
        >
          <Image
            source={{ uri: "placeholder" }} // replace with your image URL
            alt="Profile Picture"
            width={300}
            height={300}
          />
        </Box>

        {/* details section */}
        <VStack flex={1} space="lg" marginLeft={100}>
          <Text style={[styles.name, { color: colorTheme }]}>
            Resident Name
          </Text>
          <Text style={[styles.detailsLabel, { color: colorTheme }]}>
            Leaderboard: {leaderboard}
          </Text>
          <Text style={[styles.detailsLabel, { color: colorTheme }]}>
            Points: {points} pts
          </Text>
          <HStack space="lg">
            <Selector title="Colour" colorTheme={colorTheme}>
              {colorOptions.map((color, index) => (
                <ColorSwatch
                  key={index}
                  color={color}
                  selected={colorTheme === color}
                  onPress={() => setColorTheme(color)}
                />
              ))}
            </Selector>

            <Selector title="Style" colorTheme={colorTheme}>
              {styleOptions.map((icon, index) => (
                <StyleIcon
                  key={index}
                  icon={icon}
                  selected={style === index}
                  onPress={() => setStyle(index)}
                />
              ))}
            </Selector>
          </HStack>
          <Box style={styles.selectorCard}>
            <Text style={[styles.detailsLabel, { color: colorTheme }]}>
              Recent Transactions
            </Text>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Profile;

const styles = {
  name: {
    fontWeight: "bold",
    fontSize: 50,
  },
  detailsLabel: {
    fontWeight: "500",
    fontSize: 30,
    marginBottom: 5,
  },
  selectorCard: {
    borderRadius: 15,
    backgroundColor: "white",
    padding: 20,
  },
};
// helper components

const ColorSwatch = ({ color, selected, onPress }) => (
  <Pressable
    onPress={onPress}
    style={{
      width: 50,
      height: 50,
      borderRadius: "50%",
      backgroundColor: color,
      borderWidth: selected ? 3 : 1,
      borderColor: selected ? "#D9E0F2" : "#ccc",
    }}
  />
);

const StyleIcon = ({ icon, selected, onPress }) => (
  <Pressable
    onPress={onPress}
    style={{
      width: 50,
      height: 50,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: selected ? 3 : 1,
      borderColor: selected ? "#131E39" : "#ccc",
    }}
  >
    <Text fontSize={40}>{icon}</Text>
  </Pressable>
);

const Selector = ({ title, children, colorTheme }) => (
  <Box borderRadius="$md" bg="$white" style={styles.selectorCard} flex={1}>
    <VStack space="sm">
      <HStack alignItems="center" space="md">
        <Text style={[styles.detailsLabel, { color: colorTheme }]}>
          {title}
        </Text>
        {/* <Icon
          as={MaterialCommunityIcons}
          name="pencil"
          size={30}
          color={colorTheme || "$black"}
        /> */}
      </HStack>

      <HStack space="lg" flexWrap="wrap">
        {children}
      </HStack>
    </VStack>
  </Box>
);
