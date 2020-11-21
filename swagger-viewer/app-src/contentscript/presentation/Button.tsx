import React from "react"

type Props = {
  onClick: () => void
}

export const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button
      // 親和性のため、GitHub の button と同じ class を適用する
      className="btn"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}
