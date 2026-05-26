import React from 'react'
import formImage from '../assets/formImage.png'
import logo from '../assets/logo.png'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Template = ({formType,setIsLoggedIn}) => {

  return (
    <div>


        {/* login/signup text and logo image */}
        <div>

            {
                formType === "login" ? (<h1>Login</h1>) : (<h1>Signup</h1>)
            }
            

            <img src={logo} alt='Logo' className='h-10 w-10'/>
            
        </div>




        {/* Form */}
        <div>
            {formType === "login" ? (<LoginForm setIsLoggedIn={setIsLoggedIn}/>) : (<SignupForm setIsLoggedIn={setIsLoggedIn}/>)}
        </div>




        {/* Image */}

        <div>
            <img src={formImage} alt='FormImage'/>
        </div>
    </div>
  )
}

export default Template