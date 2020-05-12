import React, { useContext } from 'react';
import ColorPicker from 'components/color-picker/color-picker';
import RangeInput from 'components/range-input/range-input';
import RowInput from 'components/row-input/row-input';
import SelectInput from 'components/select-input/select-input';
import { DownloadIcon } from 'components/icons/icons';
import OptionsContext from 'contexts/options-context';
import OutputContext from 'contexts/output-context';
import {
  RESOLUTION_OPTIONS,
  STYLE_OPTIONS,
  SHADOW_OPTIONS,
  DARK_LIGHT_OPTIONS,
  ADDRESS_BAR_OPTIONS,
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
    address,
    maxOutputWidth,
    isEyeDropperActive,
  } = options;
  const hasDarkLightOption =
    style?.value?.toLowerCase()?.includes('apple') ||
    style?.value?.toLowerCase()?.includes('windows10');

  const { loading, screenshot, isUpload } = useContext(OutputContext).output;

  return (
    <article id="sidebar">
      <div className="sidebar-content">
        <h2>Style</h2>

        <article className="input-container">
          <label htmlFor="background-color">Background</label>
          <ColorPicker
            id="background-color"
            onChange={(newBackground) =>
              updateOptions({ background: newBackground })
            }
            background={background}
            isEyeDropperDisabled={!screenshot}
            isEyeDropperActive={isEyeDropperActive}
            setEyeDropperActive={(newState) => {
              updateOptions({ isEyeDropperActive: newState });
            }}
          />
        </article>

        <RowInput
          label="Shadow"
          name="shadow"
          options={SHADOW_OPTIONS}
          value={shadow}
          onChange={(option) => updateOptions({ shadow: option.value })}
        />

        <article className="input-container">
          <label htmlFor="browser-style">Browser Style</label>
          <SelectInput
            id="browser-style"
            options={STYLE_OPTIONS}
            onChange={(newStyle) => {
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
            onChange={(option) => updateOptions({ darkLight: option.value })}
          />
        )}

        <RowInput
          label="Address Bar"
          name="address-bar"
          options={ADDRESS_BAR_OPTIONS}
          value={address}
          onChange={(option) => updateOptions({ address: option.value })}
        />
        <h2>
          Sizing{' '}
          <span>
            {exportSize.width} x {exportSize.height}
          </span>
        </h2>
        {!isUpload && (
          <article className="input-container">
            <label htmlFor="vertical-padding">Screenshot Resolution</label>
            <SelectInput
              id="screenshot-resolution"
              isDisabled={loading}
              options={RESOLUTION_OPTIONS}
              onChange={(newResolution) => {
                updateOptions({ resolution: newResolution });
              }}
              value={resolution}
            />
          </article>
        )}

        <RangeInput
          containerClassName="input-container"
          label="Output Width"
          id="output-width"
          value={outputWidth}
          min={400}
          max={maxOutputWidth}
          onChange={(val) => updateOptions({ outputWidth: val })}
          unit="px"
          editable
        />
        <RangeInput
          containerClassName="input-container"
          label="Horizontal Padding"
          id="horizontal-padding"
          value={horizontalPadding}
          max={200}
          onChange={(val) => updateOptions({ horizontalPadding: val })}
          unit="px"
          editable
        />
        <RangeInput
          containerClassName="input-container"
          label="Vertical Padding"
          id="vertical-padding"
          value={verticalPadding}
          max={200}
          onChange={(val) => updateOptions({ verticalPadding: val })}
          unit="px"
          editable
        />
        <RangeInput
          containerClassName="input-container"
          label="Browser Scale"
          id="control-scale"
          value={controlScale}
          min={0.5}
          max={2}
          step={0.25}
          onChange={(val) => updateOptions({ controlScale: val })}
          unit={<div style={{ fontSize: 22 }}>×</div>}
          editable
        />
      </div>
      <button
        className="download-button"
        type="button"
        onClick={handleDownloadClick}
        disabled={loading || !screenshot}
      >
        Download
        <DownloadIcon
          style={{ marginLeft: '0.75rem', marginBottom: '0.25rem' }}
        />
      </button>
    </article>
  );
}

export default Sidebar;
