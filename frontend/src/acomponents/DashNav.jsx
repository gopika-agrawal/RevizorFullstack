import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const DashNav = () => {

  const location = useLocation();

  const active =
    "bg-[#27c7b8] text-white shadow-lg";

  const inactive =
    "bg-white text-[#07122b] border border-[#dfeceb]";

  return (
    <div className="flex justify-center mt-8 mb-8">

      <div className="flex gap-4 bg-white rounded-2xl p-3 shadow-md">

        <Link to="/dashboard/unit">
          <Button
            className={
              location.pathname.includes("/unit")
                ? active
                : inactive
            }
          >
            Unit Weightage
          </Button>
        </Link>

        <Link to="/dashboard/frequency">
          <Button
            className={
              location.pathname.includes("/frequency")
                ? active
                : inactive
            }
          >
            Frequency Analysis
          </Button>
        </Link>

        <Link to="/dashboard/answer">
          <Button
            className={
              location.pathname.includes("/answer")
                ? active
                : inactive
            }
          >
            Answer PDF
          </Button>
        </Link>

      </div>

    </div>
  );
};

export default DashNav;