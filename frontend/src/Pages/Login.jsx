import Template from '@/acomponents/Template'
import React from 'react'

const Login = ({ setIsLoggedIn }) => {

  return (

    <div>
        <Template 
            formType="login"
            setIsLoggedIn={setIsLoggedIn}
        />
    </div>
  )
}

export default Login