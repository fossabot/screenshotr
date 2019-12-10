/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Checkboard } from 'react-color/lib/components/common';
import styles from './color-picker.module.scss';

const ColorPicker = ({ onChange = () => {}, color = 'transparent' }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => setDisplayColorPicker(!displayColorPicker);
  const handleClose = () => setDisplayColorPicker(false);
  const handleChange = newColor => onChange(newColor);
  return (
    <div>
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
          <div className={styles.cover} onClick={handleClose} />
          <SketchPicker
            width={266}
            color={color}
            onChange={handleChange}
            presetColors={[
              'transparent',
              '#1abc9c',
              '#2ecc71',
              '#3498db',
              '#9b59b6',
              '#34495e',
              '#f1c40f',
              '#e67e22',
              '#e74c3c',
              '#95a5a6',
              '#ffffff',
              '#16a085',
              '#27ae60',
              '#2980b9',
              '#8e44ad',
              '#2c3e50',
              '#f39c12',
              '#d35400',
              '#c0392b',
              '#7f8c8d'
            ]}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
