import React from 'react'

const Button = ({children, className, ...buttonProps} : any) => {
  const classname = `bg-[#35c0e4] text-white px-3 py-2 font-semibold rounded hover:bg-[#3498db] flex flex-row ${className}`

  return (
    <button className={classname} {...buttonProps}>{children}</button>
  )
}

export default Button