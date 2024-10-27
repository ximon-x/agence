"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  size?: number;
};

type Dimensions = {
  width: number;
  height: number;
};

const sizeToDimensions = (size?: number): Dimensions => {
  return size
    ? {
        width: size,
        height: size,
      }
    : {
        width: 200,
        height: 200,
      };
};

function AgenceLightIcon({ size }: Props) {
  const { width, height } = sizeToDimensions(size);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      zoomAndPan="magnify"
      viewBox="0 0 375 374.999991"
      height={height}
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <clipPath id="3618242c5a">
          <path
            d="M 187.5 0 C 83.945312 0 0 83.945312 0 187.5 C 0 291.054688 83.945312 375 187.5 375 C 291.054688 375 375 291.054688 375 187.5 C 375 83.945312 291.054688 0 187.5 0 Z M 187.5 0 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="25d1a3ecec">
          <path
            d="M 108 46 L 236 46 L 236 185 L 108 185 Z M 108 46 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="c8910193ca">
          <path
            d="M 131.15625 23.121094 L 258.015625 69.292969 L 211.839844 196.152344 L 84.984375 149.980469 Z M 131.15625 23.121094 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="2cb417f301">
          <path
            d="M 194.585938 46.207031 L 108.320312 85.863281 L 139.691406 97.28125 L 116.355469 161.398438 L 180.46875 184.734375 L 203.804688 120.617188 L 235.175781 132.035156 Z M 194.585938 46.207031 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="f0386e87c4">
          <path
            d="M 115 170 L 173 170 L 173 201 L 115 201 Z M 115 170 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="f36365a1d6">
          <path
            d="M 119.328125 170.738281 L 172.1875 189.976562 L 168.339844 200.550781 L 115.480469 181.308594 Z M 119.328125 170.738281 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="c8b009f14a">
          <path
            d="M 115 190 L 161 190 L 161 213 L 115 213 Z M 115 190 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="da75ce5678">
          <path
            d="M 118.203125 190.28125 L 160.488281 205.671875 L 157.921875 212.71875 L 115.636719 197.328125 Z M 118.203125 190.28125 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="c9dee58717">
          <path
            d="M 117 206 L 151 206 L 151 222 L 117 222 Z M 117 206 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="b214588471">
          <path
            d="M 118.355469 206.300781 L 150.070312 217.84375 L 148.789062 221.367188 L 117.074219 209.824219 Z M 118.355469 206.300781 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="7521434939">
          <path
            d="M 139 190 L 267 190 L 267 329 L 139 329 Z M 139 190 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="eb2aac787e">
          <path
            d="M 243.84375 351.878906 L 116.984375 305.707031 L 163.15625 178.847656 L 290.015625 225.019531 Z M 243.84375 351.878906 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="9ba270f558">
          <path
            d="M 180.414062 328.792969 L 266.679688 289.136719 L 235.308594 277.71875 L 258.644531 213.601562 L 194.527344 190.265625 L 171.191406 254.382812 L 139.820312 242.964844 Z M 180.414062 328.792969 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="b13f40610c">
          <path
            d="M 202 174 L 260 174 L 260 205 L 202 205 Z M 202 174 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="e24ad83c8d">
          <path
            d="M 255.667969 204.261719 L 202.8125 185.023438 L 206.660156 174.449219 L 259.515625 193.691406 Z M 255.667969 204.261719 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="b3499ac649">
          <path
            d="M 214 162 L 260 162 L 260 185 L 214 185 Z M 214 162 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="d7a6fd7105">
          <path
            d="M 256.796875 184.71875 L 214.511719 169.328125 L 217.074219 162.28125 L 259.363281 177.671875 Z M 256.796875 184.71875 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="ebfdf15397">
          <path
            d="M 224 153 L 258 153 L 258 169 L 224 169 Z M 224 153 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="0d4ed18a2e">
          <path
            d="M 256.640625 168.699219 L 224.925781 157.15625 L 226.207031 153.632812 L 257.921875 165.175781 Z M 256.640625 168.699219 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#3618242c5a)">
        <rect
          x="-37.5"
          width="450"
          fill="#ffffff"
          y="-37.499999"
          height="449.999989"
          fillOpacity="1"
        />
      </g>
      <g clipPath="url(#25d1a3ecec)">
        <g clipPath="url(#c8910193ca)">
          <g clipPath="url(#2cb417f301)">
            <path
              fill="#000000"
              d="M 131.15625 23.121094 L 258.015625 69.292969 L 211.839844 196.152344 L 84.984375 149.980469 Z M 131.15625 23.121094 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
      <g clipPath="url(#f0386e87c4)">
        <g clipPath="url(#f36365a1d6)">
          <path
            fill="#000000"
            d="M 119.328125 170.738281 L 172.1875 189.976562 L 168.339844 200.550781 L 115.480469 181.308594 Z M 119.328125 170.738281 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#c8b009f14a)">
        <g clipPath="url(#da75ce5678)">
          <path
            fill="#000000"
            d="M 118.203125 190.28125 L 160.488281 205.671875 L 157.921875 212.71875 L 115.636719 197.328125 Z M 118.203125 190.28125 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#c9dee58717)">
        <g clipPath="url(#b214588471)">
          <path
            fill="#000000"
            d="M 118.355469 206.300781 L 150.070312 217.84375 L 148.789062 221.367188 L 117.074219 209.824219 Z M 118.355469 206.300781 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#7521434939)">
        <g clipPath="url(#eb2aac787e)">
          <g clipPath="url(#9ba270f558)">
            <path
              fill="#000000"
              d="M 243.84375 351.878906 L 116.984375 305.707031 L 163.15625 178.847656 L 290.015625 225.019531 Z M 243.84375 351.878906 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
      <g clipPath="url(#b13f40610c)">
        <g clipPath="url(#e24ad83c8d)">
          <path
            fill="#000000"
            d="M 255.667969 204.261719 L 202.8125 185.023438 L 206.660156 174.449219 L 259.515625 193.691406 Z M 255.667969 204.261719 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#b3499ac649)">
        <g clipPath="url(#d7a6fd7105)">
          <path
            fill="#000000"
            d="M 256.796875 184.71875 L 214.511719 169.328125 L 217.074219 162.28125 L 259.363281 177.671875 Z M 256.796875 184.71875 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#ebfdf15397)">
        <g clipPath="url(#0d4ed18a2e)">
          <path
            fill="#000000"
            d="M 256.640625 168.699219 L 224.925781 157.15625 L 226.207031 153.632812 L 257.921875 165.175781 Z M 256.640625 168.699219 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );
}
function AgenceDarkIcon({ size }: Props) {
  const { width, height } = sizeToDimensions(size);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      zoomAndPan="magnify"
      viewBox="0 0 375 374.999991"
      height={height}
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <clipPath id="0c4614aabe">
          <path
            d="M 187.5 0 C 83.945312 0 0 83.945312 0 187.5 C 0 291.054688 83.945312 375 187.5 375 C 291.054688 375 375 291.054688 375 187.5 C 375 83.945312 291.054688 0 187.5 0 Z M 187.5 0 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="5a13e1656e">
          <path
            d="M 108 46 L 236 46 L 236 185 L 108 185 Z M 108 46 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="b66f88b9f7">
          <path
            d="M 131.15625 23.121094 L 258.015625 69.292969 L 211.839844 196.152344 L 84.984375 149.980469 Z M 131.15625 23.121094 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="f976fe1f19">
          <path
            d="M 194.585938 46.207031 L 108.320312 85.863281 L 139.691406 97.28125 L 116.355469 161.398438 L 180.46875 184.734375 L 203.804688 120.617188 L 235.175781 132.035156 Z M 194.585938 46.207031 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="6e7e270486">
          <path
            d="M 115 170 L 173 170 L 173 201 L 115 201 Z M 115 170 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="d3fecd6c16">
          <path
            d="M 119.328125 170.738281 L 172.1875 189.976562 L 168.339844 200.550781 L 115.480469 181.308594 Z M 119.328125 170.738281 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="df69bdaddf">
          <path
            d="M 115 190 L 161 190 L 161 213 L 115 213 Z M 115 190 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="06916e2257">
          <path
            d="M 118.203125 190.28125 L 160.488281 205.671875 L 157.921875 212.71875 L 115.636719 197.328125 Z M 118.203125 190.28125 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="303a03c383">
          <path
            d="M 117 206 L 151 206 L 151 222 L 117 222 Z M 117 206 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="9fe85b2547">
          <path
            d="M 118.355469 206.300781 L 150.070312 217.84375 L 148.789062 221.367188 L 117.074219 209.824219 Z M 118.355469 206.300781 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="ba1c5abbb2">
          <path
            d="M 139 190 L 267 190 L 267 329 L 139 329 Z M 139 190 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="8396f403ef">
          <path
            d="M 243.84375 351.878906 L 116.984375 305.707031 L 163.15625 178.847656 L 290.015625 225.019531 Z M 243.84375 351.878906 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="eb2b098dc6">
          <path
            d="M 180.414062 328.792969 L 266.679688 289.136719 L 235.308594 277.71875 L 258.644531 213.601562 L 194.527344 190.265625 L 171.191406 254.382812 L 139.820312 242.964844 Z M 180.414062 328.792969 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="703ad8c701">
          <path
            d="M 202 174 L 260 174 L 260 205 L 202 205 Z M 202 174 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="b3e51f53af">
          <path
            d="M 255.667969 204.261719 L 202.8125 185.023438 L 206.660156 174.449219 L 259.515625 193.691406 Z M 255.667969 204.261719 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="be73b528c8">
          <path
            d="M 214 162 L 260 162 L 260 185 L 214 185 Z M 214 162 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="ebb305fd9f">
          <path
            d="M 256.796875 184.71875 L 214.511719 169.328125 L 217.074219 162.28125 L 259.363281 177.671875 Z M 256.796875 184.71875 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="93e4c9a49c">
          <path
            d="M 224 153 L 258 153 L 258 169 L 224 169 Z M 224 153 "
            clipRule="nonzero"
          />
        </clipPath>
        <clipPath id="67bb0df5cb">
          <path
            d="M 256.640625 168.699219 L 224.925781 157.15625 L 226.207031 153.632812 L 257.921875 165.175781 Z M 256.640625 168.699219 "
            clipRule="nonzero"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#0c4614aabe)">
        <rect
          x="-37.5"
          width="450"
          fill="#000000"
          y="-37.499999"
          height="449.999989"
          fillOpacity="1"
        />
      </g>
      <g clipPath="url(#5a13e1656e)">
        <g clipPath="url(#b66f88b9f7)">
          <g clipPath="url(#f976fe1f19)">
            <path
              fill="#ffffff"
              d="M 131.15625 23.121094 L 258.015625 69.292969 L 211.839844 196.152344 L 84.984375 149.980469 Z M 131.15625 23.121094 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
      <g clipPath="url(#6e7e270486)">
        <g clipPath="url(#d3fecd6c16)">
          <path
            fill="#ffffff"
            d="M 119.328125 170.738281 L 172.1875 189.976562 L 168.339844 200.550781 L 115.480469 181.308594 Z M 119.328125 170.738281 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#df69bdaddf)">
        <g clipPath="url(#06916e2257)">
          <path
            fill="#ffffff"
            d="M 118.203125 190.28125 L 160.488281 205.671875 L 157.921875 212.71875 L 115.636719 197.328125 Z M 118.203125 190.28125 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#303a03c383)">
        <g clipPath="url(#9fe85b2547)">
          <path
            fill="#ffffff"
            d="M 118.355469 206.300781 L 150.070312 217.84375 L 148.789062 221.367188 L 117.074219 209.824219 Z M 118.355469 206.300781 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#ba1c5abbb2)">
        <g clipPath="url(#8396f403ef)">
          <g clipPath="url(#eb2b098dc6)">
            <path
              fill="#ffffff"
              d="M 243.84375 351.878906 L 116.984375 305.707031 L 163.15625 178.847656 L 290.015625 225.019531 Z M 243.84375 351.878906 "
              fillOpacity="1"
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
      <g clipPath="url(#703ad8c701)">
        <g clipPath="url(#b3e51f53af)">
          <path
            fill="#ffffff"
            d="M 255.667969 204.261719 L 202.8125 185.023438 L 206.660156 174.449219 L 259.515625 193.691406 Z M 255.667969 204.261719 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#be73b528c8)">
        <g clipPath="url(#ebb305fd9f)">
          <path
            fill="#ffffff"
            d="M 256.796875 184.71875 L 214.511719 169.328125 L 217.074219 162.28125 L 259.363281 177.671875 Z M 256.796875 184.71875 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
      <g clipPath="url(#93e4c9a49c)">
        <g clipPath="url(#67bb0df5cb)">
          <path
            fill="#ffffff"
            d="M 256.640625 168.699219 L 224.925781 157.15625 L 226.207031 153.632812 L 257.921875 165.175781 Z M 256.640625 168.699219 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </g>
    </svg>
  );
}

export default function AgenceIcon({ size }: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (theme === "dark") {
    return <AgenceDarkIcon size={size} />;
  } else if (theme === "light") {
    return <AgenceLightIcon size={size} />;
  }
}
