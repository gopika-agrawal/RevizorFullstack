import Template from '@/acomponents/Template'
import React from 'react'

const Signup = ({setIsLoggedIn}) => {
  return (
    <div>
        <Template 
            formType="signup"
            setIsLoggedIn={setIsLoggedIn}
        />
    </div>
  )
}

export default Signup