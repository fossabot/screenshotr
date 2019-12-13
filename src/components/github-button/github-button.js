import React from 'react';
import { GithubIcon } from 'components/icons/icons';
import './github-button.scss';

const GithubButton = ({ link = '' }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="github-button"
    >
      <GithubIcon className="github-button-icon" />
    </a>
  );
};

export default GithubButton;
