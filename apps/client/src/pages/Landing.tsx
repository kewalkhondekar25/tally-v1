import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import banner1 from "../assets/banner1.png";

const Landing = () => {
  return (
    <div>
      <header className="flex justify-between p-3">
        <h3 className="text-2xl font-medium">tally</h3>
        <div>
          <Link to="login">
            <Button 
            className="text-gray-500 font-semibold text-sm"
            variant="ghost"
            >Log in
            </Button>
          </Link>
          <Link to="signup">
            <Button
              className="text-gray-500 font-semibold text-sm" 
              variant="ghost"
              >Sign up
            </Button>
          </Link>
        </div>
      </header>
      <section className="min-w-screen flex flex-col justify-center items-center">
        <img className="mt-16 px-5" src={banner1} alt="banner1" />
        <h1 className="w-72 text-3xl font-semibold text-center mt-10">The simplest way to create forms</h1>
        <p className="w-72 text-center mt-5 font-semibold text-gray-700">
          Say goodbye to boring forms. Meet Tally — the free, intuitive form builder you’ve been looking for.
        </p>
        <Button className="mt-5 bg-[#006fd6] font-semibold">Create a free form</Button>
      </section>
    </div>
  );
};

export default Landing;