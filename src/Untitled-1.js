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
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import React, { useState } from 'react'
import moment from 'moment'
// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

// Soft UI Dashboard React components
// import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiButton from 'components/SuiButton'

// Soft UI Dashboard React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import Footer from 'examples/Footer'
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard'
import ProfilesList from 'examples/Lists/ProfilesList'
import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard'
import PlaceholderCard from 'examples/Cards/PlaceholderCard'

// Overview page components
import Header from 'layouts/profile/components/Header'
import PlatformSettings from 'layouts/profile/components/PlatformSettings'

// Data
import profilesListData from 'layouts/profile/data/profilesListData'

// Images
import homeDecor1 from 'assets/images/home-decor-1.jpg'
import homeDecor2 from 'assets/images/home-decor-2.jpg'
import homeDecor3 from 'assets/images/home-decor-3.jpg'
import team1 from 'assets/images/team-1.jpg'
import team2 from 'assets/images/team-2.jpg'
import team3 from 'assets/images/team-3.jpg'
import team4 from 'assets/images/team-4.jpg'
import SuiBox from 'components/SuiBox'

function Overview() {
  const [imgUrl, setImgUrl] = useState(
    'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250'
  )
  var data1 = JSON.parse(window.localStorage.getItem('userData'))

  return (
    <DashboardLayout>
      <Header />
      <Card sx={{ mt: 5 }}>
        <div className='row bg-white p-5' style={{ borderRadius: '2rem' }}>
          <div className='row '>
            <div className='col-2'>
              <div className='row mb-3'>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  Profile Detail
                </span>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <img
                    src={imgUrl}
                    alt=''
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: 'auto',
                    }}
                  ></img>
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className='row mb-2'>
                <div className='col-12'>
                  <span
                    style={{
                      // fontSize: "20px",
                      // fontWeight: "bold",
                      // display: "none",
                      color: 'transparent',
                    }}
                  >
                    Profile Detail
                  </span>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group col-md-12'>
                    <label htmlFor='name' className='m-2'>
                      {data1.email}
                    </label>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group col-md-12'>
                    <label htmlFor='phone' className='m-2'>
                      Appointment Slot:
                    </label>
                    <label htmlFor='phone' className='m-2'>
                      {data1.meetings[0].time}
                    </label>

                    <br />
                    <label htmlFor='phone' className='m-2'>
                      Appointment Day:
                    </label>
                    <label htmlFor='phone' className='m-2'>
                      {moment(data1.meetings[0].date).format('MM/DD/YYYY')}
                    </label>
                    <span className=''></span>
                    <input
                      type='tel'
                      className='form-control'
                      id='phone'
                      placeholder='Phone No'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='phone'
                      // value={user.phone}
                      // onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group col-md-12'>
                    <label htmlFor='phone' className='m-2'>
                      Phone
                    </label>
                    <input
                      type='tel'
                      className='form-control'
                      id='phone'
                      placeholder='Phone No'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='phone'
                      // value={user.phone}
                      // onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-5'>
              <div className='row'>
                <div className='col-12'>
                  <span
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: 'transparent',
                    }}
                  >
                    Profile Detail
                  </span>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group col-md-12'>
                    <label htmlFor='email' className='m-2'>
                      {data1.cnic}
                    </label>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group col-md-12'>
                    <label htmlFor='email' className='m-2'>
                      {data1.cnic}
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='email'
                      placeholder='Email'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='email'
                      // value={user.email}
                      // onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  )
}

export default Overview
