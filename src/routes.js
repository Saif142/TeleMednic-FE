// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
// import VirtualReality from "layouts/virtual-reality";
// import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import DoctorProfile from "layouts/DoctorProfile";
import UserProfile from "layouts/userprofile";
import CreateProfile from "layouts/createProfile";
import AddProperty from "layouts/addproperty";
import AllDoctors from "layouts/allDoctors";
import AllHospitals from "./layouts/allHospitals";
import AddSlots from 'layouts/addSlots'

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Alldrs from "layouts/alldrs";
import AppointmentHistory from "layouts/appointmentHistory";
// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
// For Site Routes................
import Home from "layouts/site/home";
import Home2 from "layouts/site/components/Socials";
const routes = [
	// ...............................................................Patient
	{
		type: "collapse",
		name: "Profile",
		key: "profile",
		route: "/profile",
		icon: <CustomerSupport size="12px" />,
		component: Profile,
		noCollapse: true,
	},
	{
		// type: "collapse",
		name: "hsptls all drs",
		key: "hsptls all drs",
		route: "/alldrs",
		icon: <CustomerSupport size="12px" />,
		component: Alldrs,
		noCollapse: true,
	},
	{
		type:
			JSON.parse(window.localStorage.getItem("type")) === "patient"
				? "collapse"
				: "",
		name: "All Hospitals",
		key: "hospitals",
		route: "/allhospitals",
		icon: <CustomerSupport size="12px" />,
		component: AllHospitals,
		noCollapse: true,
	},
	{
		type:
			JSON.parse(window.localStorage.getItem("type")) === "patient"
				? "collapse"
				: "",
		name: "All Doctors",
		key: "AllDoctors",
		route: "/alldoctors",
		icon: <CustomerSupport size="12px" />,
		component: AllDoctors,
		noCollapse: true,
	},
	{
		// type: "collapse",
		name: "doctor",
		key: "doctor",
		route: "/doctor/:name",
		icon: <CustomerSupport size="12px" />,
		component: DoctorProfile,
		noCollapse: true,
	},
	{
		// type: "collapse",
		name: "Update Profile",
		key: "userProfile",
		route: "/userprofile",
		icon: <CustomerSupport size="12px" />,
		component: UserProfile,
		noCollapse: true,
	},
	{
		type: localStorage.getItem("isCreateProfile")==undefined ? "collapse" : "",
		name: "Create Profile",
		key: "CreateProfile",
		route: "/createprofile",
		icon: <CustomerSupport size="12px" />,
		component: CreateProfile,
		noCollapse: true,
	},
	{
		// type: "collapse",
		name: "Add Property",
		key: "editProfile",
		route: "/editproperty",
		icon: <CustomerSupport size="12px" />,
		component: AddProperty,
		noCollapse: true,
	},
	{
		// type: "collapse",
		name: "Logout",
		key: "Logout",
		route: "/logout",
		icon: <Document size="12px" />,
		component: SignIn,
		noCollapse: true,
	},
	{
		// type: "collapse",
		name: "",
		key: "",
		route: "/signup",
		// icon: <Document size='12px' />,
		component: SignUp,
		noCollapse: true,
	},
	{
		type:
			JSON.parse(window.localStorage.getItem("type")) === "patient"
				? ""
				: "collapse",
		name:
			JSON.parse(window.localStorage.getItem("type")) == "patient"
				? "Appointment History"
				: "Appointment",
		key: "Reports",
		route: "/reports",
		icon: <CustomerSupport size="12px" />,
		component: AppointmentHistory,
		noCollapse: true,
	},
	{
		type:
			JSON.parse(window.localStorage.getItem("type")) == "doctor"
				? "collapse"
				: "",
		name: "Add Slots",
		key: "addSlots",
		route: "/addSlots",
		icon: <CustomerSupport size="12px" />,
		component: AddSlots,
		noCollapse: true,
	},
	// .......................................................................................Doctor
	// {
	// 	// type: "collapse",
	// 	type:
	// 		JSON.parse(window.localStorage.getItem("type")) == "doctor"
	// 			? "collapse"
	// 			: "",
	// 	name: "Dr Profile",
	// 	key: "Dr profile",
	// 	route: "/dr_profile",
	// 	icon: <CustomerSupport size="12px" />,
	// 	component:Profile_Dr ,
	// 	noCollapse: true,
	// },
	// {
	// 	// type: "collapse",
	// 	type: localStorage.getItem("type") == "doctor" ? "" : "collapse",

	// 	name: "Profile",
	// 	key: "profile",
	// 	route: "/profile",
	// 	icon: <CustomerSupport size="12px" />,
	// 	component: Profile,
	// 	noCollapse: true,
	// },
	// {
	// 	// type: "collapse",
	// 	name: "hsptls all drs",
	// 	key: "hsptls all drs",
	// 	route: "/alldrs",
	// 	icon: <CustomerSupport size="12px" />,
	// 	component: Alldrs,
	// 	noCollapse: true,
	// },
	// {
	// 	type: "collapse",
	// 	name: "All Hospitals",
	// 	key: "hospitals",
	// 	route: "/allhospitals",
	// 	icon: <CustomerSupport size="12px" />,
	// 	component: AllHospitals,
	// 	noCollapse: true,
	// },

	// {
	//   type: 'collapse',
	//   name: 'Dashboard',
	//   key: 'dashboard',
	//   route: '/dashboard',
	//   icon: <Shop size='12px' />,
	//   component: Dashboard,
	//   noCollapse: true,
	// },
	// {
	//   type: 'collapse',
	//   name: 'Tables',
	//   key: 'tables',
	//   route: '/tables',
	//   icon: <Office size='12px' />,
	//   component: Tables,
	//   noCollapse: true,
	// },
	// {
	//   type: 'collapse',
	//   name: 'Billing',
	//   key: 'billing',
	//   route: '/billing',
	//   icon: <CreditCard size='12px' />,
	//   component: Billing,
	//   noCollapse: true,
	// },
	// {
	//   type: "collapse",
	//   name: "Virtual Reality",
	//   key: "virtual-reality",
	//   route: "/virtual-reality",
	//   icon: <Cube size="12px" />,
	//   component: VirtualReality,
	//   noCollapse: true,
	// },
	// {
	//   type: "collapse",
	//   name: "RTL",
	//   key: "rtl",
	//   route: "/rtl",
	//   icon: <Settings size="12px" />,
	//   component: RTL,
	//   noCollapse: true,
	// },
	// { type: 'title', title: 'Account Pages', key: 'account-pages' },
	// {
	//   type: 'collapse',
	//   name: 'Sign In',
	//   key: 'sign-in',
	//   route: '/authentication/sign-in',
	//   icon: <Document size='12px' />,
	//   component: SignIn,
	//   noCollapse: true,
	// },
	// {
	//   type: 'collapse',
	//   name: 'Sign Up',
	//   key: 'sign-up',
	//   route: '/authentication/sign-up',
	//   icon: <SpaceShip size='12px' />,
	//   component: SignUp,
	//   noCollapse: true,
	// },
	//For Website
	// {
	//   type: 'collapse',
	//   name: 'HOME',
	//   key: 'sign-up',
	//   route: '/home',
	//   icon: <SpaceShip size='12px' />,
	//   component: Home,
	//   noCollapse: true,
	// },
	// //for test
	// {
	//   type: 'collapse',
	//   name: 'test',
	//   key: 'sign-up',
	//   route: '/admin/home2',
	//   icon: <SpaceShip size='12px' />,
	//   component: Home2,
	//   noCollapse: true,
	// },
];

export default routes;
// allproperties
