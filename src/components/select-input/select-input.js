/* eslint-disable no-nested-ternary */
import React from 'react';
import Select from 'react-select';

function SelectInput({ id, isDisabled, options, onChange, value }) {
  const customSelectStyles = {
    control: (provided, state) => ({
      display: 'flex',
      flexDirection: 'row',
      borderRadius: 4,
      border: '2px solid',
      borderColor: state.isDisabled
        ? 'hsl(0,0%,60%)'
        : state.isFocused
        ? '#0f7fbf'
        : '#222',
      cursor: 'pointer',
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      margin: 0,
      borderLeft: '2px solid',
      borderColor: state.isDisabled
        ? 'hsl(0,0%,60%)'
        : state.isFocused
        ? '#0f7fbf'
        : '#222',
    }),
    menu: (provided) => ({
      ...provided,
      border: '2px solid #0f7fbf',
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected
        ? '#0f7fbf'
        : state.isFocused
        ? '#E7F2F9'
        : '#fff',
      cursor: 'pointer',
    }),
  };

  return (
    <Select
      id={id}
      styles={customSelectStyles}
      isDisabled={isDisabled}
      className="resolution-select select"
      options={options}
      onChange={onChange}
      value={value}
    />
  );
}

export default SelectInput;
