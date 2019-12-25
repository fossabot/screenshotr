/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { gradienta } from 'lib/gradienta';
import styles from './gradient-picker.module.scss';

const GradientPicker = ({ onChange = () => {}, styling = {} }) => {
  const [displayGradientPicker, setDisplayGradientPicker] = useState(false);

  const handleClick = () => setDisplayGradientPicker(!displayGradientPicker);
  const handleChange = newGradient => {
    console.log(newGradient);
    onChange(newGradient);
  };
  return (
    <div className={styles['swatch-container']}>
      <div className={styles.swatch} onClick={handleClick}>
        <div className={styles.color} style={styling} />
      </div>
      {displayGradientPicker ? (
        <div className={styles.popover}>
          <div className={styles.gradient_picker}>
            {gradienta.map((gradient, i) => (
              <div
                key={`grandienta-${i}`}
                className={styles.gradient_tile}
                style={gradient}
                onClick={() => handleChange(gradient)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GradientPicker;
