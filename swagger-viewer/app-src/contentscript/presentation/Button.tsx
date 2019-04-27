import React from "react"

type Props = {
  onClick: () => void
}

export const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button
      // 親和性のため、GitHub の button の class 名と同じ
      className="btn"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
