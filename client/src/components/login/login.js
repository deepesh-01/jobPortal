import React, {useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Cookie from 'universal-cookie';

import {CircularProgress,Avatar,Button,CssBaseline,TextField,Typography,Container,Grid,Link} from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';
import {Alert} from '@material-ui/lab';

import useStyles from './loginStyles';
import {login, verify} from '../../actions/user';

export const LogIn = () => {
    const cookies = new Cookie();
    const token = cookies.get('jwt');
    console.log("token : ",token);

    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
  
    useEffect(async ()=>{
      if(token){
        const val = await dispatch(verify());
        console.log(val);
        if(val) navigate('/abc');
      }
    },[]);
  

    

    const [inputs,setInputs] = useState({
        email : '',
        password: '',
    });

    // console.log("error : ",error);
    // console.log("load : ",load);


    const [submitted,setSubmitted] = useState(false);
    const [submitCp,setSubmitCp] = useState(false);
    const [dis,setDis] = useState(true);

    const errMsg = useSelector((state)=>state.data.errMsg);
    
    // console.log("errMsg : ", errMsg);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputs({...inputs,[e.target.name]:value});
    }

    const handleSubmit = async (e) => {
        setDis(true);
        e.preventDefault();
        setSubmitted(true);
        setSubmitCp(true);
        if( !inputs.email || !inputs.password ) setSubmitCp(false)
        console.log(inputs);
        setSubmitCp(true);
        
        const val = await dispatch(login(inputs));
        console.log(val);
        setDis(val); 
        {val ? navigate('/') : navigate('/')}
        setSubmitCp(false)
    }

    return(
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline></CssBaseline>
                <div className={classes.paper}>
                  {submitCp ? <CircularProgress className={classes.circular}/> : 
                    <Avatar className={classes.avatar}>
                        <LockOutlined/>
                    </Avatar>
                  }
                  <Typography component='h1' variant='h5'>
                      Log In
                  </Typography>
                  <form className={classes.form} noValidate onSubmit={handleSubmit}>
                      <TextField
                      variant='outlined'
                      margin='normal'
                      label="E-mail"
                      fullWidth
                      type='text'
                      name="email"
                      value={inputs.email}
                      required="Please enter the email"
                      autoComplete="email"
                      onChange={handleChange}
                      />
                      {submitted && !inputs.email ? <span style={{color:'red'}}>Please enter the email</span> : null}

                      <TextField
                      variant='outlined'
                      margin='normal'
                      label='Password'
                      fullWidth
                      type='password'
                      name='password'
                      value={inputs.password}
                      required="Please enter the password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      />
                      {submitted && !inputs.password ? <span style={{color:'red'}}>Please enter the password</span> : null}

                    {!dis ? <Alert severity="error"> {errMsg.msg || errMsg.error.email || errMsg.error.password } </Alert> : null}
                      <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      >
                        Log In
                      </Button>

                      <Grid container>
                          <Grid item >
                            <Link className={classes.center} href='/register' variant="body2">
                              {"Don't have an account? Sign Up"}
                            </Link>
                          </Grid>
                        </Grid>
                  </form>
                </div>
            </Container>
        </div>
    );

}