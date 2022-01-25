import IconProps from "../../types/Icon";

const Logo = (props: IconProps) => {
  return (
    <svg
      width={512}
      height={512}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_ddii_2_2)">
        <path
          d="M53 224c0-82.843 67.157-150 150-150h217c22.091 0 40 17.909 40 40v174c0 82.843-67.157 150-150 150H93c-22.091 0-40-17.909-40-40V224z"
          fill="#1DA1F2"
        />
      </g>
      <path
        d="M107 296.92c-.373-4.64-.64-9.147-.8-13.52-.107-4.373-.16-8.507-.16-12.4 0-6.453.133-12.24.4-17.36.267-5.173.533-9.627.8-13.36-4.587.267-9.04.613-13.36 1.04-4.32.427-8.32.987-12 1.68l.16-13.36c6.24-1.12 12.64-1.92 19.2-2.4 6.56-.533 13.12-.8 19.68-.8 4.693 0 9.173.107 13.44.32 4.32.213 8.453.533 12.4.96l-.08 13.84c-3.733-.587-7.787-.987-12.16-1.2-4.32-.267-8.747-.4-13.28-.4a472.84 472.84 0 00-.72 12.16 297.2 297.2 0 00-.32 14.24c0 4.533.107 9.307.32 14.32.267 5.013.587 10.293.96 15.84l-14.48.4zm64.225.64c-4.427 0-8.187-3.44-11.28-10.32-1.067-2.453-2-5.147-2.8-8.08-.8-2.933-1.493-5.92-2.08-8.96-.533-3.04-.987-5.947-1.36-8.72a576.95 576.95 0 01-.8-7.44c-.16-2.187-.293-3.84-.4-4.96l13.12-3.04c.64 12.107 1.6 21.307 2.88 27.6 1.333 6.293 2.347 9.44 3.04 9.44.373 0 .827-.747 1.36-2.24.587-1.493 1.227-3.467 1.92-5.92.693-2.507 1.36-5.253 2-8.24.64-2.987 1.2-6 1.68-9.04-.64-3.893-1.067-6.987-1.28-9.28l13.52-.48v.96c0 2.187.16 4.747.48 7.68.32 2.933.72 5.973 1.2 9.12.48 3.093.987 5.973 1.52 8.64.587 2.667 1.147 4.827 1.68 6.48.533 1.653.987 2.48 1.36 2.48.32 0 .773-.72 1.36-2.16.587-1.44 1.227-3.413 1.92-5.92.747-2.507 1.493-5.36 2.24-8.56a306.966 306.966 0 002.16-10.24 156.484 156.484 0 001.68-10.8l13.2 2.8c-.907 5.067-2 10.107-3.28 15.12-1.227 4.96-2.533 9.573-3.92 13.84-1.387 4.213-2.747 7.76-4.08 10.64-2.987 6.347-6.693 9.52-11.12 9.52-1.44 0-3.093-.453-4.96-1.36-1.813-.853-3.493-2.667-5.04-5.44-.533-1.013-1.067-2.24-1.6-3.68a57.353 57.353 0 01-1.52-4.8 72.093 72.093 0 01-1.92 5.28c-2.827 6.72-6.453 10.08-10.88 10.08zm56.894-.72c0-8.32.107-15.813.32-22.48.267-6.72.587-12.827.96-18.32.427-5.547.88-10.693 1.36-15.44.534-4.8 1.04-9.387 1.52-13.76l13.76.56c-.213 1.653-.453 3.44-.72 5.36a252.44 252.44 0 015.92 8.4c2.187 3.147 4.4 6.48 6.64 10a432.263 432.263 0 016.72 10.48c2.187 3.467 4.267 6.8 6.24 10a435.39 435.39 0 015.2 8.48c.374-3.68.56-8.853.56-15.52 0-3.413-.053-6.933-.16-10.56-.106-3.627-.24-7.093-.4-10.4-.16-3.36-.373-6.347-.64-8.96-.266-2.667-.56-4.747-.88-6.24l15.04-1.84c.107 2.613.16 6.053.16 10.32.054 4.213.08 8.693.08 13.44 0 4.213-.026 8.453-.08 12.72-.053 4.213-.16 8.107-.32 11.68-.16 3.573-.4 6.533-.72 8.88-.586 4.587-1.76 7.973-3.52 10.16-1.76 2.187-4.24 3.28-7.44 3.28-2.613 0-5.013-.907-7.2-2.72-2.133-1.813-4.453-4.8-6.96-8.96a723.245 723.245 0 00-6-9.92 614.056 614.056 0 00-7.04-11.6c-2.4-3.947-4.72-7.707-6.96-11.28-.426 6.24-.746 12.48-.96 18.72-.213 6.187-.32 11.787-.32 16.8v4.48c0 1.44.027 2.773.08 4l-14.24.24zm72.964-.32a35.718 35.718 0 01-.16-1.68v-2.4c0-2.187.053-4.853.16-8 .16-3.2.346-6.667.56-10.4.213-3.787.453-7.6.72-11.44.266-3.893.533-7.627.8-11.2.32-3.627.613-6.853.88-9.68-.854.107-1.68.213-2.48.32l-1.76-13.6c5.546-.747 11.44-1.28 17.68-1.6 6.293-.32 12.426-.48 18.4-.48 4.48 0 8.773.107 12.88.32 4.16.16 7.893.4 11.2.72l-1.2 13.28c-2.454-.48-5.254-.8-8.4-.96-3.147-.213-6.534-.32-10.16-.32-3.734 0-7.6.107-11.6.32-3.947.16-7.787.373-11.52.64a907.16 907.16 0 00-.64 6.64c-.16 2.293-.32 4.667-.48 7.12 2.773-.373 5.84-.64 9.2-.8 3.413-.16 6.8-.24 10.16-.24 3.84 0 7.44.107 10.8.32 3.413.213 6.026.587 7.84 1.12l-.96 12.88a163.1 163.1 0 00-10.48-.88 145.79 145.79 0 00-9.52-.32c-6.027 0-11.974.4-17.84 1.2-.32 5.6-.587 10.933-.8 16-.16 5.067-.294 9.333-.4 12.8l-12.88.32zm89.745.4c-.373-4.64-.64-9.147-.8-13.52-.107-4.373-.16-8.507-.16-12.4 0-6.453.133-12.24.4-17.36.267-5.173.533-9.627.8-13.36-4.587.267-9.04.613-13.36 1.04-4.32.427-8.32.987-12 1.68l.16-13.36c6.24-1.12 12.64-1.92 19.2-2.4 6.56-.533 13.12-.8 19.68-.8 4.693 0 9.173.107 13.44.32 4.32.213 8.453.533 12.4.96l-.08 13.84c-3.733-.587-7.787-.987-12.16-1.2-4.32-.267-8.747-.4-13.28-.4a472.84 472.84 0 00-.72 12.16 297.2 297.2 0 00-.32 14.24c0 4.533.107 9.307.32 14.32.267 5.013.587 10.293.96 15.84l-14.48.4z"
        fill="#F2F2F2"
      />
      <defs>
        <filter
          id="filter0_ddii_2_2"
          x={49}
          y={74}
          width={419}
          height={372}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.215686 0 0 0 0 0.34902 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={4} dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.215686 0 0 0 0 0.34902 0 0 0 0.25 0" />
          <feBlend
            in2="effect1_dropShadow_2_2"
            result="effect2_dropShadow_2_2"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_2_2"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.216901 0 0 0 0 0.35 0 0 0 0.25 0" />
          <feBlend in2="shape" result="effect3_innerShadow_2_2" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx={4} dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.215686 0 0 0 0 0.34902 0 0 0 0.25 0" />
          <feBlend
            in2="effect3_innerShadow_2_2"
            result="effect4_innerShadow_2_2"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Logo;
