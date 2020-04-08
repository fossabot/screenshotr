/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Checkboard } from 'react-color/lib/components/common';
import { LeftArrowIcon } from 'components/icons/icons';
import gradienta from 'lib/gradienta';
import webgradients from 'lib/webgradients';
import RowInput from 'components/row-input/row-input';
import { BACKGROUND_TYPES } from 'constants.js';
import styles from './color-picker.module.scss';

const gradientaList = gradienta.map((g, index) => ({ ...g, index }));

const ColorPicker = ({ onChange = () => {}, background = {} }) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const [currentBackgroundType, setBackgroundType] = useState(
    () => BACKGROUND_TYPES[0]
  );

  const handleClick = () => setDisplayColorPicker(!displayColorPicker);
  const handleChange = (newColor) => {
    console.log(newColor);
    onChange(newColor);
  };

  return (
    <>
      <div className={styles['swatch-container']}>
        <div className={styles.swatch} onClick={handleClick}>
          <Checkboard />

          <div className={styles.color} style={background} />
        </div>
      </div>
      <div
        className={`${styles['color-picker-menu']} ${
          displayColorPicker ? styles.open : styles.closed
        }`}
      >
        <header onClick={handleClick}>
          <LeftArrowIcon />
          <span>Background</span>
        </header>
        <RowInput
          name=""
          options={BACKGROUND_TYPES}
          value={currentBackgroundType}
          onChange={(option) => setBackgroundType(option)}
          containerClassName={styles['color-picker-row-picker']}
        />
        <h3 className="label">Current</h3>
        <div
          className={styles['swatch-container']}
          style={{ marginBottom: '2rem' }}
        >
          <div className={styles.swatch} style={{ cursor: 'default' }}>
            <Checkboard />
            <div className={styles.color} style={background} />
          </div>
        </div>
        {currentBackgroundType.value === 'solid' && (
          <SketchPicker
            disableAlpha
            width={266}
            color={background.background}
            onChange={(newColor) => handleChange({ background: newColor.hex })}
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
              '#7f8c8d',
            ]}
          />
        )}
        {currentBackgroundType.value === 'gradient' && (
          <div className={styles.gradient_picker}>
            {Object.keys(webgradients).map((gradientKey) => (
              <div
                key={gradientKey}
                className={styles.gradient_tile}
                style={webgradients[gradientKey]}
                onClick={() => handleChange(webgradients[gradientKey])}
              />
            ))}
          </div>
        )}
        {currentBackgroundType.value === 'stripes' && (
          <div className={styles.gradient_picker}>
            {gradientaList.map((gradient) => (
              <div
                key={`grandienta-${gradient.index}`}
                className={styles.gradient_tile}
                style={gradient}
                onClick={() => handleChange(gradient)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ColorPicker;
