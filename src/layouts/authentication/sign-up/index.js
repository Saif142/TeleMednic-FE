import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout'
import Socials from 'layouts/authentication/components/Socials'
import Separator from 'layouts/authentication/components/Separator'
// Images
import curved6 from 'assets/images/curved-images/bg2.jpg'
import api from '../../../services/api'
import axios from 'axios'
function SignUp() {
  const [agreement, setAgremment] = useState(true)
  const handleSetAgremment = () => setAgremment(!agreement)
  const initialState = {
    name: '',
    email: '',
    password: '',
    cnic: '',
  }

  const [user, setUser] = useState(initialState)
  const [email, setEmail] = useState('')

  //   const history = useHistory();
  const handleInputs = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmail('')
    const { cnic, name, email, password } = user
    try {
      const res = await api.post('/api/patient', {
        email: email,
        password: password,
        cnic: cnic,
        name: name,
      })
      if (res.status === 200) {
        window.location = '/signin'
      }
    } catch (error) {
      if (error?.response?.data?.message === 'Email Already Taken.') {
        setEmail('Email Already Taken')
      }
    }
  }
  return (
    <BasicLayout
      title='Welcome!'
      description='Use these awesome forms to login or create new account in your project for free.'
      image={curved6}
    >
      <Card>
        <SuiBox p={3} mb={1} textAlign='center'>
          <SuiTypography variant='h5' fontWeight='medium'>
            Register with
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={2}>{/* <Socials /> */}</SuiBox>
        {/* <Separator /> */}
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component='form' role='form'>
            <SuiBox mb={2}>
              <SuiInput
                placeholder='Name'
                id='name'
                name='name'
                value={user.name}
                onChange={handleInputs}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type='email'
                placeholder='Email'
                id='email'
                name='email'
                value={user.email}
                onChange={handleInputs}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type='password'
                placeholder='Password'
                id='password'
                name='password'
                value={user.password}
                onChange={handleInputs}
              />
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                type='number'
                placeholder='CNIC'
                id='cnic'
                name='cnic'
                value={user.cnic}
                onChange={handleInputs}
              />
            </SuiBox>
            <SuiTypography
              variant='button'
              fontWeight='regular'
              sx={{ cursor: 'poiner', userSelect: 'none' }}
            >
              User Type
            </SuiTypography>

            <SuiBox
              display='flex'
              alignItems='center'
              sx={{ marginTop: '10px' }}
            >
              <Checkbox
              // checked={agreement}
              // onChange={handleSetAgremment}
              />
              <SuiTypography
                variant='button'
                fontWeight='regular'
                // onClick={handleSetAgremment}
                sx={{ cursor: 'poiner', userSelect: 'none' }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography
                component='a'
                href='#'
                variant='button'
                fontWeight='bold'
                textGradient
              >
                Terms and Conditions
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton
                variant='gradient'
                color='dark'
                fullWidth
                onClick={(e) => handleSubmit(e)}
              >
                sign up
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign='center'>
              <SuiTypography variant='button' color='text' fontWeight='regular'>
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to='/logout'
                  variant='button'
                  color='dark'
                  fontWeight='bold'
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  )
}

export default SignUp
