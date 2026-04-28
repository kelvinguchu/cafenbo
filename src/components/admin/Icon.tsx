import React from 'react'

type IconProps = {
  className?: string
}

export default function Icon({ className }: Readonly<IconProps>) {
  return (
    <img
      src="/logo-vertical-white.png"
      alt="Café NBO"
      className={className}
      style={{ display: 'block', height: '20px', width: '20px' }}
    />
  )
}
