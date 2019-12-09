import React, { createContext, useState } from 'react';

const OptionsContext = createContext();

const OptionsProvider = ({ children }) => {
  const [options, setOptions] = useState({
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
    verticalPadding: 50,
    horizontalPadding: 50
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
