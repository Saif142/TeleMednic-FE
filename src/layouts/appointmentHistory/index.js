import Card from "@mui/material/Card";
import SuiButton from "components/SuiButton";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import api from "../../services/api";

function Overview(props) {
	const [patientMeeting, setPatientMeeting] = useState();
	const isDr = JSON.parse(window.localStorage.getItem("type")) == "doctor";
	const [dr_Data, setDr_Data] = useState(
		JSON.parse(window.localStorage.getItem("userData"))
	);
	const handleSubmit = async (pt_Id) => {
		try {
			var drId = dr_Data._id;
			var ptId = pt_Id;
			var drName = dr_Data.name;
			const res = await api.put(
				`api/appointment/doneAppintment/${drId}/${ptId}/${drName}`,
				{
					headers: {
						"x-auth-token": JSON.parse(window.localStorage.getItem("token")),
					},
				}
			);
			if (res.status == 200) {
				// window.location = "/profile";
				// alert("Successfully updated the profile");
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

	useEffect(async () => {
		if (JSON.parse(window.localStorage.getItem("type")) == "patient") {
			try {
				const res = await api.get(
					`/api/appointment/${
						JSON.parse(localStorage.getItem("userData"))._id
					}`,
					{
						headers: {
							"x-auth-token": JSON.parse(window.localStorage.getItem("token")),
						},
					}
				);
				if (res.status === 200) {
					setPatientMeeting(res.data);
				}
			} catch (error) {}
		}
		// else if()
		else if (JSON.parse(window.localStorage.getItem("type")) == "doctor") {
			try {
				const res = await api.get(
					`/api/doctor/meetings/${
						JSON.parse(localStorage.getItem("userData"))._id
					}`,
					{
						headers: {
							"x-auth-token": JSON.parse(window.localStorage.getItem("token")),
						},
					}
				);
				if (res.status === 200) {
					setPatientMeeting(res.data);
				}
			} catch (error) {}
		}
	}, [patientMeeting?.userMeetings]);

	return (
		<DashboardLayout>
			<Header />
			<Card sx={{ mt: 5 }}>
				<div className="row bg-white p-5" style={{ borderRadius: "2rem" }}>
					<div className="row mt-5">
						<div className="col-md-7">
							<h2 className="">
								{isDr ? "Appointments" : "Your Last Appointments History"}
							</h2>
						</div>
						<div className="col-md-5"></div>
					</div>
					<div class="mt-5">
						<div class="table-responsive">
							<table class="table ">
								<thead>
									<tr>
										<th colspan="2">#</th>
										<>
											<th>{isDr ? "Pt. Name" : "Dr. Name"}</th>
											<th>Meeting Day</th>
											<th>Meeting Time</th>
											<th>Meeting Date</th>
										</>
									</tr>
								</thead>
								{isDr ? (
									<tbody>
										{patientMeeting?.userMeetings.map((meeting, index) => {
											return (
												<tr>
													<td colspan="2">
														<h6>{index + 1}</h6>
													</td>
													<td>
														<div class="d-flex align-items-center">
															<img
																class="rounded-circle"
																src={meeting.patientAvatar}
																width="50"
																height="50"
															/>
															<span class="ms-1">{meeting.patient}</span>
														</div>
													</td>
													<td>
														{meeting.day}
														<br />
													</td>
													<td class="font-weight-bold">{meeting.time}</td>
													<td>{moment(meeting.date).format("DD/MM/YYYY")}</td>
													<td>
														<SuiButton
															variant="gradient"
															color="dark"
															size="medium"
															onClick={() => handleSubmit(meeting.patientId)}
														>
															Done
														</SuiButton>
													</td>
												</tr>
											);
										})}
									</tbody>
								) : (
									<tbody>
										{patientMeeting?.history.map((meeting, index) => {
											return (
												<tr>
													<td colspan="2">
														<h6>{index + 1}</h6>
													</td>
													<td>
														<div class="d-flex align-items-center">
															<img
																class="rounded-circle"
																// src={meeting.doctorAvatar}
																width="50"
															/>
															<span class="ms-1">{meeting.doctor}</span>
														</div>
													</td>
													<td>
														{meeting.day}
														<br />
													</td>
													<td class="font-weight-bold">{meeting.time}</td>
													<td>{moment(meeting.date).format("DD/MM/YYYY")}</td>
												</tr>
											);
										})}
									</tbody>
								)}
							</table>
						</div>
					</div>
				</div>
			</Card>
		</DashboardLayout>
	);
}

export default Overview;
