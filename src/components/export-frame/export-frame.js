import React, { useContext } from 'react';
import { Checkboard } from 'react-color/lib/components/common';
import OptionsContext from '../../contexts/options-context';
import './export-frame.scss';

function ExportFrame({ children }) {
  const { options } = useContext(OptionsContext);
  const { outputWidth, background } = options;

  return (
    <article id="export" style={{ width: `${outputWidth}%`, background }}>
      <div className="do-not-export">
        <Checkboard />
      </div>
      <div
        className="export-background"
        style={{ background: background || 'transparent' }}
      />
      {/* <span className="export-size do-not-export">
              {exportSize.width} x {exportSize.height}
            </span> */}
      {children}
    </article>
  );
}

export default ExportFrame;
