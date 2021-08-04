import React, { useState } from 'react'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CardTitle,
  Card,
} from 'reactstrap'
import fetchApi from '~/src/helpers/fetchApi'
import { setLocalStorage } from '~/src/helpers/localStorage'
import { APP_TOKEN, GET_ME } from '~/src/models'
import { LoginGoogle } from '~/src/components/screens/login/LoginGoogle'
import { Loading } from '~/src/components/elements/Loading'
import styles from '~/styles/components/widgets/login.module.scss'

export const LoginForm = ({ setAppToken }) => {
  const [error, setError] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const [loginAccount, setLoginAccount] = useState({
    email: '',
    password: '',
  })

  const onChangeValue = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setLoginAccount((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onHandleLogin = async (e) => {
    e.preventDefault()
    let params = {
      email: loginAccount.email,
      password: loginAccount.password,
    }
    setIsLoading(true)
    try {
      const response = await fetchApi.postLogin(params)
      if (!response.status) {
        setIsLoading(false)
        return setError((response as any).errors)
      }
      setIsLoading(false)
      setLocalStorage(APP_TOKEN, JSON.stringify((response as any).access_token))
      setLocalStorage(GET_ME, JSON.stringify((response as any).me))
      setAppToken(JSON.stringify((response as any).access_token))
    } catch (error) {
      setIsLoading(false)
      setError(error)
    }
  }

  return (
    <Card className={styles.cardLogin}>
      <CardTitle className={styles.titleLogin}>LOGIN FORM</CardTitle>
      <Form className={styles.formLogin}>
        <FormGroup>
          <Label className="mb-1" for="exampleEmail">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Enter email"
            value={loginAccount.email || ''}
            onChange={onChangeValue}
          />
          {error && error.email ? (
            <span className="text-danger">{error.email[0]}</span>
          ) : null}
        </FormGroup>
        <FormGroup className="mt-3">
          <Label className="mb-1" for="examplePassword">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Enter password"
            value={loginAccount.password || ''}
            onChange={onChangeValue}
          />
          {error && error.password ? (
            <span className="text-danger">{error.password[0]}</span>
          ) : null}
          {error && error.message ? (
            <span className="text-danger">{error.message}</span>
          ) : null}
        </FormGroup>
        <Button className={styles.buttonLogin} active onClick={onHandleLogin}>
          {isLoading ? <Loading /> : 'Login'}
        </Button>
      </Form>
      <div className="mt-3">
        <LoginGoogle setAppToken={setAppToken}/>
      </div>
    </Card>
  )
}
