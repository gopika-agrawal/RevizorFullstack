// import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import { useForm } from 'react-hook-form';

// const LoginForm = ({setIsLoggedIn}) => {

//     const [ showPassword, setShowPassword ] = useState(false);
 
//     const {
//         register,
//         handleSubmit,
//         formState : { errors, isSubmitting }
//     } = useForm();

//     async function onSubmit(data){
//         await new Promise((resolve) => setTimeout(resolve,4000));
//         setIsLoggedIn(true);
//         console.log(data);
//     }


//   return (
//     <div>

//         {/* login form */}

//         <form onSubmit={handleSubmit(onSubmit)}>

//             <div>
//                 <label>Email</label>
//                 <input
//                     type='text'
//                     placeholder='username@gmail.com'
//                     {...register("email", {
//                         required: true,
//                         pattern: {value: /^\S+@\S+$/i, message: "Invalid Email Address"},
//                     })}
//                 />
//                 {errors.email && 
//                     (<p>{errors.email.message}</p>)
//                 }
//             </div>


//             <div>
//                 <label>Password</label>
//                 <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder='Enter Password'
//                     {...register("password",{
//                         required: true,
//                         pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password must contains Uppercase, Lowercase, Digit, Symbol"},
//                         minLength: {value: 8, message: "Password should be greater than 8"}
//                     })}
//                 />
//                 <span onClick={() => setShowPassword((prev) => !prev)}>
//                     { showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
//                 </span>
//                 {errors.password && 
//                     (<p>{errors.password.message}</p>)
//                 }
//                 <Link to={"#"}>
//                     <p>ForgotPassword</p>
//                 </Link>
//             </div>

//             <input type='submit' disabled={isSubmitting} 
//                 value={isSubmitting ? "Logging in" : "Log in"}
//             />

//         </form>


//         <div>
//             <p>Don't have an account yet?
//                 <span>
//                     <Link to={"/signup"}>Signup for free</Link>
//                 </span>
//             </p>
//         </div>


//     </div>
//   )
// }

// export default LoginForm






