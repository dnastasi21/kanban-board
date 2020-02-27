import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function HeaderCustom() {
  return (
    <>
      <Menu secondary>
        <Menu.Item>
          <Link to="/">
            <Icon name="tasks" size="big" />
          </Link>
        </Menu.Item>
      </Menu>
    </>
  )
}

export default HeaderCustom
