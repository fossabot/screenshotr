import React, { useContext } from 'react';
import Select from 'react-select';
import OptionsContext from '../../contexts/options-context';
import ColorPicker from '../color-picker/color-picker';
import RangeInput from '../range-input/range-input';
import './sidebar.scss';

const resolutions = [
  {
    label: '1024 x 576',
    value: {
      height: 576,
      width: 1024
    }
  },
  {
    label: '1152 x 648',
    value: {
      height: 648,
      width: 1152
    }
  },
  {
    label: '1280 x 720',
    value: {
      height: 720,
      width: 1280
    }
  },
  {
    label: '1366 x 768',
    value: {
      height: 768,
      width: 1366
    }
  },
  {
    label: '1600 x 900',
    value: {
      height: 900,
      width: 1600
    }
  },
  {
    label: '1920 x 1080',
    value: {
      height: 1080,
      width: 1920
    }
  }
];

const styleOptions = [
  {
    value: 'mondrian',
    label: 'Mondrian'
  },
  {
    value: 'apple dark',
    label: 'Apple Dark'
  },
  {
    value: 'apple light',
    label: 'Apple Light'
  },
  {
    value: 'windows',
    label: 'Windows 10'
  },
  {
    value: 'windows98',
    label: 'Windows 98'
  }
];

function Sidebar({ handleDownloadClick, exportSize }) {
  const { options, updateOptions } = useContext(OptionsContext);

  const {
    style,
    resolution,
    verticalPadding,
    horizontalPadding,
    outputWidth,
    background,
    controlScale
  } = options;

  return (
    <article id="sidebar">
      <div className="sidebar-content">
        <button
          className="download-button"
          type="button"
          onClick={handleDownloadClick}
        >
          Download
        </button>
        <h2>Style</h2>
        <article className="input-container">
          <label htmlFor="browser-style">Browser Style</label>
          <Select
            id="browser-style"
            className="style-select select"
            options={styleOptions}
            onChange={newStyle => {
              updateOptions({ style: newStyle });
            }}
            value={style}
          />
        </article>
        <article className="input-container">
          <label htmlFor="background-color">Background Color</label>
          <ColorPicker
            id="background-color"
            onChange={newColor => updateOptions({ background: newColor.hex })}
            color={background}
          />
        </article>
        <h2>
          Sizing{' '}
          <span>
            {exportSize.width} x {exportSize.height}
          </span>
        </h2>
        <article className="input-container">
          <label htmlFor="vertical-padding">Screenshot Resolution</label>
          <Select
            id="screenshot-resolution"
            className="resolution-select select"
            options={resolutions}
            onChange={newResolution => {
              updateOptions({ resolution: newResolution });
            }}
            value={resolution}
          />
        </article>
        <RangeInput
          containerClassName="input-container"
          label="Output Width"
            id="output-width"
            value={outputWidth}
          displayValue={`${Number(outputWidth).toFixed(1)}%`}
          min={20}
          max={100}
          step={0.2}
          onChange={val => updateOptions({ outputWidth: val })}
          />
        <RangeInput
          containerClassName="input-container"
          label="Horizontal Padding"
            id="horizontal-padding"
            value={horizontalPadding}
          displayValue={`${horizontalPadding}px`}
          max={200}
          onChange={val => updateOptions({ horizontalPadding: val })}
          />
        <RangeInput
          containerClassName="input-container"
          label="Vertical Padding"
            id="vertical-padding"
            value={verticalPadding}
          displayValue={`${verticalPadding}px`}
          max={200}
          onChange={val => updateOptions({ verticalPadding: val })}
        />
        <RangeInput
          containerClassName="input-container"
          label="Browser Control Scale"
          id="control-scale"
          value={controlScale}
          displayValue={`${controlScale * 100}%`}
          min={0.5}
          max={2}
          step={0.25}
          onChange={val => updateOptions({ controlScale: val })}
          />
      </div>
    </article>
  );
}

export default Sidebar;
