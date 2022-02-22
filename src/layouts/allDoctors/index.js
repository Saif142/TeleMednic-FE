/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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
import user from "assets/images/user.png";

import api from "../../services/api";
import { useState, useEffect } from "react";

function Overview() {
  const [allDoctors, setAllDoctors] = useState([]);

  const allData = async () => {
    try {
      const res = await api.get("api/doctor");
      if (res.status === 200) {
        setAllDoctors(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    allData();
  }, []);

  return (
    <DashboardLayout>
      <Header />

      <SuiBox mt={5} mb={3}>
        <Card>
          <SuiBox pt={2} px={2}>
            <SuiBox mb={0.5}>
              <SuiTypography variant="h6" fontWeight="medium">
                Doctors list
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={1}>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                Architects design houses
              </SuiTypography>
            </SuiBox>
          </SuiBox>
          <SuiBox p={2}>
            <Grid container spacing={3}>
              {allDoctors.map((doctor) => {
                return (
                  <Grid item xs={12} md={6} xl={3}>
                    <DefaultProjectCard
                      image={doctor.avatar ? doctor.avatar : user}
                      label={doctor.speciality}
                      title={doctor.name}
                      description=""
                      action={{
                        type: "internal",
                        color: "info",
                        label: "view Detail",
                        route: `/doctor/${doctor.name.split(" ").join("-")}`,
                        state: { doctor },
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </SuiBox>
        </Card>
      </SuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
