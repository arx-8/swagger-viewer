import React from "react"

type Props = {
  children: React.ReactNode
  onClick: () => void
}

export const Button = ({ children, onClick }: Props): JSX.Element => {
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
