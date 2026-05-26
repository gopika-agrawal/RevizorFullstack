import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginForm = ({setIsLoggedIn}) => {

    const [ showPassword, setShowPassword ] = useState(false);
 
    const [ formData, setFormData ] = useState({
        email: "",
        password: ""
    });

    const changeHandler = (event) => {
        const {name, value} = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const submitHandler = (event) => {
        event.preventDefault();
        setIsLoggedIn(true);
        console.log(formData);
    }

    

  return (
    <div>

        {/* login form */}

        <form onSubmit={submitHandler}>

            <label>
                <p>Email</p>
                <input
                    type='text'
                    placeholder='username@gmail.com'
                    name='email'
                    value={formData.email}
                    onChange={changeHandler}
                    required
                />
            </label>


            <label>
                <p>Password</p>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter Password'
                    name='password'
                    value={formData.password}
                    onChange={changeHandler}
                    required
                />

                <span onClick={() => setShowPassword((prev) => !prev)}>
                    { showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
                </span>

                <Link to={"#"}>
                    <p>ForgotPassword</p>
                </Link>

            </label>

            <button>Long in</button>

        </form>


        <div>
            <p>Don't have an account yet?
                <span>
                    <Link to={"/signup"}>Signup for free</Link>
                </span>
            </p>
        </div>


    </div>
  )
}

export default LoginForm