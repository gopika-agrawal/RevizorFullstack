// import React, { useState } from 'react'

// import { useForm } from 'react-hook-form';
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import { Link } from 'react-router-dom';

// const SignupForm = ({setIsLoggedIn}) => {

//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting }
//     } = useForm();


//     const [ showPassword, setShowPassword ] = useState(false);
//     const [ confirmPassword, setConfirmPassword ] = useState(false);


//     async function onSubmit(data){
//         await new Promise((resolve) => setTimeout(resolve,4000))
//         setIsLoggedIn(true);
//         console.log(data);
//     }


//   return (
//     <div>

//         {/* signup form */}

//         <form onSubmit={handleSubmit(onSubmit)}>


//             {/* first and last name... */}
//             <div>

//                 <div>
//                     <label>FirstName</label>
//                     <input
//                         type='text'
//                         placeholder='Enter First Name'
//                         {...register("firstname", {
//                             required: true,
//                             pattern: {value: /^[a-zA-Z]+$/, message:"Firstname is not valid"},
//                             minLength: {value: 3, message:"Length should be greater than 3"},
//                             maxLength: {value: 20, message:"Length should be less than 20"}
//                         })}
//                     />
//                     {errors.firstname && 
//                         (<p>{errors.firstname.message}</p>)
//                     }
//                 </div>

//                 <div>
//                     <label>LastName</label>
//                     <input
//                         type='text'
//                         placeholder='Enter Last Name'
//                         {...register("lastname", {
//                             required: true,
//                             pattern: {value: /^[a-zA-Z]+$/, message:"Lastname is not valid"},
//                             minLength: {value: 3, message:"Length should be greater than 3"},
//                             maxLength: {value: 20, message:"Length should be less than 20"}
//                         })}
//                     />
//                     {errors.lastname && 
//                         (<p>{errors.lastname.message}</p>)
//                     }
//                 </div>

//             </div>


//             {/* email... */}
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


//             {/* Password and confirm password... */}
//             <div>

//                 <div>
//                     <label>Create Password</label>
//                     <input
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder='Enter Password'
//                         {...register("createPassword",{
//                             required: true,
//                             pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password must contains Uppercase, Lowercase, Digit, Symbol"},
//                             minLength: {value: 8, message: "Password should be greater than 8"}
//                         })}
//                     />
//                     <span onClick={() => setShowPassword((prev) => !prev)}>
//                         { showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
//                     </span>
//                     {errors.createPassword && 
//                         (<p>{errors.createPassword.message}</p>)
//                     }
//                 </div>


//                 <div>
//                     <label>Confirm Password</label>
//                     <input
//                         type={confirmPassword ? 'text' : 'password'}
//                         placeholder='Confirm Password'
//                         {...register("confirmPassword",{
//                             required: true,
//                             pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password must contains Uppercase, Lowercase, Digit, Symbol"},
//                             minLength: {value: 8, message: "Password should be greater than 8"}
//                         })}
//                     />
//                     <span onClick={() => setConfirmPassword((prev) => !prev)}>
//                         { showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
//                     </span>
//                     {errors.confirmPassword && 
//                         (<p>{errors.confirmPassword.message}</p>)
//                     }
//                 </div>

//             </div>



//             <input type='submit' disabled={isSubmitting}
//                 value={isSubmitting ? "Signing up" : "Sign up"}
//             />

            
//         </form>



//         <div>
//             <p>Already have an account?
//                 <span>
//                     <Link to={"login"}>Login here</Link>
//                 </span>
//             </p>
//         </div>

//     </div>
//   )
// }

// export default SignupForm






