import { SVGProps } from 'react'

export const NoArticleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <line
      id="primary-upstroke"
      x1="5.05"
      y1="20.5"
      x2="4.95"
      y2="20.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.95}
    />
    <path
      id="primary"
      d="M10,21h8a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1H7L5,5V9"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      id="primary-2"
      data-name="primary"
      d="M5,5H7V3ZM15,17H9m0-4h6M9,9h6M5,13v3"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
)
