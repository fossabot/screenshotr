import React, { useContext } from 'react';
import Select from 'react-select';
import ColorPicker from 'components/color-picker/color-picker';
import RangeInput from 'components/range-input/range-input';
import GithubButton from 'components/github-button/github-button';
import RowInput from 'components/row-input/row-input';
import OptionsContext from 'contexts/options-context';
import OutputContext from 'contexts/output-context';
import {
  GITHUB_LINK,
  RESOLUTION_OPTIONS,
  STYLE_OPTIONS,
  SHADOW_OPTIONS,
  DARK_LIGHT_OPTIONS,
  ADDRESS_BAR_OPTIONS
} from 'constants.js';
import './sidebar.scss';

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
    darkLight,
    address
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
            options={STYLE_OPTIONS}
            onChange={newStyle => {
              updateOptions({ style: newStyle });
            }}
            value={style}
          />
        </article>
        {hasDarkLightOption && (
          <RowInput
            name="dark-light"
            options={DARK_LIGHT_OPTIONS}
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
          options={SHADOW_OPTIONS}
          value={shadow}
          onChange={option => updateOptions({ shadow: option.value })}
        />
        <RowInput
          label="Address Bar"
          name="address-bar"
          options={ADDRESS_BAR_OPTIONS}
          value={address}
          onChange={option => updateOptions({ address: option.value })}
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
            options={RESOLUTION_OPTIONS}
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
