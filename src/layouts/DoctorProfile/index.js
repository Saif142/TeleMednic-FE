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
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
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
import { ToastContainer, toast } from 'react-toastify'

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
import { useLocation } from 'react-router-dom'
import userImage from 'assets/images/user.png'
import { Button } from '@mui/material'
import api from '../../services/api'

function Overview(props) {
  const [userData, setUserData] = useState({})
  const [userProfile, setUserProfile] = useState({})

  const [isPatient, setIsPatient] = useState(true)
  const location = useLocation()
  const patientType = localStorage.getItem('type')
  useEffect(() => {
    if (location.pathname.split('/')[1] === 'profile') {
      setUserData(JSON.parse(window.localStorage.getItem('userData')))
      setIsPatient(true)
    } else {
      setUserData(location.state.doctor)
      setIsPatient(false)
    }
  }, [])
  useEffect(async () => {
    try {
      const res = await api.get(`/api/profile/me`, {
        headers: {
          'x-auth-token': JSON.parse(window.localStorage.getItem('token')),
        },
      })
      if (res.status === 200) {
        setUserProfile(res.data)
        // alert('Successfully')
      }
    } catch (error) {
      toast(error.response.data.msg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }, [])

  const cancelAppointment = () => {}

  const bookAppointment = async (slot) => {
    console.log('userData._id', userData._id)
    console.log(slot)
    console.log('===============================')
    console.log(JSON.parse(window.localStorage.getItem('token')))
    console.log(typeof JSON.parse(window.localStorage.getItem('token')))
    var data = ''
    var raw = ''
    // var requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'x-auth-token': JSON.parse(window.localStorage.getItem('token')),
    //   },
    // }
    fetch(
      'https://tele-mednic.herokuapp.com/api/appointment/' +
        userData._id +
        '/' +
        slot,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': JSON.parse(window.localStorage.getItem('token')),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        toast(data.msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        window.location = '/profile'
      })
      .catch((error) => {})
  }
  return (
    <DashboardLayout>
      <Header />
      <Card sx={{ mt: 5 }}>
        <div className='row bg-white p-5' style={{ borderRadius: '2rem' }}>
          <div className='row justify-content-center'>
            <img
              // src={userData?.avatar?.length > 0 ? userData?.avatar : userImage}
              src={userData.avatar}
              alt=''
              style={{
                objectFit: 'cover',
                height: '200px',
                borderRadius: '50% 50%',
                width: 'auto',
              }}
            ></img>
          </div>
          <div className='row mt-5'>
            <div className='col-md-7'>
              <h2 className=''>Profile Details</h2>
              <div className='ms-2 mt-3'>
                <div className='row '>
                  <div className='col-md-4'>
                    <h5>Name: </h5>
                  </div>
                  <div className='col-md-auto'>{userData.name}</div>
                </div>
                <div className='row '>
                  <div className='col-md-4'>
                    <h5>Email: </h5>
                  </div>
                  <div className='col-md-auto'>{userData.email}</div>
                </div>

                {patientType == 'patient' ? (
                  <div>
                    <div className='row '>
                      <div className='col-md-4'>
                        <h5>CNIC: </h5>
                      </div>
                      <div className='col-md-auto'>{userData.cnic}</div>
                    </div>
                    <div className='row '>
                      <div className='col-md-4'>
                        <h5>Age: </h5>
                      </div>
                      <div className='col-md-auto'>{userProfile.age}</div>
                    </div>
                    <div className='row '>
                      <div className='col-md-4'>
                        <h5>Blood: </h5>
                      </div>
                      <div className='col-md-auto'>{userProfile.blood}</div>
                    </div>
                    <div className='row '>
                      <div className='col-md-4'>
                        <h5>Height: </h5>
                      </div>
                      <div className='col-md-auto'>{userProfile.height} cm</div>
                    </div>
                    <div className='row '>
                      <div className='col-md-4'>
                        <h5>Weight: </h5>
                      </div>
                      <div className='col-md-auto'>{userProfile.weight} kg</div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className='col-md-5'></div>
          </div>
          <div class='mt-5'>
            <div class='table-responsive'>
              {location.pathname.split('/')[1] === 'profile' ? (
                <h3>Meeting</h3>
              ) : (
                <h3>Appointment</h3>
              )}

              <table class='table table-hover'>
                <thead>
                  <tr>
                    <th colspan='2'>#</th>

                    {location.pathname.split('/')[1] === 'profile' ? (
                      <>
                        <th>Meeting Day</th>
                        <th>Meeting Time</th>
                        <th>Cancel Appointment</th>
                      </>
                    ) : (
                      <>
                        <th>Appointment Day</th>
                        <th>Appointment Time</th>
                        <th>Appointment Date</th>
                        <th>Book Appointment</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {location.pathname.split('/')[1] === 'doctor'
                    ? userData.slots &&
                      userData?.slots.map((slot, index) => {
                        return (
                          <tr>
                            <td colspan='2'>
                              <h6>{index + 1}</h6>
                            </td>
                            <td>{slot.day}</td>
                            <td>
                              {slot.time}
                              <br />
                            </td>
                            <td>{moment(slot?.date).format('DD/MM/YYYY')}</td>

                            <td class='font-weight-bold'>
                              <button
                                className='btn btn-primary'
                                onClick={() => {
                                  bookAppointment(slot._id)
                                }}
                              >
                                Book Appointment
                              </button>
                            </td>
                          </tr>
                        )
                      })
                    : userData.meetings &&
                      userData?.meetings.map((meeting, index) => {
                        return (
                          <tr>
                            <td colspan='2'>
                              <h6>{index + 1}</h6>
                            </td>
                            <td>{meeting.day}</td>
                            <td>
                              {meeting.time}
                              <br />
                            </td>
                            <td class='font-weight-bold'>
                              <button
                                className='btn btn-danger'
                                onClick={() => {
                                  cancelAppointment(meeting)
                                }}
                              >
                                Cancel Appointment
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      <ToastContainer />
    </DashboardLayout>
  )
}

export default Overview
