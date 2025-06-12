
import { createContext, useContext, useState } from 'react';

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <ItemsContext.Provider value={{ items, addItem, clearItems }}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => useContext(ItemsContext);