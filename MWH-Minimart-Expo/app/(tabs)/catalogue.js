import React, { useState, useMemo } from "react";
import { useRouter } from "expo-router";
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
import Sidebar from "../../components/Sidebar.jsx";
import ProductCard from "../../components/ProductCard.jsx";
import products from "../../data/products.js";

const Catalogue = () => {
  const router = useRouter();

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
  const [points, setPoints] = useState(500);
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

  const handleProductPress = (product) => {
    router.push(`/product/${product.id}`);
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
    <ProductCard product={item} onProductPress={handleProductPress} />
  );

  return (
    <Box flex={1} backgroundColor="$gray50">
      <VStack px="$8" py="$6" space="$6">
        {/* Filter and Search Section */}
        <HStack alignItems="flex-start" space="$6">
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
          <VStack flex={1} space="$4">
            {/* Controls Section */}
            <HStack alignItems="center" justifyContent="space-between" mb="$2" space="$4">
              <Input
                borderRadius="$full"
                borderColor="$gray300"
                backgroundColor="$white"
                width="100%"
                maxWidth={400}
                height={44}
                shadowColor="$gray300"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.12}
                shadowRadius={6}
              >
                <InputSlot pl="$4">
                  <Icon as={SearchIcon} size="sm" color="$gray500" />
                </InputSlot>
                <InputField
                  placeholder="Search products..."
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
                  shadowColor="$gray300"
                  shadowOffset={{ width: 0, height: 2 }}
                  shadowOpacity={0.12}
                  shadowRadius={6}
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
                  shadowColor="$gray300"
                  shadowOffset={{ width: 0, height: 2 }}
                  shadowOpacity={0.12}
                  shadowRadius={6}
                >
                  <ButtonText color="$gray800" fontWeight="$semibold">
                    Points descending
                  </ButtonText>
                </Button>
              </HStack>
            </HStack>
            {/* Product Grid */}
            <FlatList
              data={filteredAndSortedProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns}
              columnWrapperStyle={{ justifyContent: "flex-start" }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 40,
                alignItems: "flex-start",
              }}
              style={{ width: "100%" }}
            />
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Catalogue;
