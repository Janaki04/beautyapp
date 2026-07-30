import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('luneva_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('luneva_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1, selectedShade = null) => {
    setCart((prevCart) => {
      const shadeKey = selectedShade ? (selectedShade.id || selectedShade.name) : 'default';
      const existingIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.shadeKey === shadeKey
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: selectedShade?.price ?? product.price,
          image: product.image || (product.images && product.images[0]),
          brand: product.brand,
          selectedShade: selectedShade,
          shadeKey: shadeKey,
          quantity: quantity,
        }
      ];
    });
  };

  const removeFromCart = (productId, shadeKey = 'default') => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.shadeKey === shadeKey))
    );
  };

  const updateQuantity = (productId, shadeKey = 'default', quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, shadeKey);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.shadeKey === shadeKey
          ? { ...item, quantity }
          : item
      )
    );
  };

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const toggleCart = (product) => {
    if (isInCart(product.id)) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    } else {
      addToCart(product, 1);
    }
  };

  const clearCart = () => setCart([]);

  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        toggleCart,
        clearCart,
        totalItemsCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};