import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = ({ setIsLoggedIn }) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm();

    const password = watch("password");


    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);

    const navigate = useNavigate();


    async function onSubmit(data) {
        try{
            const response = await fetch("https://revizorfullstack-production.up.railway.app/users", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if(!response.ok){
                toast.error(
                    "Signup failed"
                );
                return;
            }
            const output = await response.json();

            localStorage.setItem("token", output.token);
            localStorage.setItem("hasVisited", "true");
            localStorage.setItem(
                "userId",
                output.userId
            );

            localStorage.setItem(
                "university",
                output.university
            );
            
            localStorage.setItem("isLoggedIn", "true");

            setIsLoggedIn(true);
            toast.success("Account created successfully");
            navigate("/home");
            
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


                {/* FIRST + LAST NAME */}
                <div className='grid md:grid-cols-2 gap-5'>

                    {/* FIRST NAME */}
                    <div className='space-y-3'>

                        <label className='
                        text-[#07122b]
                        font-semibold
                        text-base
                        sm:text-lg
                        '>
                            First Name
                        </label>

                        <input
                            type='text'
                            placeholder='Enter First Name'

                            {...register("firstName", {
                                required: "First Name is required",
                                pattern: {
                                    value: /^[a-zA-Z ]+$/,
                                    message: "Firstname is not valid"
                                },
                                minLength: {
                                    value: 3,
                                    message: "Length should be greater than 3"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Length should be less than 20"
                                }
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
                            errors.firstName &&
                            (
                                <p className='text-red-500 text-sm'>
                                    {errors.firstName.message}
                                </p>
                            )
                        }

                    </div>



                    {/* LAST NAME */}
                    <div className='space-y-3'>

                        <label className='
                        text-[#07122b]
                        font-semibold
                        text-base
                        sm:text-lg
                        '>
                            Last Name
                        </label>

                        <input
                            type='text'
                            placeholder='Enter Last Name'

                            {...register("lastName", {
                                required: "Last Name is required",
                                pattern: {
                                    value: /^[a-zA-Z ]+$/,
                                    message: "Lastname is not valid"
                                },
                                minLength: {
                                    value: 3,
                                    message: "Length should be greater than 3"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Length should be less than 20"
                                }
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
                            errors.lastName &&
                            (
                                <p className='text-red-500 text-sm'>
                                    {errors.lastName.message}
                                </p>
                            )
                        }

                    </div>

                </div>



                {/* EMAIL */}
                <div className='space-y-3'>

                    <label className='
                    text-[#07122b]
                    font-semibold
                    text-base
                    sm:text-lg
                    '>
                        Email
                    </label>

                    <input
                        type='text'
                        placeholder='username@gmail.com'

                        {...register("email", {
                            required: "Email is required",
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



                {/* PASSWORDS */}
                <div className='grid md:grid-cols-2 gap-5'>

                    {/* CREATE PASSWORD */}
                    <div className='space-y-3'>

                        <label className='
                        text-[#07122b]
                        font-semibold
                        text-base
                        sm:text-lg
                        '>
                            Create Password
                        </label>

                        <div className='relative'>

                            <input
                                type={showPassword ? 'text' : 'password'}

                                placeholder='Enter Password'

                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "Password must contains Uppercase, Lowercase, Digit, Symbol"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Password should be greater than 8"
                                    }
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

                    </div>



                    {/* CONFIRM PASSWORD */}
                    <div className='space-y-3'>

                        <label className='
                        text-[#07122b]
                        font-semibold
                        text-base
                        sm:text-lg
                        '>
                            Confirm Password
                        </label>

                        <div className='relative'>

                            <input
                                type={confirmPassword ? 'text' : 'password'}

                                placeholder='Confirm Password'

                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: value =>
                                        value === password ||
                                        "Passwords do not match"
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
                                onClick={() => setConfirmPassword((prev) => !prev)}

                                className='
                                absolute

                                right-5 top-1/2

                                -translate-y-1/2

                                cursor-pointer
                                '
                            >

                                {
                                    confirmPassword
                                        ? (<AiOutlineEyeInvisible fontSize={24} fill='#5f6c8d' />)
                                        : (<AiOutlineEye fontSize={24} fill='#5f6c8d' />)
                                }

                            </button>

                        </div>

                        {
                            errors.confirmPassword &&
                            (
                                <p className='text-red-500 text-sm'>
                                    {errors.confirmPassword.message}
                                </p>
                            )
                        }

                    </div>

                </div>


                {/* University */}
                <div className='space-y-3'>

                    <label className='
                    text-[#07122b]
                    font-semibold
                    text-base
                    sm:text-lg
                    '>
                        University
                    </label>

                    <input
                        type='text'
                        placeholder='Dr. A.P.J. Abdul Kalam Technical University, Lucknow'

                        {...register("university", {
                            required: "University is required"
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
                        errors.university &&
                        (
                            <p className='text-red-500 text-sm'>
                                {errors.university.message}
                            </p>
                        )
                    }

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
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    '
                >

                    {
                        isSubmitting
                            ? "Signing up..."
                            : "Sign Up"
                    }

                </button>

            </form>



            {/* LOGIN */}
            <div className='mt-8 text-center'>

                <p className='text-[#5f6c8d] text-lg'>

                    Already have an account?

                    <span className='ml-2'>

                        <Link
                            to={"/login"}

                            className='
                            text-[#27c7b8]

                            font-semibold

                            hover:underline
                            '
                        >
                            Login here
                        </Link>

                    </span>

                </p>

            </div>

        </div>

    )
}

export default SignupForm









// import React, { useState } from 'react'
// import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import { Link } from 'react-router-dom';

// const SignupForm = ({setIsLoggedIn}) => {

//     const [ formData, setFormData ] = useState({
//         firstname: "",
//         lastname: "",
//         email: "",
//         createPassword: "",
//         confirmPassword: ""
//     });
    
//     const [ showPassword, setShowPassword ] = useState(false);
//     const [ confirmPassword, setConfirmPassword ] = useState(false);

//     const changeHandler = (event) => {
//         const {name, value} = event.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }))
//     }

//     const submitHandler = (event) => {
//         event.preventDefault();
//         setIsLoggedIn(true);
//         console.log(formData);
//     }

//   return (
//     <div>

//         {/* signup form */}

//         <form onSubmit={submitHandler}>

//             <div>

//                 <label>
//                     <p>FirstName</p>
//                     <input
//                         type='text'
//                         placeholder='Enter First Name'
//                         name='firstname'
//                         value={formData.firstname}
//                         onChange={changeHandler}
//                         required
//                     />
//                 </label>

//                 <label>
//                     <p>LastName</p>
//                     <input
//                         type='text'
//                         placeholder='Enter Last Name'
//                         name='lastname'
//                         value={formData.lastname}
//                         onChange={changeHandler}
//                         required
//                     />
//                 </label>

//             </div>

//             <div>

//                 <label>
//                     <p>Email</p>
//                     <input
//                         type='email'
//                         placeholder='username@gmail.com'
//                         name='email'
//                         value={formData.email}
//                         onChange={changeHandler}
//                         required
//                     />
//                 </label>

//             </div>

//             <div>

//                 <label>
//                     <p>Create Password</p>
//                     <input
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder='Enter First Name'
//                         name='createPassword'
//                         value={formData.createPassword}
//                         onChange={changeHandler}
//                         required
//                     />

//                     <span onClick={() => setShowPassword((prev) => !prev)}>
//                         {
//                             showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) 
//                         }
//                     </span>

//                 </label>

//                 <label>
//                     <p>Confirm Password</p>
//                     <input
//                         type={confirmPassword ? 'text' : 'password'}
//                         placeholder='Enter First Name'
//                         name='confirmPassword'
//                         value={formData.confirmPassword}
//                         onChange={changeHandler}
//                         required
//                     />

//                     <span onClick={() => setConfirmPassword((prev) => !prev)}>
//                         {
//                             confirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) 
//                         }
//                     </span>

//                 </label>

//             </div>

//             <button>Sign up</button>

            
//         </form>

//         <div>
//             <p>Already have an account?
//                 <span>
//                     <Link to={"login"}>Login here</Link>
//                 </span>
//             </p>
//         </div>

//     </div>
//   )
// }

// export default SignupForm