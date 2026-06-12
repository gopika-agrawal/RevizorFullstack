import Template from '@/acomponents/Template'
import React from 'react'

const Signup = ({setIsLoggedIn}) => {
  return (
      <Template 
          formType="signup"
          setIsLoggedIn={setIsLoggedIn}
      />
  );
}

export default Signup