import React from "react"
import styled from "styled-components"
import { Button } from "./Button"

type Props = {
  onClickExpandAll: () => void
  onClickCollapseAll: () => void
}

export const ActionBar: React.FC<Props> = ({
  onClickExpandAll,
  onClickCollapseAll,
}) => {
  return (
    <Root>
      <Button onClick={onClickExpandAll}>Expand All</Button>
      <Button onClick={onClickCollapseAll}>Collapse All</Button>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px 5px 5px 0;

  & > button {
    margin-left: 3px;
  }
`
