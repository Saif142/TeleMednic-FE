import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "layouts/profile/components/Header";
import api from "../../services/api";

function Overview(props) {
	const [patientMeeting, setPatientMeeting] = useState();

	useEffect(async () => {
		try {
			const res = await api.get(
				`/api/appointment/${JSON.parse(localStorage.getItem("userData"))._id}`,
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
	}, []);

	return (
		<DashboardLayout>
			<Header />
			<Card sx={{ mt: 5 }}>
				<div className="row bg-white p-5" style={{ borderRadius: "2rem" }}>
					<div className="row mt-5">
						<div className="col-md-7">
							<h2 className="">Your Last Appointments History</h2>
						</div>
						<div className="col-md-5"></div>
					</div>
					<div class="mt-5">
						<div class="table-responsive">
							{/* <h3>Appointment History</h3> */}
							<table class="table ">
								<thead>
									<tr>
										<th colspan="2">#</th>
										<>
											<th>Dr. Name</th>
											<th>Meeting Day</th>
											<th>Meeting Time</th>
											<th>Meeting Date</th>
										</>
									</tr>
								</thead>
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
							</table>
						</div>
					</div>
				</div>
			</Card>
		</DashboardLayout>
	);
}

export default Overview;
