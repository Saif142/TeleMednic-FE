import Card from '@mui/material/Card'
import React, { useEffect, useState } from 'react'
// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

// Soft UI Dashboard React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import Table from 'examples/Tables/Table'
import './style.css'
import api from '../../services/api'

// Data
import authorsTableData from 'layouts/allusers/data/authorsTableData'

function Tables() {
  const [allDrs, setAllDrs] = useState([])
  const allData = async () => {
    try {
      const res = await api.get('/api/doctor')
      if (res.status == 200) {
        setAllDrs(res.data)
      }
    } catch (error) {}
  }
  allData()
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            cdsfsdfdf
            <div class='mt-5'>
              <div class='table-responsive'>
                <table class='table table-striped table-dark text-white table-hover'>
                  <thead>
                    <tr>
                      {/* <th colspan='2'>Title</th> */}
                      <th>Doctors</th>
                      <th>Speciality</th>
                      <th>Status</th>
                      <th>Type</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allDrs.map((a) => {
                      return (
                        <tr>
                          {/* <td colspan='2'>
                            <h6>Fasinating tactic that can help in business</h6>
                          </td> */}
                          <td>
                            <div class='d-flex align-items-center'>
                              <img
                                class='rounded-circle'
                                src={a.avatar}
                                width='30'
                              />
                              <span class='ml-2'>{a.name}</span>
                            </div>
                          </td>
                          <td>
                            {a.speciality}
                            <br />
                          </td>
                          <td class='font-weight-bold'>Published</td>
                          <td>Business</td>
                          <td>
                            <i class='fa fa-external-link external-link'></i>
                          </td>
                        </tr>
                      )
                    })}
                    {/* <tr>
                      <td colspan='2'>
                        <h6>
                          Hypnotherapy for motivation getting the drive back
                        </h6>
                      </td>
                      <td>
                        <div class='d-flex align-items-center'>
                          <img
                            class='rounded-circle'
                            src='https://i.imgur.com/0LKZQYM.jpg'
                            width='30'
                          />
                          <span class='ml-2'>Maria Sam</span>
                        </div>
                      </td>
                      <td>
                        17 Mar, 2020
                        <br />
                      </td>
                      <td class='font-weight-bold text-danger'>Draft</td>
                      <td>Motivation</td>
                      <td>
                        <i class='fa fa-external-link external-link'></i>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <h6>Use your reset button to change your vibration</h6>
                      </td>
                      <td>
                        <div class='d-flex align-items-center'>
                          <img
                            class='rounded-circle'
                            src='https://i.imgur.com/ZSkeqnd.jpg'
                            width='30'
                          />
                          <span class='ml-2'>Nancy Nicholas</span>
                        </div>
                      </td>
                      <td>
                        15 Mar, 2020
                        <br />
                      </td>
                      <td class='font-weight-bold text-danger'>Draft</td>
                      <td>Travel &amp; Explorer</td>
                      <td>
                        <i class='fa fa-external-link external-link'></i>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <h6>All Faith needs feet</h6>
                      </td>
                      <td>
                        <div class='d-flex align-items-center'>
                          <img
                            class='rounded-circle'
                            src='https://i.imgur.com/Z6dkoKY.jpg'
                            width='30'
                          />
                          <span class='ml-2'>Christan M.</span>
                        </div>
                      </td>
                      <td>
                        14 Mar, 2020
                        <br />
                      </td>
                      <td class='font-weight-bold'>Published</td>
                      <td>Technology</td>
                      <td>
                        <i class='fa fa-external-link external-link'></i>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <h6>
                          Hypnotherapy for motivation getting the drive back
                        </h6>
                      </td>
                      <td>
                        <div class='d-flex align-items-center'>
                          <img
                            class='rounded-circle'
                            src='https://i.imgur.com/qddlYmO.jpg'
                            width='30'
                          />
                          <span class='ml-2'>Tibo Tune</span>
                        </div>
                      </td>
                      <td>
                        12 Mar, 2020
                        <br />
                      </td>
                      <td class='font-weight-bold text-danger'>Draft</td>
                      <td>Business</td>
                      <td>
                        <i class='fa fa-external-link external-link'></i>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <SuiBox
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							p={3}
						>
							<SuiTypography variant="h6">Users</SuiTypography>
						</SuiBox>
						<SuiBox
							sx={{
								"& .MuiTableRow-root:not(:last-child)": {
									"& td": {
										borderBottom: ({ borders: { borderWidth, borderColor } }) =>
											`${borderWidth[1]} solid ${borderColor}`,
									},
								},
							}}
						>
							<Table columns={columns} rows={rows} />
						</SuiBox> */}
          </Card>
        </SuiBox>
      </SuiBox>
    </DashboardLayout>
  )
}

export default Tables
