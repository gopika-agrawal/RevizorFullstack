// import React from 'react'
// import { Link } from 'react-router-dom'
// import logo from '../assets/logo.png'
// import { Button } from '@/components/ui/button'

// const Navbar = (props) => {

//     let isLoggedIn = props.isLoggedIn;
//     let setIsLoggedIn = props.setIsLoggedIn;

//   return (
//     <div>

//         <Link to={"/"}>
//             <img src={logo} alt='revizor'className='h-10 w-20'/>
//         </Link>
        
//         <div>
//             { !isLoggedIn &&
//                 <Link to={"/login"}>
//                     <Button>Login</Button>
//                 </Link>
//             }
//             { !isLoggedIn &&
//                 <Link to={"/signup"}>
//                     <Button>Signup</Button>
//                 </Link>
//             }
//             { isLoggedIn &&
//                 <Link to={"/"}>
//                     <Button
//                         onClick={() => setIsLoggedIn(false)}
//                     >Logout</Button>
//                 </Link>
//             }
//             { isLoggedIn &&
//                 <Link>
//                     <Button>Dashboard</Button>
//                 </Link>
//             }
//         </div>

//     </div>
//   )
// }

// export default Navbar








import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Button } from '@/components/ui/button'

const Navbar = (props) => {

    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

    const navigate = useNavigate();

    const logoutHandler = () => {
        setIsLoggedIn(false);
        
        setTimeout(() => {
            navigate("/");
        },0);
    }

  return (

    <nav className='sticky top-0 z-50 w-full bg-white/70 backdrop-blur-2xl border-b border-[#dfeceb] shadow-[0_4px_30px_rgba(0,0,0,0.03)]'>

    <div className='max-w-7xl mx-auto h-[88px] px-6 lg:px-14 flex items-center justify-between'>

        {/* LOGO */}
        <Link to={"/"} className='group flex items-center'>

            <div className='relative rounded-2xl overflow-hidden bg-white/60 backdrop-blur-xl border border-[#dfeceb] px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(39,199,184,0.25)] group-hover:-translate-y-1'>

                {/* glow */}
                <div className='absolute inset-0 bg-[#27c7b8] opacity-0 blur-2xl group-hover:opacity-10 transition-all duration-500'></div>

                <img
                    src={logo}
                    alt='revizor'
                    className='
                    relative z-10
                    h-10 w-auto object-contain
                    '
                />

            </div>

        </Link>



        {/* RIGHT BUTTONS */}
        <div className='flex items-center gap-4'>

            {
                !isLoggedIn &&
                <Link to={"/login"}>

                    <Button
                        variant="outline"
                        className='h-12 px-8 rounded-full border border-[#dfeceb] bg-white/60 backdrop-blur-xl text-[#07122b] text-base font-medium transition-all duration-300 hover:bg-[#f3fffd] hover:border-[#27c7b8] hover:shadow-[0_0_35px_rgba(39,199,184,0.18)] hover:-translate-y-1'>
                        Login
                    </Button>

                </Link>
            }


            {
                !isLoggedIn &&
                <Link to={"/signup"}>

                    <Button
                        className='h-12 px-8 rounded-full bg-[#07122b] hover:bg-[#0b1735] text-white text-base font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(39,199,184,0.25)]'>
                        Signup
                    </Button>

                </Link>
            }



            {
                isLoggedIn &&
                <Button
                    className='h-12 px-8 rounded-full bg-[#27c7b8] hover:bg-[#1eb7aa] text-[#07122b] font-semibold transition-all duration-300 shadow-[0_8px_30px_rgba(39,199,184,0.20)] hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(39,199,184,0.35)]'
                    onClick={logoutHandler}
                    >
                    Logout
                </Button>
            }


            {
                isLoggedIn &&
                <Link to={"/dashboard"}>

                    <Button
                        className='h-12 px-8 rounded-full bg-[#27c7b8] hover:bg-[#1eb7aa] text-[#07122b] font-semibold transition-all duration-300 shadow-[0_8px_30px_rgba(39,199,184,0.20)] hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(39,199,184,0.35)]'>
                        Dashboard
                    </Button>

                </Link>
            }

        </div>

    </div>

</nav>

  )
}

export default Navbar