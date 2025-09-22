import React from 'react'

function Container({children}: {children?: React.ReactNode}) {
  return (
    <div className="flex flex-col bg-white p-3 rounded-md shadow-(--card-shadow) gap-5 mt-3">
        {children}
    </div>
  )
}

export default Container