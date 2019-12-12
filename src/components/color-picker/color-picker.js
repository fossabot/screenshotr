/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Checkboard } from 'react-color/lib/components/common';
import styles from './color-picker.module.scss';

const ColorPicker = ({ onChange = () => {}, color = 'transparent' }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => setDisplayColorPicker(!displayColorPicker);
  const handleChange = newColor => {
    console.log(newColor);
    onChange(newColor);
  };
  return (
    <div className={styles['swatch-container']}>
      <div className={styles.swatch} onClick={handleClick}>
        <Checkboard />

        <div
          className={styles.color}
          style={{
            background: color
          }}
        />
      </div>
      {displayColorPicker ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={handleClick} />
          <SketchPicker
            disableAlpha
            color={color}
            onChange={handleChange}
            presetColors={[
              'transparent',
              '#1abc9c',
              '#2ecc71',
              '#3498db',
              '#9b59b6',
              '#f1c40f',
              '#e67e22',
              '#e74c3c',
              '#ffffff',
              '#16a085',
              '#27ae60',
              '#2980b9',
              '#8e44ad',
              '#f39c12',
              '#d35400',
              '#c0392b'
            ]}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
