import React from 'react';
import styles from './row-input.module.scss';

function RowInput({
  label = '',
  options = [
    { value: 'val1', label: 'Value 1' },
    { value: 'val2', label: 'Value 2' },
    { value: 'val3', label: 'Value 3' }
  ],
  value = 'val1',
  containerClassName = '',
  onChange = () => {}
}) {
  const handleOptionChange = option => {
    console.log(option);
    onChange(option);
  };

  return (
    <article
      className={`${styles['row-input-container']} ${containerClassName}`}
    >
      {label && <label className={styles['row-input-label']}>{label}</label>}

      <div className={styles['row-input']}>
        {options.map(option => {
          const isSelected = option.value === value;

          return (
            <div
              className={`${styles['row-input-option']} ${
                isSelected ? styles.selected : ''
              }`}
              key={option.value}
            >
              <label>
                <input
                  type="radio"
                  value={option.value}
                  checked={isSelected}
                  onChange={() => handleOptionChange(option.value)}
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
