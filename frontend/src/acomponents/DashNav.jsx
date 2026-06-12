import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const DashNav = () => {

  const location = useLocation();

  const active =
    "bg-[#27c7b8] text-white shadow-lg";

  const inactive =
    "bg-white text-[#07122b] border border-[#dfeceb] hover:bg-[#f5fbfa]";

  return (
    <div className="flex flex-wrap justify-center gap-4">

      <div className="flex flex-wrap justify-center gap-3 bg-white rounded-2xl p-3 shadow-md">

        <Link to="/dashboard/unit">
          <Button
            className={`
              ${location.pathname === "/dashboard/unit"
                ? active
                : inactive
                }
                text-xs sm:text-sm md:text-base
            `}
          >
            📊 Unit Weightage
          </Button>
        </Link>

        <Link to="/dashboard/frequency">
          <Button
            className={
              location.pathname === "/dashboard/frequency"
                ? active
                : inactive
            }
          >
            🔥Frequency Analysis
          </Button>
        </Link>

        <Link to="/dashboard/answer">
          <Button
            className={
              location.pathname === "/dashboard/answer"
                ? active
                : inactive
            }
          >
            📄Answer PDF
          </Button>
        </Link>

      </div>

    </div>
  );
};

export default DashNav;