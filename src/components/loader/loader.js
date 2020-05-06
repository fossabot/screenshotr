import React from 'react';
import styles from './loader.module.scss';

const Loader = ({ color = '#333' }) => {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
};

export const BrowserLoader = () => (
  <div className={styles['loader-container']}>
    <div className={styles['browser-loader']}>
      <header>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </header>
    </div>
    <div className={styles['loader-floor']} />
  </div>
);

export const LoaderFill = () => {
  return (
    <article
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <BrowserLoader />
      <h2
        style={{
          fontWeight: 400,
          fontSize: '1.625rem',
          marginTop: '.5rem',
        }}
      >
        Please wait while we grab your screenshot
      </h2>
    </article>
  );
};

export default Loader;
