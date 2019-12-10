import React, { useContext } from 'react';
import Select from 'react-select';
import OptionsContext from '../../contexts/options-context';
import ColorPicker from '../color-picker/color-picker';
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
        <article className="input-container">
          <label htmlFor="output-width">
            Output Width
            <span className="slider-val">
              {Number(outputWidth).toFixed(1)}%
            </span>
          </label>
          <input
            id="output-width"
            type="range"
            value={outputWidth}
            min="20"
            step="0.5"
            onChange={e => {
              console.log(e.target.value);
              updateOptions({ outputWidth: e.target.value });
            }}
          />
        </article>
        <article className="input-container">
          <label htmlFor="horizontal-padding">
            Horizontal Padding
            <span className="slider-val">{horizontalPadding}px</span>
          </label>
          <input
            id="horizontal-padding"
            type="range"
            value={horizontalPadding}
            max="200"
            onChange={e => {
              console.log(e.target.value);
              updateOptions({ horizontalPadding: e.target.value });
            }}
          />
        </article>
        <article className="input-container">
          <label htmlFor="vertical-padding">
            Vertical Padding
            <span className="slider-val">{verticalPadding}px</span>
          </label>
          <input
            id="vertical-padding"
            type="range"
            value={verticalPadding}
            max="200"
            onChange={e => {
              console.log(e.target.value);
              updateOptions({ verticalPadding: e.target.value });
            }}
          />
        </article>
        <article className="input-container">
          <label htmlFor="control-scale">
            Browser Control Scale
            <span className="slider-val">{controlScale * 100}%</span>
          </label>
          <input
            id="vertical-padding"
            type="range"
            value={controlScale}
            min="0.5"
            max="2"
            step="0.25"
            onChange={e => {
              console.log(e.target.value);
              updateOptions({ controlScale: e.target.value });
            }}
          />
        </article>
      </div>
    </article>
  );
}

export default Sidebar;
