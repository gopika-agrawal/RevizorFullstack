import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const SignupForm = ({setIsLoggedIn}) => {

    const [ formData, setFormData ] = useState({
        firstname: "",
        lastname: "",
        email: "",
        createPassword: "",
        confirmPassword: ""
    });
    
    const [ showPassword, setShowPassword ] = useState(false);
    const [ confirmPassword, setConfirmPassword ] = useState(false);

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setIsLoggedIn(true);
        console.log(formData);
    }

  return (
    <div>

        {/* signup form */}

        <form onSubmit={submitHandler}>

            <div>

                <label>
                    <p>FirstName</p>
                    <input
                        type='text'
                        placeholder='Enter First Name'
                        name='firstname'
                        value={formData.firstname}
                        onChange={changeHandler}
                        required
                    />
                </label>

                <label>
                    <p>LastName</p>
                    <input
                        type='text'
                        placeholder='Enter Last Name'
                        name='lastname'
                        value={formData.lastname}
                        onChange={changeHandler}
                        required
                    />
                </label>

            </div>

            <div>

                <label>
                    <p>Email</p>
                    <input
                        type='email'
                        placeholder='username@gmail.com'
                        name='email'
                        value={formData.email}
                        onChange={changeHandler}
                        required
                    />
                </label>

            </div>

            <div>

                <label>
                    <p>Create Password</p>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter First Name'
                        name='createPassword'
                        value={formData.createPassword}
                        onChange={changeHandler}
                        required
                    />

                    <span onClick={() => setShowPassword((prev) => !prev)}>
                        {
                            showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) 
                        }
                    </span>

                </label>

                <label>
                    <p>Confirm Password</p>
                    <input
                        type={confirmPassword ? 'text' : 'password'}
                        placeholder='Enter First Name'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        required
                    />

                    <span onClick={() => setConfirmPassword((prev) => !prev)}>
                        {
                            confirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) 
                        }
                    </span>

                </label>

            </div>

            <button>Sign up</button>

            
        </form>

        <div>
            <p>Already have an account?
                <span>
                    <Link to={"login"}>Login here</Link>
                </span>
            </p>
        </div>

    </div>
  )
}

export default SignupForm