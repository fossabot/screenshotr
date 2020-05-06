import React from 'react';
import styles from './row-input.module.scss';

function RowInput({
  label = '',
  name = '',
  options = [
    { value: 'val1', label: 'Value 1' },
    { value: 'val2', label: 'Value 2' },
    { value: 'val3', label: 'Value 3' },
  ],
  value = 'val1',
  containerClassName = '',
  onChange = () => {},
  vertical = false,
}) {
  return (
    <article
      className={`${styles['row-input-container']} ${containerClassName}`}
    >
      {label && <label className={styles['row-input-label']}>{label}</label>}

      <div
        className={`${styles['row-input']} ${vertical ? styles.vertical : ''}`}
      >
        {options.map((option) => {
          const isSelected =
            typeof value === 'string'
              ? option.value === value
              : option.value === value.value;

          return (
            <div
              className={`${styles['row-input-option']} ${
                isSelected ? styles.selected : ''
              }`}
              key={option.value}
            >
              <label htmlFor={option.value}>
                <input
                  type="radio"
                  name={name}
                  id={option.value}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => onChange(option)}
                />
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default RowInput;
