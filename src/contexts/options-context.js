import React, { createContext } from 'react';
import { useLocalStorage } from '../util/hooks';

const OptionsContext = createContext();

const OptionsProvider = ({ children }) => {
  const [options, setOptions] = useLocalStorage('export-options', {
    resolution: {
      label: '1280 x 720',
      value: {
        height: 720,
        width: 1280
      }
    },
    style: {
      value: 'mondrian',
      label: 'Mondrian'
    },
    verticalPadding: 75,
    horizontalPadding: 75,
    outputWidth: 75,
    background: 'transparent',
    controlScale: 1,
    shadow: 'shadow-large',
    darkLight: 'dark',
    address: 'address-full'
  });

  const updateOptions = newOpts => {
    setOptions(prevOpts => {
      return {
        ...prevOpts,
        ...newOpts
      };
    });
  };

  return (
    <OptionsContext.Provider
      value={{
        options,
        updateOptions
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};

export { OptionsProvider };
export default OptionsContext;
