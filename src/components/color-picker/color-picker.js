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
              '#D0021B',
              '#F5A623',
              '#F8E71C',
              '#8B572A',
              '#7ED321',
              '#417505',
              '#BD10E0',
              '#9013FE',
              '#4A90E2',
              '#50E3C2',
              '#B8E986',
              '#000000',
              '#4A4A4A',
              '#9B9B9B',
              '#FFFFFF',
              'transparent'
            ]}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
