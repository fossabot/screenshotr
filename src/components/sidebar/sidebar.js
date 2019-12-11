import React, { useContext } from 'react';
import Select from 'react-select';
import ColorPicker from '../color-picker/color-picker';
import RangeInput from '../range-input/range-input';
import GithubButton from '../github-button/github-button';
import OptionsContext from '../../contexts/options-context';
import OutputContext from '../../contexts/output-context';
import RowInput from '../row-input/row-input';
import { GITHUB_LINK } from '../../constants';
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
    value: 'apple',
    label: 'Apple'
  },
  {
    value: 'windows10',
    label: 'Windows 10'
  },
  {
    value: 'windows98',
    label: 'Windows 98'
  }
];

const shadowOptions = [
  {
    value: 'shadow-none',
    label: 'None'
  },
  {
    value: 'shadow-small',
    label: 'Small'
  },
  {
    value: 'shadow-large',
    label: 'Large'
  }
];

const darkLightOptions = [
  {
    value: 'dark',
    label: 'Dark'
  },
  {
    value: 'light',
    label: 'Light'
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
    controlScale,
    shadow,
    darkLight
  } = options;
  console.log('style', style);
  const hasDarkLightOption =
    style?.value?.toLowerCase()?.includes('apple') ||
    style?.value?.toLowerCase()?.includes('windows10');

  const { loading, screenshot } = useContext(OutputContext).output;

  return (
    <article id="sidebar">
      <div className="sidebar-content">
        <button
          className="download-button"
          type="button"
          onClick={handleDownloadClick}
          disabled={loading || !screenshot}
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
        {hasDarkLightOption && (
          <RowInput
            name="dark-light"
            options={darkLightOptions}
            value={darkLight}
            onChange={option => updateOptions({ darkLight: option.value })}
          />
        )}

        <article className="input-container">
          <label htmlFor="background-color">Background Color</label>
          <ColorPicker
            id="background-color"
            onChange={newColor => updateOptions({ background: newColor.hex })}
            color={background}
          />
        </article>
        <RowInput
          label="Shadow"
          name="shadow"
          options={shadowOptions}
          value={shadow}
          onChange={option => updateOptions({ shadow: option.value })}
        />
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
            isDisabled={loading}
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
      <GithubButton link={GITHUB_LINK} color="#fff" />
    </article>
  );
}

export default Sidebar;
