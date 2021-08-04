import React from 'react'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import { setLocalStorage } from '~/src/helpers/localStorage'
import { APP_TOKEN, GET_ME } from '~/src/models'
import { CLIENT_ID } from '~/src/utils/constants'
import styles from '~/styles/components/screen/loginGoogle.module.scss'

export const LoginGoogle = ({ setAppToken }) => {
  const responseGoogle = (response: GoogleLoginResponse) => {
    if (response) {
      setLocalStorage(GET_ME, JSON.stringify(response.profileObj))
      setLocalStorage(APP_TOKEN, JSON.stringify(response.accessToken))
      setAppToken(JSON.stringify(response.accessToken))
    }
  }

  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Login with Google"
      className={styles.buttonLoginGoogle}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}
