import React, { useRef } from 'react';
import './range-input.scss';

const countDecimals = (num) => {
  if (Math.floor(num) === num) return 0;
  return num.toString().split('.')[1].length || 0;
};

const normalizeInput = (val, step, min, max) => {
  const numVal = Number(val);
  if (Number.isNaN(numVal)) {
    return null;
  }
  let normVal = Math.round(numVal / step) * step;
  normVal = Number(normVal.toFixed(countDecimals(step)));
  normVal = Math.max(min, normVal);
  normVal = Math.min(max, normVal);
  return normVal;
};

function RangeInput({
  label = '',
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  onChange = () => {},
  className = '',
  containerClassName = '',
  id = '',
  editable = false,
  unit = '',
  unitSide = 'right',
}) {
  const inputRef = useRef();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current.blur();
    }
  };

  const handleBlur = () => {
    const newVal = normalizeInput(inputRef.current.value, step, min, max);
    if (newVal || newVal === 0) {
      onChange(newVal);
    }
  };

  return (
    <article className={`range-input-container ${containerClassName}`}>
      {label && (
        <label className="slider-label-container" htmlFor={id}>
          <span className="slider-label">{label}</span>

          <span className="slider-val-container">
            {unit && unitSide === 'left' && (
              <div className="slider-val-unit">
                <span>{unit}</span>
              </div>
            )}
            {editable ? (
              <input
                contentEditable
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
                className="slider-val-input"
                type="number"
                min={String(min)}
                max={String(max)}
                step={String(step)}
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            ) : (
              <div className="slider-val">{value}</div>
            )}
            {unit && unitSide === 'right' && (
              <div className="slider-val-unit">
                <span>{unit}</span>
              </div>
            )}
          </span>
        </label>
      )}

      <input
        type="range"
        id={id}
        value={value}
        min={String(min)}
        max={String(max)}
        step={String(step)}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    </article>
  );
}

export default RangeInput;
