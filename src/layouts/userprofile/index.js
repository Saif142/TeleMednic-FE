import React, { useState, useEffect } from 'react'
// @mui material components
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
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
// import { alpha, styled } from '@mui/material/styles';
import SuiButton from 'components/SuiButton'
import api from '../../services/api'
import './style.css'
function Overview() {
  // const [imgUrl, setImgUrl] = useState(
  // 	"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250"
  // );
  const initialState = {
    blood: '',
    height: '',
    weight: '',
    avatar: '',
  }
  const initialStateForPassword = {
    currpassword: '',
    newpassword: '',
  }
  const [password, setPassword] = useState(initialStateForPassword)
  const [user, setUser] = useState(initialState)
  const [imgUrl, setImgUrl] = useState(
    'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250'
  )

  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState(false)

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
  }

  const handleInputsForPassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    })
  }
  const handleInputs = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const imgHandler = (e) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgUrl(reader.result)
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { weight, blood, height } = user

    try {
      const res = await api.post(
        `/api/profile/updateProfile`,
        {
          weight: weight,
          blood: blood,
          height: height,
          avatar: imgUrl,
        },
        {
          headers: {
            'x-auth-token': JSON.parse(window.localStorage.getItem('token')),
          },
        }
      )
      if (res.status == 200) {
        alert('Successfully updated the profile')
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
      alert(JSON.stringify(error?.response?.data))
    }
  }

  const submitPasswordForm = async (e) => {
    e.preventDefault()

    const { newpassword, currpassword } = password
    try {
      const res = await api.post('/user/resetpassword', {
        newpassword: newpassword,
        currpassword: currpassword,
      })
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
      if (error.response.data.message == 'Invalid Password') {
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
  }
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
              <div className='row mt-3'>
                {/* ................................................................ */}
                <div>
                  <label
                    class='ms-4 p-2 ps-3 pe-3 fw-bold'
                    style={{
                      boxShadow:
                        '0rem 0.1875rem 0.3125rem -0.0625rem rgb(0 0 0 / 9%), 0rem 0.125rem 0.3125rem -0.0625rem rgb(0 0 0 / 9%)',
                      backgroundColor: '#00003f',
                      cursor: 'pointer',
                      color: 'white',
                      textTransform: 'uppercase',
                      fontSize: '11px',
                      borderRadius: '8px',
                    }}
                  >
                    Upload Photo
                    <input
                      type='file'
                      name='avatar'
                      id='avatar'
                      accept='image/*'
                      onChange={imgHandler}
                      hidden
                    />
                  </label>
                </div>
                {/* ................................................................ */}
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
                      Weight
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='weight'
                      placeholder='Wnter Weight'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='weight'
                      value={user.weigth}
                      onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <div className='form-group col-md-12'>
                    <label htmlFor='phone' className='m-2'>
                      Height
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='height'
                      placeholder='Enter height'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='height'
                      value={user.height}
                      onChange={handleInputs}
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
                      Blood
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='blood'
                      placeholder='Enter Blood type'
                      style={{ borderRadius: '8px', fontSize: '15px' }}
                      name='blood'
                      value={user.blood}
                      onChange={handleInputs}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-2'></div>
            <div className='col-5'>
              <div className='row'>
                <div className='col-12'>
                  {/* <button
										type="button"
										className="btn custom-style"
										// onClick={handleSubmit}
									>
										Save Changes{" "}
									</button> */}
                  <SuiButton
                    variant='gradient'
                    color='dark'
                    size='medium'
                    onClick={(e) => handleSubmit(e)}
                  >
                    Save Changes
                  </SuiButton>
                </div>
              </div>
            </div>
            <div className='col-5'></div>
          </div>
        </div>
      </Card>
      <Card sx={{ mt: 5 }}>
        <div className='row'>
          <form className='p-5 bg-white' style={{ borderRadius: '2rem' }}>
            <div className='row 1'>
              <div className='col-5'>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                  Change password
                </span>
              </div>
              <div className='col-5'></div>
              <div className='col-2'></div>
            </div>
            <div className='row 2'>
              <div className='col-5'>
                <div className='form-group col-md-12'>
                  <label htmlFor='currpassword' className='m-2'>
                    Old Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='currpassword'
                    placeholder='Old Password'
                    style={{ borderRadius: '8px', fontSize: '15px' }}
                    required={true}
                    name='currpassword'
                    value={user.currpassword}
                    onChange={handleInputsForPassword}
                  />
                </div>
              </div>
              <div className='col-5'>
                <div className='form-group col-md-12'>
                  <label htmlFor='newpassword' className='m-2'>
                    New Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='newpassword'
                    placeholder='New Password'
                    style={{ borderRadius: '8px', fontSize: '15px' }}
                    required={true}
                    name='newpassword'
                    value={user.newpassword}
                    onChange={handleInputsForPassword}
                  />
                </div>
              </div>
              <div className='col-2'></div>
            </div>
            <div className='row mt-3'>
              <div className='col-5'>
                <div className='form-group col-md-12'>
                  <label htmlFor='propertyTitle'>Confirm Password</label>
                  <input
                    type='password'
                    className='form-control'
                    id='propertyTitle'
                    placeholder='Confirm Password'
                    style={{ borderRadius: '8px', fontSize: '15px' }}
                    required={true}
                  />
                </div>
              </div>
              <div className='col-5'></div>
              <div className='col-2'></div>
            </div>
            <div className='row mt-3'>
              <div className='col-5'>
                {/* <button
                  type="submit"
                  // onClick={submitPasswordForm}
                  className="btn custom-style"
                >
                  Save Password
                </button> */}
                <SuiButton
                  variant='gradient'
                  color='dark'
                  size='medium'
                  // onClick={(e) => handleSubmit(e)}
                >
                  Save Password
                </SuiButton>
              </div>
              <div className='col-5'></div>
              <div className='col-2'></div>
            </div>
          </form>
        </div>
      </Card>
      {/* <Footer /> */}
    </DashboardLayout>
  )
}

export default Overview
