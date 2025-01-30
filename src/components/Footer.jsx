import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-15 bottom-0 w-full bg-blue-900 text-white py-2 grid grid-cols-[70%,30%] grid-rows-2 md:flex flex-row-reverse md:justify-around items-center md:items-start md: px-4">
      {/*Contact Us Page DIV 1 */}
      <div className=" col-span-1 ml-4 mt-4 md:mt-[35px]">
        <h1 className="text-[32px] font-bold mb-1 md:hidden">Contact Us</h1>

        <p className=" flex gap-3  mt-2">
          <FaLocationDot className="mt-1" />
          <div>
            <span>Elliptical Road, Brgy. Central </span>
            <span>Diliman, Quezon City</span>
          </div>
        </p>

        <div className="flex mt-1 gap-3">
          <FaPhone className=" mt-1 " />

          <div>
            <p>HRMD@quezoncity.gov.ph</p>
            <p>SHRU@quezoncity.gov.ph</p>
          </div>
        </div>

        <p className=" flex gap-3 mt-1 ">
          <FaEnvelope className="mt-1 " />
          89884242 loc. 8504
        </p>
      </div>

      {/*Social Media Page DIV 2 */}
      <div className="flex items-start justify-center mt-3 md:mt-[35px]">
        <div className="w-[650px] hidden md:block md:w-[55%]">
          <p className="text-2xl ">
            Discover and advance your skills in the Learning and Development.
          </p>
          <div className="flex justify-start items-center text-[25px] gap-3 mt-3 ">
            <FaFacebookSquare />
            <FaXTwitter />
            <FaInstagramSquare />
            <FaLinkedin />
          </div>
        </div>

        <div className=" grid grid-rows-2 grid-cols-2 gap-6 text-[30px] mt-9 md:flex-row md:hidden mr-5">
          <FaFacebookSquare />
          <FaXTwitter />
          <FaInstagramSquare />
          <FaLinkedin />
        </div>
      </div>

      <div className="flex flex-col col-span-2 justify-center items-center  md:grid md:grid-row-2 md:grid-cols-[40%,60%] md:mt-[35px] md:mb-[50px]">
        <img
          className="h-[70px] md:col-span-1  md:h-[110px] md:w-[200px] mb-3 min-w-[80px]"
          src="/assets/LogoTransparent.svg" 
          alt="Logo"
        />
        <p className="md:col-span-1  md:w-[210px] ml-2 md:text-2xl md:font-bold md:leading-normal md:mt-1">
          Quezon City Government Human Resources
        </p>
        <p className="md:col-span-2  md:text-start ml-5">
          &copy;2022 Quezon City Human Resource{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
