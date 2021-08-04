import React, { useEffect, useRef } from 'react'
import { NavLink, Navbar, Col, Input } from 'reactstrap'
import { Image } from 'react-bootstrap'
import { IconLogin } from '~/src/components/elements'
import { clearLocalStorage, getLocalStorage, removeLocalStorage } from '~/src/helpers/localStorage'
import { APP_TOKEN, GET_ME } from '~/src/models'
import { IMe } from '~/src/models/users'
import styles from '~/styles/components/widgets/header.module.scss'

export const Header = ({ setAppToken }) => {
  const user = useRef({} as IMe)
  const onHandleLogout = () => {
    removeLocalStorage(APP_TOKEN)
    removeLocalStorage(GET_ME)
    clearLocalStorage()
    setAppToken('')
  }

  // let user = {} as IMe
  useEffect(() => {
    console.log(getLocalStorage(GET_ME));
    if (getLocalStorage(GET_ME)) {
      user.current = JSON.parse(getLocalStorage(GET_ME))
    }
  }, [])
  return (
    <div className={styles.header}>
      <Navbar style={{ backgroundColor: '#282828' }} expand="md">
        <Col xs="4"></Col>
        <Col xs="4">
          <Input
            type="text"
            name="text"
            placeholder="Search..."
          />
        </Col>
        <Col className="d-flex justify-content-end" xs="">
          <NavLink style={{ color: '#FFFFFF' }}>
            <span className="cursor-pointer ml-2" title='Logout'>
              {user.current.name}
            </span>
          </NavLink>
          <NavLink style={{ color: '#FFFFFF' }}>
            <span className="cursor-pointer" title='Logout'>
              <Image src={user.current.imageUrl} className={styles.avatar} alt="avatar" />
            </span>
          </NavLink>
          <NavLink style={{ color: '#FFFFFF' }} onClick={onHandleLogout}>
            <span className="cursor-pointer ml-2" title='Logout'>
              <IconLogin />
            </span>
          </NavLink>
        </Col>
      </Navbar>
    </div>
  )
}
