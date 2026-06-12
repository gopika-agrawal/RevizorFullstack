// import React from 'react'

// import formImage from '../assets/formImage.png'
// import logo from '../assets/logo.png'
// import LoginForm from './LoginForm'
// import SignupForm from './SignupForm'

// const Template = ({formType,setIsLoggedIn}) => {

//   return (
//     <div>


//         {/* login/signup text and logo image */}
//         <div>

//             {
//                 formType === "login" ? (<h1>Login</h1>) : (<h1>Signup</h1>)
//             }
            

//             <img src={logo} alt='Logo' className='h-10 w-10'/>
            
//         </div>




//         {/* Form */}
//         <div>
//             {formType === "login" ? (<LoginForm setIsLoggedIn={setIsLoggedIn}/>) : (<SignupForm setIsLoggedIn={setIsLoggedIn}/>)}
//         </div>




//         {/* Image */}

//         <div>
//             <img src={formImage} alt='FormImage'/>
//         </div>
//     </div>
//   )
// }

// export default Template






import React from 'react'
import formImage from '../assets/formImage.png'
import logo from '../assets/logo.png'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Template = ({ formType, setIsLoggedIn }) => {

  return (

    <div className='
    min-h-screen

    bg-[#f7fbfa]

    relative
    overflow-hidden

    flex items-center justify-center

    px-6 py-10
    '>

        {/* GRID BACKGROUND */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfeceb_1px,transparent_1px),linear-gradient(to_bottom,#dfeceb_1px,transparent_1px)] bg-[size:60px_60px] opacity-60"></div>


        {/* MAIN CONTAINER */}
        <div className='
        relative z-10

        max-w-7xl w-full

        bg-white/55
        backdrop-blur-2xl

        border border-[#dfeceb]

        rounded-[40px]

        shadow-[0_20px_80px_rgba(0,0,0,0.08)]

        overflow-hidden
        '>

            <div className='grid lg:grid-cols-2 items-center min-h-[650px] lg:min-h-[750px]'>

                {/* LEFT SIDE */}
                <div className='
                px-6
                sm:px-10
                md:px-16

                py-10
                sm:py-16

                flex flex-col justify-center
                '>

                    {/* LOGO */}
                    <div className='mb-10'>

                        <div className='
                        inline-flex items-center gap-3

                        px-5 py-3

                        rounded-2xl

                        bg-white/70
                        backdrop-blur-xl

                        border border-[#dfeceb]

                        shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                        '>

                            <img
                                src={logo}
                                alt='Logo'
                                className='h-10 w-10 object-contain'
                            />

                            <h1 className='
                            text-2xl
                            font-black

                            tracking-wide

                            text-[#07122b]
                            '>
                                Revizor
                            </h1>

                        </div>

                    </div>


                    {/* TEXT */}
                    <div className='mb-10'>

                        <h1 className='
                        text-4xl
                        sm:text-5xl
                        md:text-6xl

                        font-black

                        leading-[1]

                        tracking-[-2px]

                        text-[#07122b]
                        '>

                            {
                                formType === "login"
                                    ? "Welcome Back"
                                    : "Create Account"
                            }

                        </h1>

                        <div className='
                        w-28 h-1.5

                        rounded-full

                        bg-[#27c7b8]

                        mt-6 mb-6
                        '></div>

                        <p className='
                        text-[#5f6c8d]

                        text-lg

                        leading-9

                        max-w-xl
                        '>

                            {
                                formType === "login"
                                    ? "Login to continue analyzing previous year papers with AI-powered insights."
                                    : "Join Revizor and start generating exam-focused revision notes instantly."
                            }

                        </p>

                    </div>


                    {/* FORM */}
                    <div>
                        {
                            formType === "login"
                                ? (<LoginForm setIsLoggedIn={setIsLoggedIn} />)
                                : (<SignupForm setIsLoggedIn={setIsLoggedIn} />)
                        }
                    </div>

                </div>



                {/* RIGHT SIDE IMAGE */}
                <div className='
                relative

                hidden lg:flex

                items-center justify-center

                h-full

                bg-[#dff9f5]
                '>

                    {/* GLOW */}
                    <div className='
                    absolute

                    w-[450px]
                    h-[450px]

                    bg-[#27c7b8]

                    opacity-30

                    blur-[120px]

                    rounded-full
                    '></div>


                    <img
                        src={formImage}
                        alt='FormImage'
                        className='
                        relative z-10

                        w-[90%]

                        object-contain

                        drop-shadow-2xl
                        '
                    />

                </div>

            </div>

        </div>

    </div>

  )
}

export default Template