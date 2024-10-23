type Props = {
  size?: number;
};

export default function AppIcon({ size }: Props) {
  const [width, height] = size ? [size, size] : [200, 200];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      height={height}
      width={width}
      zoomAndPan="magnify"
      viewBox="0 0 375 374.999991"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <clipPath id="f700a3fd8c">
          <path
            d="M 187.5 0 C 83.945312 0 0 83.945312 0 187.5 C 0 291.054688 83.945312 375 187.5 375 C 291.054688 375 375 291.054688 375 187.5 C 375 83.945312 291.054688 0 187.5 0 Z M 187.5 0 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="3fe7b2bcda">
          <path
            d="M 75 75 L 210 75 L 210 210 L 75 210 Z M 75 75 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="daac851987">
          <path
            d="M 142.5 75 L 75 141.769531 L 108.386719 141.769531 L 108.386719 210 L 176.613281 210 L 176.613281 141.769531 L 210 141.769531 Z M 142.5 75 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="7bc9d901d0">
          <path
            d="M 165 165 L 300 165 L 300 300 L 165 300 Z M 165 165 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="4c41da6170">
          <path
            d="M 232.5 300 L 165 233.230469 L 198.386719 233.230469 L 198.386719 165 L 266.613281 165 L 266.613281 233.230469 L 300 233.230469 Z M 232.5 300 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#f700a3fd8c)">
        <rect
          x="-37.5"
          width="450"
          fill="#000000"
          y="-37.499999"
          height="449.999989"
          fillOpacity="1"
        />
      </g>
      <g clipPath="url(#3fe7b2bcda)">
        <g clipPath="url(#daac851987)">
          <path
            fill="#ffffff"
            d="M 75 75 L 210 75 L 210 210 L 75 210 Z M 75 75 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#7bc9d901d0)">
        <g clipPath="url(#4c41da6170)">
          <path
            fill="#ffffff"
            d="M 165 165 L 300 165 L 300 300 L 165 300 Z M 165 165 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );
}
