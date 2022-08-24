import React, { useDebugValue, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {Avatar,Button,TextField,Link,Grid,Typography,Container,CircularProgress} from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons'
import {Alert} from '@material-ui/lab';

import useStyles from './registerStyles';
import { register } from '../../actions/user';

export const Register = () => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [submitted,setSubmitted] = useState(false);
    const [submitCp,setSubmitCp] = useState(false);
    const [dis,setDis] = useState(true);

    const errMsg = useSelector((state)=>state.data.errMsg);

    const [inputs,setInputs] = useState({
        email:'',
        password:'',
        first_name:'',
        last_name:'',
        mobile_no:'',
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setInputs({...inputs,[e.target.name]:value});
    }

    const handleSubmit = async (e) => {
        setDis(true);
        e.preventDefault();
        setSubmitted(true);
        setSubmitCp(true);

        if( !inputs.email || !inputs.password || !inputs.firstName || !inputs.lastName || !inputs.phoneNumber) setSubmitCp(false)
        console.log(inputs);

        const val = await dispatch(register(inputs));
        setDis(val);
        setSubmitCp(val);
        console.log("errMsg : ", errMsg);
        {val ? navigate("/") : navigate("/register")}
    }


    return(
        <Container component="main" maxWidth="xs">
            {/* <CssBaseline/> */}
            <div className={classes.paper}>
                {submitCp ? <CircularProgress className={classes.circular}/> :
                    <Avatar className={classes.avatar}>
                        <LockOutlined/>
                    </Avatar>
                }
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="fname"
                            variant="outlined"
                            required
                            fullWidth
                            label="First Name"
                            name="first_name"
                            value={inputs.firstName}
                            onChange={handleChange}
                            autoFocus
                            />
                            {submitted && !inputs.firstName ? <span style={{color:'red'}}>Please enter First Name</span> : null}

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            autoComplete="lname"
                            variant="outlined"
                            required
                            fullWidth
                            label="Last Name"
                            name="last_name"
                            value={inputs.lastName}
                            onChange={handleChange}
                            />
                            {submitted && !inputs.lastName ? <span style={{color:'red'}}>Please enter Last Name</span> : null}
                        </Grid>
                        {/* <Grid item xs={12}>
                            {submitted && (!inputs.lastName && !inputs.firstName) ? <span style={{color:'red'}}>Please enter your Name</span> : null}
                        </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Email Address"
                                autoComplete="email"
                                name="email"
                                value={inputs.email}
                                onChange={handleChange}
                            />
                            {submitted && !inputs.email ? <span style={{color:'red'}}>Please enter the email</span> : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                type="password"
                                required
                                fullWidth
                                label="Password"
                                autoComplete="current-password"
                                name="password"
                                value={inputs.password}
                                onChange={handleChange}
                                />
                                {submitted && !inputs.password ? <span style={{color:'red'}}>Please enter the password </span> : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                type="phonenumber"
                                required
                                fullWidth
                                label="Phone Number"
                                autoComplete="current-password"
                                name="mobile_no"
                                value={inputs.phoneNumber}
                                onChange={handleChange}
                            />
                            {submitted && !inputs.phoneNumber ? <span style={{color:'red'}}>Please enter the phoneNumber </span> : null}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.errSpace}>
                        {!dis ? <Alert severity="error"> {errMsg.msg || errMsg.message || errMsg.error.email || errMsg.error.password  } </Alert> : null}
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>

                </form>
            </div>
        </Container>
    );
}