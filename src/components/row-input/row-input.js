/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './row-input.scss';

function RowInput({
  label = '',
  options = [
    { value: 'val1', label: 'Value 1' },
    { value: 'val2', label: 'Value 2' },
    { value: 'val3', label: 'Value 3' }
  ],
  value = { value: 'val1', label: 'Value 1' },
  id = '',
  containerClassName = '',
  onChange = () => {}
}) {
  const handleClick = option => {
    console.log(option);
    onChange(option);
  };

  return (
    <article className={`row-input-container ${containerClassName}`}>
      {label && <label htmlFor={id}>{label}</label>}

      <div className="row-input">
        {options.map(option => {
          const isSelected =
            option.value === value.value && option.label === value.label;

          return (
            <div
              className={`row-input-option ${isSelected ? 'selected' : ''}`}
              onClick={() => handleClick(option)}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default RowInput;
