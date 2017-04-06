import { css, keyframes } from 'styled-components';

const breakpoints = {
  mobile: 375,
  tablet: 480,
  desktop: 840
};

export const media = Object.keys(breakpoints).reduce(
  (collection, breakpoint) => ({
    ...collection,
    [breakpoint]: (...args) => css`
      @media (min-width: ${breakpoints[breakpoint]}px) {
        ${css(...args)}
      }
    `
  }),
  {}
);

export const fill = () => `
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
`;

export const centered = () => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const fullscreen = () => `
  ${size('100vw', '100vh')}
  position: fixed;
  top: 0;
  left: 0;
`;

export const size = (width, height) => `
  width: ${width};
  height: ${height};
`;

export const square = size => `
  width: ${size};
  height: ${size};
`;

export const truncate = width => `
  width: ${width};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const rotate = (duration = '1s') => {
  const rotate360 = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;
  return `
  animation: ${duration} ${rotate360} linear infinite;
`;
};
