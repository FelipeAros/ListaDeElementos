import React, { useState } from 'react';
import { AppProvider, useAppContext } from './AppContext';

// Componente funcional para el formulario de entrada
const InputForm: React.FC = () => {
  const { addItem } = useAppContext();
  const [inputText, setInputText] = useState<string>('');

  const handleAddItem = () => {
    if (inputText.trim() !== '') {
      addItem(inputText);
      setInputText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Ingrese un elemento..."
      />
      <button onClick={handleAddItem}>Agregar</button>
    </div>
  );
};

// Componente funcional para la lista de elementos
const ItemList: React.FC = () => {
  const { itemList, removeItem } = useAppContext();

  return (
    <ul>
      {itemList.map((item) => (
        <li key={item.id} onClick={() => removeItem(item.id)} style={{ cursor: 'pointer' }}>
          {item.text}
        </li>
      ))}
    </ul>
  );
};

// Componente principal que engloba los componentes anteriores
const App: React.FC = () => {
  return (
    <div>
      <h1>Lista de Elementos</h1>
      <InputForm />
      <ItemList />
    </div>
  );
};

// Componente wrapper que proporciona el contexto a la aplicación
const AppWrapper: React.FC = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default AppWrapper;
