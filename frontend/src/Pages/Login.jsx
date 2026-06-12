import Template from '@/acomponents/Template'
import React from 'react'

const Login = ({ setIsLoggedIn }) => {

  return (
      <Template 
          formType="login"
          setIsLoggedIn={setIsLoggedIn}
      />
  );
}

export default Login