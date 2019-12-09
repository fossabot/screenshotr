import React, { useContext, useState } from 'react';
import Select from 'react-select';
import './sidebar.scss';
import OptionsContext from '../../contexts/options-context';

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

function Sidebar({ handleDownloadClick }) {
  const { options, updateOptions } = useContext(OptionsContext);

  const { style, resolution, verticalPadding, horizontalPadding } = options;

  // const [horizontalPadding, setHorizontalPadding] = useState(50);
  // const [verticalPadding, setVerticalPadding] = useState(50);

  return (
    <article id="sidebar">
      <button
        className="download-button"
        type="button"
        onClick={handleDownloadClick}
      >
        Download
      </button>
      <Select
        className="style-select select"
        options={styleOptions}
        onChange={newStyle => {
          updateOptions({ style: newStyle });
        }}
        value={style}
      />
      <Select
        className="resolution-select select"
        options={resolutions}
        onChange={newResolution => {
          updateOptions({ resolution: newResolution });
        }}
        value={resolution}
      />
      <article className="range-slider-container">
        <label htmlFor="padding-horizontal">
          Horizontal Padding
          <span className="slider-val">{horizontalPadding}px</span>
        </label>
        <input
          id="padding-horizontal"
          type="range"
          value={horizontalPadding}
          onChange={e => {
            console.log(e.target.value);
            updateOptions({ horizontalPadding: e.target.value });
          }}
        />
      </article>
      <article className="range-slider-container">
        <label htmlFor="vertical-padding">
          Vertical Padding
          <span className="slider-val">{verticalPadding}px</span>
        </label>
        <input
          id="vertical-padding"
          type="range"
          value={verticalPadding}
          onChange={e => {
            console.log(e.target.value);
            updateOptions({ verticalPadding: e.target.value });
          }}
        />
      </article>
    </article>
  );
}

export default Sidebar;
