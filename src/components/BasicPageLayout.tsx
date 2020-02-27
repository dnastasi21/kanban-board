import React from 'react'
import { Container } from 'semantic-ui-react'
import HeaderCustom from './HeaderCustom'

function BasicPageLayout(props): JSX.Element {
  return (
    <Container>
      <HeaderCustom />
      {props.children}
    </Container>
  )
}

export default BasicPageLayout
