import React, { useState, useEffect } from "react";
import { GluestackUIProvider, Box } from "@gluestack-ui/themed";
import { config } from "./gluestack-ui.config";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import Catalogue from "./src/screens/Catalogue";
import ProductDetails from "./src/screens/ProductDetails";
import Leaderboard from "./src/screens/Leaderboard";
import Feedback from "./src/screens/feedback/Feedback";
import Profile from "./src/screens/Profile";
import * as ScreenOrientation from "expo-screen-orientation";
import ProductRequest from "./src/screens/feedback/ProductRequest";
import RateUs from "./src/screens/feedback/RateUs";
export default function App() {
  // Navigation state
  const [currentView, setCurrentView] = useState("catalogue");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // screen orietnation
  useEffect(() => {
    const unlockScreenOerientation = async () => {
      await ScreenOrientation.unlockAsync();
    };
    unlockScreenOerientation();
  }, []);
  // Navigation handlers
  const handleTabChange = (tabId) => {
    setCurrentView(tabId);
    // Clear selected product when navigating away from product details
    if (tabId !== "productDetails") {
      setSelectedProduct(null);
    }
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setCurrentView("productDetails");
  };

  const handleBackToCatalogue = () => {
    setCurrentView("catalogue");
    setSelectedProduct(null);
  };

  // Render the appropriate component based on current view
  const renderCurrentView = () => {
    switch (currentView) {
      case "catalogue":
        return <Catalogue onProductPress={handleProductPress} />;

      case "productDetails":
        return (
          <ProductDetails
            product={selectedProduct}
            onBack={handleBackToCatalogue}
            onAddToCart={(product) => {
              console.log("Add to cart:", product);
              // Add your cart logic here
            }}
            onWishlist={(product) => {
              console.log("Add to wishlist:", product);
              // Add your wishlist logic here
            }}
          />
        );

      case "leaderboard":
        return <Leaderboard />;

      case "feedback":
        return (
          <Feedback
            onNavigateToProductRequest={() => setCurrentView("productRequest")}
            onNavigateToRateUs={() => setCurrentView("rateUs")} // if you want RateUs too
          />
        );
      case "productRequest":
        return <ProductRequest onBack={() => setCurrentView("feedback")} />;

      case "rateUs":
        return <RateUs />; // import this component!
      case "profile":
        return <Profile />;

      default:
        return <Catalogue onProductPress={handleProductPress} />;
    }
  };

  return (
    <GluestackUIProvider config={config}>
      <Box flex={1} backgroundColor="$gray50">
        {/* Persistent Header */}
        <Header
          activeTab={
            currentView === "productDetails" ? "catalogue" : currentView
          }
          onTabChange={handleTabChange}
        />

        {/* Dynamic Content */}
        {renderCurrentView()}
      </Box>
    </GluestackUIProvider>
  );
}
