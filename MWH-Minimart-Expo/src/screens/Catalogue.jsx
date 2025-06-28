import React, { useState, useMemo } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  InputField,
  InputSlot,
  Button,
  ButtonText,
  FlatList,
  useBreakpointValue,
  Icon,
} from "@gluestack-ui/themed";
// import { FaSearch } from "react-icons/fa";
import { SearchIcon } from "@gluestack-ui/themed";

import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import products from "../data/products.js";

const Catalogue = ({ onProductPress }) => {
  const allCategories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    []
  );
  const allTypes = useMemo(() => [...new Set(products.map((p) => p.type))], []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([
    "Games",
    "Hygiene",
    "Drinks",
  ]);
  const [selectedTypes, setSelectedTypes] = useState(["Showcase"]);
  const [points, setPoints] = useState(4000);
  const [sortOrder, setSortOrder] = useState("");

  // 4 columns on web, 2 on mobile
  const numColumns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    let sortedProducts = [...products];

    if (sortOrder === "asc") {
      sortedProducts.sort((a, b) => a.points - b.points);
    } else if (sortOrder === "desc") {
      sortedProducts.sort((a, b) => b.points - a.points);
    }

    return sortedProducts.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const matchesPoints = product.points <= points;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesType && matchesPoints && matchesSearch;
    });
  }, [selectedCategories, selectedTypes, points, searchQuery, sortOrder]);

  const renderProduct = ({ item }) => (
    <ProductCard product={item} onProductPress={onProductPress} />
  );

  return (
    <Box flex={1} backgroundColor="$gray50">
      <HStack
        alignItems="flex-start"
        justifyContent="flex-start"
        px="$8"
        py="$6"
        space="$8"
      >
        <Sidebar
          allCategories={allCategories}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          allTypes={allTypes}
          selectedTypes={selectedTypes}
          handleTypeChange={handleTypeChange}
          points={points}
          setPoints={setPoints}
        />
        <VStack flex={1} space="$6">
          {/* Controls Section */}
          <HStack
            alignItems="center"
            justifyContent="flex-end"
            mb="$6"
            space="$4"
          >
            <Input
              borderRadius="$full"
              borderColor="$gray300"
              backgroundColor="$white"
              width={360}
              height={44}
              mr="$6"
            >
              <InputSlot pl="$4">
                <SearchIcon size="md" color="$gray600" />
              </InputSlot>
              <InputField
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
                pl="$10"
                pr="$4"
                py="$2"
                fontSize="$lg"
              />
            </Input>
            <HStack space="$2">
              <Button
                variant={sortOrder === "asc" ? "solid" : "outline"}
                size="md"
                backgroundColor={sortOrder === "asc" ? "$gray200" : "$white"}
                borderColor="$gray300"
                borderRadius="$full"
                px="$5"
                py="$2"
                onPress={() => setSortOrder("asc")}
              >
                <ButtonText color="$gray800" fontWeight="$semibold">
                  Point ascending
                </ButtonText>
              </Button>
              <Button
                variant={sortOrder === "desc" ? "solid" : "outline"}
                size="md"
                backgroundColor={sortOrder === "desc" ? "$gray200" : "$white"}
                borderColor="$gray300"
                borderRadius="$full"
                px="$5"
                py="$2"
                onPress={() => setSortOrder("desc")}
              >
                <ButtonText color="$gray800" fontWeight="$semibold">
                  Points descending
                </ButtonText>
              </Button>
            </HStack>
          </HStack>
          {/* Product Grid */}
          <FlatList
            key={`flatlist-${numColumns}`}
            data={filteredAndSortedProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            columnWrapperStyle={
              numColumns > 1 ? { justifyContent: "flex-start" } : null
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 40,
              alignItems: "flex-start",
            }}
            style={{ width: "100%" }}
          />
        </VStack>
      </HStack>
    </Box>
  );
};

export default Catalogue;
