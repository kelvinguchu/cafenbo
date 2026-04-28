import React from 'react'

type LogoProps = {
  className?: string
}

export default function Logo({ className }: Readonly<LogoProps>) {
  return (
    <img
      src="/logo-white.png"
      alt="Café NBO"
      className={className}
      style={{ display: 'block', width: '30%', height: 'auto' }}
    />
  )
}
