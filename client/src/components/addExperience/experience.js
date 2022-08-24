import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import AdapterDateFns from '@date-io/date-fns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {CircularProgress, Button, CssBaseline, TextField,Typography,Container,Grid,TextareaAutosize} from '@material-ui/core';
import { Group } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { DatePicker } from '@mui/x-date-pickers';

import useStyles from './experienceStyles';

export const Experience = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    
    // useEffect(async ()=>{
    //     const val = await dispatch(getExperience());
    // });

    const [inputs,setInputs] = useState([{
        position:"",
        company:"",
        start_date:"",
        end_date:"",
        description:"",
    }]);

    console.log(inputs);

    const errMsg = useSelector((state)=>state.data.errMsg);

    const [submitted,setSubmitted] = useState(false);
    const [submitCp,setSubmitCp] = useState(false);
    const [dis,setDis] = useState(true);

    const handleChange = (e,index) => {
        const { name, value } = e.target;
        const input = [...inputs];
        input[index][name] = value;
        setInputs(input);
    }

    const handleExpRemove = (index) => {
        const input = [...inputs];
        input.splice(index, 1);
        setInputs(input);
    };

    const handleExpAdd = () => {
        setInputs([...inputs, {        
            position:"",
            company:"",
            start_date:"",
            end_date:"",
            description:"",
        }]);
      };

      const print = (data) => console.log(data);

    const handleSubmit = async (e) => {
        setDis(true);
        e.preventDefault();
        setSubmitted(true);
        setSubmitCp(true);
        for(let i in inputs){
            if( !i.position || !i.company || !i.start_date || !i.end_date ) setSubmitCp(false)
        }
        console.log(inputs);
        setSubmitCp(true);
        
        // const val = await dispatch(addExperience(inputs));
        // console.log(val);
        // setDis(val); 
        // {val ? navigate('/education') : navigate('/experience')}
        // setSubmitCp(false);
    }
    
    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline></CssBaseline>
            <div className={classes.paper}>
                {submitCp ? <CircularProgress className={classes.circular}/> : 
                    null
                }
                <Typography component='h1' variant='h5'>
                    Add Experience
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                {inputs.map((i,index)=>(
                    <section>
                        <TextField
                        variant='outlined'
                        margin='normal'
                        label="Position"
                        fullWidth
                        type='text'
                        name="position"
                        value={i.position}
                        required="Please enter the position"
                        autoComplete="Position"
                        onChange={(e) => handleChange(e,index)}
                        />  
                        {submitted && !i.position ? <span style={{color:'red'}}>Please enter the Position.</span> : null}

                        <TextField
                        variant='outlined'
                        margin='normal'
                        label='Company'
                        fullWidth
                        type='text'
                        name='company'
                        value={i.company}
                        required="Please enter the company name"
                        autoComplete="current-password"
                        onChange={(e) => handleChange(e,index)}
                      />
                      {submitted && !i.password ? <span style={{color:'red'}}>Please enter the company name.</span> : null}

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          view={["year","month"]}
                          placeholder="Start Date"
                          name="start_date"
                          label="Basic example"
                          value={i.start_date}
                          onChange={(e) => handleChange(e,index)}
                          renderInput={(params) => <TextField {...params} />}
                          />
                      </LocalizationProvider>
                      {submitted && !i.start_date ? <span style={{color:'red'}}>Please enter the start date.</span> : null}
                      
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          view={["year","month"]}
                          placeholder="End Date"
                          name="end_date"
                          label="Basic example"
                          value={i.end_date}
                          onChange={(e) => handleChange(e,index)}
                          renderInput={(params) => <TextField {...params} />}
                          />
                      </LocalizationProvider>
                      {submitted && !i.start_date ? <span style={{color:'red'}}>Please enter the start date.</span> : null}

                      <TextareaAutosize
                        variant='outlined'
                        margin='normal'
                        label="description"
                        fullWidth
                        type='text'
                        name="description"
                        value={i.description}
                        required="Please enter the position"
                        autoComplete="Position"
                        onChange={(e) => handleChange(e,index)}
                        />
                      
                      
                      {!dis ? <Alert severity="error"> {errMsg.msg} </Alert> : null}
                     
                      <Grid container>
                          <Grid item >
                          <Button
                            type="Submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                              Save
                          </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              onClick={handleExpAdd}
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                              >
                                Add
                            </Button>
                            <Button
                              onClick={handleExpRemove}
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                              >
                                Remove
                            </Button>
                          </Grid>
                        </Grid>
                    </section>
                  ))}
                  </form>
            </div>
        </Container>
    );
}