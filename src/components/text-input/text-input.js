import React, { useState, useEffect } from 'react';
import styles from './text-input.module.scss';

function TextInput({
  label = '',
  name = '',
  value = '',
  containerClassName = '',
  onChange = () => {},
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = newValue => {
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <article
      className={`${styles['text-input-container']} ${containerClassName}`}
    >
      {label && <label className={styles['text-input-label']}>{label}</label>}

      <input
        type="search"
        className={styles['text-input']}
        name={name}
        value={inputValue}
        onChange={e => handleChange(e.target.value)}
      />
    </article>
  );
}

export default TextInput;
