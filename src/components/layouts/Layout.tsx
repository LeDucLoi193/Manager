import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Router from 'next/router'
import { ToastContainer } from 'react-toastify'
import { APP_TOKEN } from '~/src/models'
import { Sidebar } from '~/src/components/widgets/Sidebar'
import { Header } from '~/src/components/widgets/Header'
import { LoginForm } from '~/src/components/screens/login/LoginForm'
import { getLocalStorage } from '~/src/helpers/localStorage'

export const Layout = ({ children }) => {
  const [appToken, setAppToken] = useState<string>('')
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAppToken(() => getLocalStorage(APP_TOKEN))
    }
    else if (!appToken) {
      Router.push({ pathname: '/' })
    }
  }, [])

  const handleSetAppToken = (token) => {
    setAppToken(token)
  }

  return (
    <>
      {!appToken ? (
        <LoginForm setAppToken={handleSetAppToken} />
      ) : (
        <>
          <Header setAppToken={setAppToken} />
          <Row>
            <Col xs="2">
              <Sidebar />
            </Col>
            <Col xs="10">
              <Container className="pt-5 mt-5">{children}</Container>
            </Col>
          </Row>
          <ToastContainer />
        </>
      )}
    </>
  )
}
