import type { JSX } from 'react'

type SaveIconProps = React.SVGProps<SVGSVGElement> & {
   size?: number
   color?: string
}

const SaveIcon = ({ size = 24, color = '#000', ...props }: SaveIconProps): JSX.Element => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width ?? size}
      height={props.height ?? size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
   >
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h12m-6-6v12" />
   </svg>
)

export default SaveIcon
