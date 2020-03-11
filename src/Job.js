import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Grid, Box, Typography } from '@material-ui/core';
import { LocationOn, Work, AttachMoney } from '@material-ui/icons';
import Loader from './Loader/Loader';
import './Job.css'

let renderListedJobs = (listedJobs) => {
  console.log('listedJobs', listedJobs)
  return listedJobs.map((job, index) => (
    <Box m={2} key={index}>
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={5}>
            <Box p={2}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography>
                    <Box fontWeight="fontWeightBold">
                      {job.title}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{color: '#6c54da'}}>
                    {job.companyName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography display="inline"> 
                        <LocationOn fontSize="small" /> {job.location}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography display="inline">
                        <Work />  {job.yoe}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography display="inline">
                        <AttachMoney fontSize="small" />  {job.money}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography style={{color: '#505050'}} variant="subtitle1">
                    {job.jobDescription}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography display="inline" style={{fontWeight: 'bold', style: '#505050'}}>
                    Skills: 
                  </Typography>
                  <Typography color="textSecondary" display="inline">
                    {job.skills}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  ))
}

let jobData = (setListedJobs, page, setIsLoading) => {
  console.log('page', page)
  setIsLoading(true);
  axios.get(`https://jobs-abcd.herokuapp.com/jobs/${page}`)
    .then((response) => {
      setIsLoading(false);
      setListedJobs(() => response.data.result)
    })
}

function Job() {
  const [listedJobs, setListedJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    jobData(setListedJobs, page, setIsLoading)
  }, [page])
  return (
    <Grid container>
      <Grid item xs={12}>
        {isLoading ? (<Loader />) :
          ( <>
              {renderListedJobs(listedJobs)}
              <Box m={2}>
                <div 
                  className="next-page"
                  onClick={() => setPage((page) => page+1)}>
                  Next Page
                </div>
              </Box>
            </>
          )
        }
      </Grid>
    </Grid>
  )
}

export default Job
