import React, { createContext, useState } from 'react';
import { DEFAULT_OPTIONS } from 'constants.js';

const OptionsContext = createContext();

const OptionsProvider = ({ children }) => {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const updateOptions = (newOpts) => {
    setOptions((prevOpts) => {
      return {
        ...prevOpts,
        ...newOpts,
      };
    });
  };

  return (
    <OptionsContext.Provider
      value={{
        options,
        updateOptions,
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};

export { OptionsProvider };
export default OptionsContext;