import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({ setIsLoggedIn }) => {

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    async function onSubmit(data) {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        // setIsLoggedIn(true);
        // localStorage.setItem("isLoggedIn", "true");
        // navigate("/home");
        // console.log(data);
        try{
            
            const response = await fetch("http://localhost:8080/api/users/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if(!response.ok){

                toast.error(
                    "Invalid email or password"
                );

                return;
            }
            // console.log(response);
            // console.log(response.headers.get("content-type"));
            const result = await response.json();
            console.log(result);
            if(result.message === "Login successful"){
                toast.success("Login successful");
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", "true");
                navigate("/home");
                localStorage.setItem("hasVisited", "true");
                localStorage.setItem("token", result.token);
                localStorage.setItem("userId", result.userId);
                localStorage.setItem("university", result.university);
            }
            else{
                toast.error("Invalid email or password");
            }

        }
        catch(error){
            console.error(error);

            toast.error(
                "Unable to connect to server"
            );
        }
    }

    return (

        <div className='w-full max-w-xl'>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-7'
            >

                {/* EMAIL */}
                <div className='space-y-3'>

                    <label className='
                    text-[#07122b]
                    font-semibold
                    text-lg
                    '>
                        Email
                    </label>

                    <input
                        type='text'
                        placeholder='username@gmail.com'
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9.+_-]+@gmail\.com$/i,
                                message: "Invalid Email Address"
                            },
                        })}
                        className='
                        w-full

                        h-14

                        px-5

                        rounded-2xl

                        bg-white/70
                        backdrop-blur-xl

                        border border-[#dfeceb]

                        outline-none

                        text-[#07122b]

                        shadow-[0_8px_30px_rgba(0,0,0,0.03)]

                        focus:border-[#27c7b8]
                        focus:shadow-[0_0_40px_rgba(39,199,184,0.15)]

                        transition-all duration-300
                        '
                    />

                    {
                        errors.email &&
                        (
                            <p className='text-red-500 text-sm'>
                                {errors.email.message}
                            </p>
                        )
                    }

                </div>



                {/* PASSWORD */}
                <div className='space-y-3'>

                    <label className='
                    text-[#07122b]
                    font-semibold
                    text-base
                    sm:text-lg
                    '>
                        Password
                    </label>

                    <div className='relative'>

                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Enter Password'

                            {...register("password", {
                                required: "Password is required"
                            })}

                            className='
                            w-full

                            h-14

                            px-5 pr-14

                            rounded-2xl

                            bg-white/70
                            backdrop-blur-xl

                            border border-[#dfeceb]

                            outline-none

                            text-[#07122b]

                            shadow-[0_8px_30px_rgba(0,0,0,0.03)]

                            focus:border-[#27c7b8]
                            focus:shadow-[0_0_40px_rgba(39,199,184,0.15)]

                            transition-all duration-300
                            '
                        />

                        <button
                            type='button'
                            onClick={() => setShowPassword((prev) => !prev)}
                            className='
                            absolute

                            right-5 top-1/2

                            -translate-y-1/2

                            cursor-pointer
                            '
                        >

                            {
                                showPassword
                                    ? (<AiOutlineEyeInvisible fontSize={24} fill='#5f6c8d' />)
                                    : (<AiOutlineEye fontSize={24} fill='#5f6c8d' />)
                            }

                        </button>

                    </div>

                    {
                        errors.password &&
                        (
                            <p className='text-red-500 text-sm'>
                                {errors.password.message}
                            </p>
                        )
                    }

                    <div className='flex justify-end'>

                        <Link to={"#"}>

                            <p className='
                            text-[#27c7b8]

                            font-medium

                            hover:underline
                            '>
                                Forgot Password?
                            </p>

                        </Link>

                    </div>

                </div>



                {/* BUTTON */}
                <button
                    type='submit'
                    disabled={isSubmitting}

                    className='
                    w-full

                    h-14

                    rounded-2xl

                    bg-[#07122b]
                    hover:bg-[#0b1735]

                    text-white

                    text-lg
                    font-semibold

                    shadow-[0_10px_40px_rgba(0,0,0,0.10)]

                    hover:shadow-[0_0_50px_rgba(39,199,184,0.25)]

                    transition-all duration-300
                    '
                >

                    {
                        isSubmitting
                            ? "Logging in..."
                            : "Login"
                    }

                </button>

            </form>



            {/* SIGNUP */}
            <div className='mt-8 text-center'>

                <p className='text-[#5f6c8d] text-lg'>

                    Don't have an account yet?

                    <span className='ml-2'>

                        <Link
                            to={"/signup"}

                            className='
                            text-[#27c7b8]

                            font-semibold

                            hover:underline
                            '
                        >
                            Signup for free
                        </Link>

                    </span>

                </p>

            </div>

        </div>
    )
}

export default LoginForm








// import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// const LoginForm = ({setIsLoggedIn}) => {

//     const [ showPassword, setShowPassword ] = useState(false);
 
//     const [ formData, setFormData ] = useState({
//         email: "",
//         password: ""
//     });

//     const changeHandler = (event) => {
//         const {name, value} = event.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));

//     }

//     const submitHandler = (event) => {
//         event.preventDefault();
//         setIsLoggedIn(true);
//         console.log(formData);
//     }

    

//   return (
//     <div>

//         {/* login form */}

//         <form onSubmit={submitHandler}>

//             <label>
//                 <p>Email</p>
//                 <input
//                     type='text'
//                     placeholder='username@gmail.com'
//                     name='email'
//                     value={formData.email}
//                     onChange={changeHandler}
//                     required
//                 />
//             </label>


//             <label>
//                 <p>Password</p>
//                 <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder='Enter Password'
//                     name='password'
//                     value={formData.password}
//                     onChange={changeHandler}
//                     required
//                 />

//                 <span onClick={() => setShowPassword((prev) => !prev)}>
//                     { showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
//                 </span>

//                 <Link to={"#"}>
//                     <p>ForgotPassword</p>
//                 </Link>

//             </label>

//             <button>Long in</button>

//         </form>


//         <div>
//             <p>Don't have an account yet?
//                 <span>
//                     <Link to={"/signup"}>Signup for free</Link>
//                 </span>
//             </p>
//         </div>


//     </div>
//   )
// }

// export default LoginForm