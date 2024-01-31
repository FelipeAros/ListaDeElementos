import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo para un elemento de la lista
type ListItem = {
  id: number;
  text: string;
};

// Definir el tipo para el contexto
type AppContextType = {
  itemList: ListItem[];
  addItem: (text: string) => void;
  removeItem: (id: number) => void;
};

// Propiedad children con tipo ReactNode
type AppProviderProps = {
  children: ReactNode;
};

// Crear el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Crear el proveedor del contexto
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Estado local para la lista de elementos
  const [itemList, setItemList] = useState<ListItem[]>([]);

  // Función para agregar un nuevo elemento a la lista
  const addItem = (text: string) => {
    const newItem: ListItem = {
      id: Date.now(),
      text,
    };
    setItemList((prevList) => [...prevList, newItem]);
  };

  // Función para eliminar un elemento de la lista por su id
  const removeItem = (id: number) => {
    setItemList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // Objeto de contexto que contiene los datos y funciones necesarios
  const contextValue: AppContextType = {
    itemList,
    addItem,
    removeItem,
  };

  // Proveer el contexto y los datos a los componentes hijos
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Función personalizada para usar el contexto en componentes
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  // Asegurar que useAppContext se utilice dentro de un AppProvider
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
