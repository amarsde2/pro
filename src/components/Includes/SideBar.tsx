import Link from "next/link";
import dynamic from "next/dynamic";

const FaUserInjured = dynamic(() => import('react-icons/fa').then(mod => mod.FaUserInjured));
const FaBlog = dynamic(() => import('react-icons/fa').then(mod => mod.FaBlog));
const RiDashboard2Fill = dynamic(() => import('react-icons/ri').then(mod => mod.RiDashboard2Fill));
const RiFeedbackFill = dynamic(() => import('react-icons/ri').then(mod => mod.RiFeedbackFill));
const RiContactsBook2Line = dynamic(() => import('react-icons/ri').then(mod => mod.RiContactsBook2Line));


const SideBar = () => {
  return (
    <div
      id="sideBar"
      className="relative flex flex-col bg-black-400 text-white w-36 h-screen"
    >
      
        <Link href="/admin/dashboard" className="mb-3 text-lg  flex flex-row gap-2 font-medium capitalize hover:text-teal-400 transition">
          <RiDashboard2Fill className="mt-1"/> Dashboard
        </Link>
        <Link href="/admin/subscribers" className="mb-3 text-lg  flex flex-row gap-2 font-medium capitalize hover:text-teal-400 transition">
          <FaUserInjured className="mt-1"/> Subscribers
        </Link>
        <Link href="/admin/support-ticket" className="mb-3 text-lg  flex flex-row gap-2 font-medium capitalize hover:text-teal-400 transition">
          <RiContactsBook2Line className="mt-1"/> Contact Query
        </Link>
        <Link href="/admin/blogs" className="mb-3 text-lg  flex flex-row gap-2 font-medium capitalize hover:text-teal-400 transition">
          <FaBlog className="mt-1"/> Posts
        </Link>
        <Link href="/admin/projects" className="mb-3 text-lg  flex flex-row gap-2 font-medium capitalize hover:text-teal-400 transition">
          <FaBlog className="mt-1"/> Projects
        </Link>
        <Link href="/admin/testimonials" className="mb-3 text-lg  flex flex-row gap-2 font-medium capitalize hover:text-teal-400 transition">
          <RiFeedbackFill className="mt-1"/> Testimonials
        </Link>

        <Link href="/admin/2fa_security" className="mb-3 text-lg  flex flex-row gap-2 font-medium capitalize hover:text-teal-400 transition">
          <RiFeedbackFill className="mt-1"/> Security
        </Link>


    </div>
  );
};

export default SideBar;
