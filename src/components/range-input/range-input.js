import React from 'react';

function RangeInput({
  label = '',
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  onChange = () => {},
  displayValue = '50',
  className = '',
  containerClassName = '',
  id = ''
}) {
  return (
    <article className={`range-input-container ${containerClassName}`}>
      {label && (
        <label htmlFor={id}>
          {label}
          <span className="slider-val">{displayValue}</span>
        </label>
      )}

      <input
        type="range"
        id={id}
        value={value}
        min={String(min)}
        max={String(max)}
        step={String(step)}
        onChange={e => onChange(e.target.value)}
        className={className}
      />
    </article>
  );
}

export default RangeInput;
