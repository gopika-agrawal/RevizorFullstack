import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Button } from '@/components/ui/button'

const Navbar = (props) => {

    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div>

        <Link to={"/"}>
            <img src={logo} alt='revizor'className='h-10 w-20'/>
        </Link>
        
        <div>
            { !isLoggedIn &&
                <Link to={"/login"}>
                    <Button>Login</Button>
                </Link>
            }
            { !isLoggedIn &&
                <Link to={"/signup"}>
                    <Button>Signup</Button>
                </Link>
            }
            { isLoggedIn &&
                <Link to={"/"}>
                    <Button
                        onClick={() => setIsLoggedIn(false)}
                    >Logout</Button>
                </Link>
            }
            { isLoggedIn &&
                <Link>
                    <Button>Dashboard</Button>
                </Link>
            }
        </div>

    </div>
  )
}

export default Navbar