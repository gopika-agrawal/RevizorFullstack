import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const DashNav = () => {
  return (
    <div className='flex justify-center items-center'>

        <nav>

            <Link to={"/dashboard/unit"}>

              <Button>Unit Weightage</Button>

            </Link>

            <Link to={"/dashboard/frequency"}>

              <Button>
                Get Frequency
              </Button>

            </Link>

            <Link to={"/dashboard/answer"}>
                <Button>
                   Get Answer Pdf
                </Button>
            </Link>

        </nav>

    </div>
  )
}

export default DashNav