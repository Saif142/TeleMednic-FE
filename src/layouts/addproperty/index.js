import React, { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
// Data
import profilesListData from "layouts/profile/data/profilesListData";
// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
// import { alpha, styled } from '@mui/material/styles';
import SuiButton from "components/SuiButton";
import api from "../../services/api";
import "./style.css";
function Overview() {
	// const [imgUrl, setImgUrl] = useState(
	// 	"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250"
	// );
	const initialState = {
		name: "",
		email: "",
		phone: "",
	};
	const initialStateForPassword = {
		currpassword: "",
		newpassword: "",
	};
	const [password, setPassword] = useState(initialStateForPassword);
	const [user, setUser] = useState(initialState);
	const [imgUrl, setImgUrl] = useState(
		"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250"
	);

	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleInputsForPassword = (e) => {
		setPassword({
			...password,
			[e.target.name]: e.target.value,
		});
	};
	const handleInputs = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const imgHandler = (e) => {
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => {
			if (reader.readyState === 2) {
				setImgUrl(reader.result);
			}
		};
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { phone, name, email } = user;

		try {
			const res = await api.post(
				`/user/edituser/${JSON.parse(localStorage.getItem("userData"))?._id}`,
				{
					name: name,
					email: email,
					phone: phone,
				}
			);
			if (res.status == 200) {
				// toast("Your Profile has been updated", {
				//   position: "top-right",
				//   autoClose: 5000,
				//   hideProgressBar: false,
				//   closeOnClick: true,
				//   pauseOnHover: true,
				//   draggable: true,
				//   progress: undefined,
				// });
			}
		} catch (error) {
			alert(JSON.stringify(error?.response?.data));
		}
	};
	const submitPasswordForm = async (e) => {
		e.preventDefault();

		const { newpassword, currpassword } = password;
		try {
			const res = await api.post("/user/resetpassword", {
				newpassword: newpassword,
				currpassword: currpassword,
			});
			if (res.status == 200) {
				// toast("Your Password has been updated", {
				//   position: "top-right",
				//   autoClose: 5000,
				//   hideProgressBar: false,
				//   closeOnClick: true,
				//   pauseOnHover: true,
				//   draggable: true,
				//   progress: undefined,
				// });
			}
		} catch (error) {
			if (error.response.data.message == "Invalid Password") {
				// toast(`${error.response.data.message}`, {
				//   position: "top-right",
				//   autoClose: 5000,
				//   hideProgressBar: false,
				//   closeOnClick: true,
				//   pauseOnHover: true,
				//   draggable: true,
				//   progress: undefined,
				// });
			}
		}
	};
	return (
		<DashboardLayout>
			<Header />
			<Card sx={{ mt: 5 }}>
				<div className="m-5">
					<form>
						<span className="" style={{ fontSize: "20px", fontWeight: "bold" }}>
							Property Description
						</span>
						{/* <div class="form-group col-md-6 mt-4 mb-4">
							<label
								for="area"
								style={{
									backgroundColor: "#9D4DCA",
									color: "black",
									borderRadius: "31px",
									marginRight: "22px",
									height: "30px",
									width: "100px",
									padding: "5px",
									fontWeight: 600,
								}}
							>
								Upload Files
							</label>
							<input
								type="file"
								className="custom-style"
								name="images"
								id="images"
								accept="image/*"
								multiple
								// onChange={(e) => multiImagesChange(e)}
								style={{ marginLeft: "0px" }}
								// hidden
							/>
						</div> */}
						<div class="form row mt-4">
							<div class=" col-md-6">
								<label for="propertyTitle">Property Title</label>
								<input
									type="text"
									class="form-control"
									id="propertyTitle"
									placeholder="Property Title"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="propertyTitle"
									//   value={user.propertyTitle}
									//   onChange={handleInputs}
								/>
							</div>
							<div class=" col-md-6">
								<label for="area">Area</label>
								<input
									type="number"
									class="form-control "
									id="area"
									placeholder="Area"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="area"
									//   value={user.area}
									//   onChange={handleInputs}
								/>
							</div>
						</div>
						<div class="form row">
							<div class="form-group col-md-6">
								<label for="bedrooms">Bed Rooms</label>
								<input
									type="number"
									class="form-control "
									id="bedrooms"
									placeholder="Bed rooms"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="bedrooms"
									//   value={user.bedrooms}
									//   onChange={handleInputs}
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="floors">Floors</label>
								<input
									type="number"
									class="form-control "
									id="floors"
									placeholder="floors"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="floors"
									//   value={user.floors}
									//   onChange={handleInputs}
								/>
							</div>
						</div>
						<div class="form row">
							<div class="form-group col-md-6">
								<label for="propertyType">Property Type</label>
								<select
									id="propertyType"
									class="form-control "
									placeholder="Property Type"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="propertyType"
									//   value={propertyType}
									//   onChange={(e) => setpropertyType(e.target.value)}
								>
									<option>Constructed</option>
									<option>Non Constructed</option>
								</select>
							</div>
							<div class="form-group col-md-6">
								<label for="bathrooms">Bathrooms</label>
								<input
									type="number"
									class="form-control"
									id="bathrooms"
									placeholder="Bath Rooms"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="bathrooms"
									//   value={user.bathrooms}
									//   onChange={handleInputs}
								/>
							</div>
						</div>
						<div class="form row">
							<div class="form-group col-md-3">
								<label for="priceDemand">Demand Price</label>
								<input
									type="number"
									class="form-control"
									id="priceDemand"
									placeholder="Demand Price"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="priceDemand"
									//   value={user.priceDemand}
									//   onChange={handleInputs}
								/>
							</div>
							<div class="form-group col-md-3">
								<label for="biddingEnd">Bidding End</label>
								<input
									type="date"
									class="form-control "
									id="biddingEnd"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="biddingEnd"
									//   value={user.biddingEnd}
									//   onChange={handleInputs}
								/>
							</div>
							<div class="form-group col-md-6">
								<label for="address">Address</label>
								<input
									type="text"
									class="form-control "
									id="address"
									placeholder="Address"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="address"
									//   value={user.address}
									//   onChange={handleInputs}
								/>
							</div>
						</div>
						<div class="form row">
							<div class="form-group col-md-6">
								<label for="city">City</label>
								<input
									type="text"
									class="form-control "
									id="city"
									placeholder="City"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="city"
									//   value={user.city}
									//   onChange={handleInputs}
								/>
							</div>
							<div class="form-group col-md-4">
								<label for="state">State</label>
								<select
									id="state"
									class="form-control "
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="state"
									//   value={countrySate}
									//   onChange={(e) => setCountrySate(e.target.value)}
								>
									<option>Sharjah</option>
									<option>Sharjah</option>
									<option>Ajman</option>
									<option>Fujairah</option>
									<option>Umm Al Quwain</option>
								</select>
							</div>
							<div class="form-group col-md-2">
								<label for="zip">Zip</label>
								<input
									type="text"
									class="form-control "
									id="zip"
									placeholder="Zip"
									style={{ borderRadius: "8px", fontSize: "15px" }}
									name="zip"
									//   value={user.zip}
									//   onChange={handleInputs}
								/>
							</div>
						</div>
						<div class="form-group mb-3">
							<label for="description">Description</label>
							<textarea
								class="form-control "
								id="description"
								rows="7"
								style={{ borderRadius: "8px", fontSize: "15px" }}
								name="description"
								// value={user.description}
								// onChange={handleInputs}
							></textarea>
						</div>
						{/* <button
							type="button"
							class="btn custom-style mt-3"
							//   onClick={(e) => handleSubmit(e)}
						>
						</button> */}
						<SuiButton
							variant="gradient"
							color="dark"
							size="medium"
							// onClick={(e) => handleSubmit(e)}
						>
							Add Property
						</SuiButton>
					</form>
				</div>
			</Card>
		</DashboardLayout>
	);
}

export default Overview;
