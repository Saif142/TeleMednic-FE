import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import "./style.css";
import api from "../../services/api";

// Data

function Tables() {
  const [allHospitals, setAllHospitals] = useState([]);
  const allData = async () => {
    try {
      const res = await api.get("api/hospital");
      if (res.status === 200) {
        setAllHospitals(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    allData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <div class="mt-5">
              <div class="table-responsive">
                <table class="table table-striped table-dark text-white table-hover">
                  <thead>
                    <tr>
                      {/* <th colspan='2'>Title</th> */}
                      <th>Hospital name</th>
                      <th>Address</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allHospitals.map((hospital) => {
                      return (
                        <tr>
                          {/* <td colspan='2'>
                            <h6>Fasinating tactic that can help in business</h6>
                          </td> */}
                          <td>{hospital.name}</td>
                          <td>
                            {hospital.address}
                            <br />
                          </td>
                          <td class="font-weight-bold">{hospital.city}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </Card>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Tables;
