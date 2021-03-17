import React from 'react';
import {TextField
    , Container
    , Grid
    , Button
    , Box
    , Card
    , Typography
} from '@material-ui/core';
import {useForm, UseFormMethods} from 'react-hook-form';
import { useHistory } from 'react-router-dom'

type DispatcherT = React.Dispatch<React.SetStateAction<PageState>>

enum PageChosenEnum {
    SigninPage,
    SignupPage
}

type PageState = {
    pageChosen: PageChosenEnum
}

type FormDataRegT = {
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
    email: string
}

type FormDataLoginT = {
    userPassword: string,
    userEmail: string
}

const authUrl = "http://localhost:8000/users/";

const apiTokenUrl = "http://localhost:8000/api-token-auth/"

const validate = (values:any) => {
    const errors = {'firstName': '', 'lastName':'', 'email':''};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    }
    return errors;
  };

const onSubmitReg = async (values:FormDataRegT) => {
        let formData = new FormData();
        formData.append('email', values.email);
        // TODO: to be hashed
        formData.append('password', values.password);
        formData.append('first_name', values.firstName); 
        formData.append('last_name', values.lastName);
        // loading state
        let response = await fetch(authUrl,
        {
            body: formData,
            method: "post"
        });
        // loaded
        console.log(await response.json() );
};

const onSubmitLogin = async (values:FormDataLoginT) => {
        let formData = new FormData();
        formData.append('username', values.userEmail);
        // TODO: to be hashed
        formData.append('password', values.userPassword);
        // loading state
        let response = await fetch(apiTokenUrl,
        {
            body: formData,
            method: "post"
        });
        // loaded
        console.log(await response.json() );
};

function SignInBox(state: PageState, dispatcher: DispatcherT, formHooks: UseFormMethods<FormDataLoginT>, history: any) {
    const { register, handleSubmit, errors } = formHooks;
    return (
        <form onSubmit={handleSubmit(onSubmitLogin)}  >
        <Grid  style={{height: "100%"}} container spacing={2} alignItems="flex-start" >
            <Grid item xs={12}>
                <TextField inputRef={register} fullWidth required name="userEmail" type="email"  label="email" variant="outlined"/>
            </Grid>
            <Grid item xs={12}>
                <TextField inputRef={register} fullWidth required name="userPassword" type="password" label="password" variant="outlined"/>
            </Grid>
            <Grid item>
                <Button onClick={()=>{console.log("some"); history.push('/home');}}  variant="contained" color="primary" disableElevation>
                    SIGN IN
                </Button>
                {/* <Button type="submit"  variant="contained" color="primary" disableElevation>
                    SIGN IN
                </Button> */}
            </Grid>
            <Grid item>
                <Typography 
                   onClick={
                    (e)=>{
                        dispatcher({pageChosen: PageChosenEnum.SignupPage})}
                   } 
                   variant="caption" 
                   style={{cursor: "pointer"}}  
                   color="primary">
                    click here if you do not have an account
                </Typography>
            </Grid>
        </Grid>
       </form>
    );
}

function SignUpBox(state: PageState, dispatcher: DispatcherT, formHooks: UseFormMethods<FormDataRegT>)  {
    const { register, handleSubmit, errors } = formHooks;

    return (
          <form onSubmit={handleSubmit(onSubmitReg)}  noValidate>
            <Grid  style={{height: "100%"}} container spacing={2} alignItems="flex-start" >
                <Grid item xs={6}>
                    <TextField inputRef={register} fullWidth required name="firstName" type="text" label="first name" variant="outlined"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField inputRef={register} fullWidth required name="lastName" type="text" label="last name" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField inputRef={register} fullWidth required name="email" type="email"  label="email" variant="outlined"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField inputRef={register} fullWidth required name="password" type="password" label="password" variant="outlined"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField inputRef={register} fullWidth required name="confirmPassword" type="password" label="confirm password" variant="outlined"/>
                </Grid>
                <Grid item>
                    <Button type="submit"  variant="contained" color="primary" disableElevation>
                        Sign up
                    </Button>
                </Grid>
                <Grid item>
                    <Typography 
                        onClick={(e)=>{
                           dispatcher({pageChosen: PageChosenEnum.SigninPage})}
                           } 
                           variant="caption" style={{cursor: "pointer"}}  
                           color="primary">
                           click here if you already registered
                    </Typography>
                </Grid>
            </Grid>
           </form>
    );
}

function Auth() {
    let [pageState, stateDispatcher] = 
      React.useState<PageState>({pageChosen: PageChosenEnum.SigninPage});
    const formHooksLogin = useForm<FormDataLoginT>();
    const formHooksReg = useForm<FormDataRegT>();
    const history = useHistory();
    
    return (
        <Container  
        style={{height: "100%"
        , backgroundColor: "#f5f5f5"
        }} 
        maxWidth="xl">
            <Box  mx={4} style={{height: "63.3%", width: "63.3%"}}>
            <Card  variant="outlined"  style={{padding: "4ex"}}>
                {
                    pageState.pageChosen == PageChosenEnum.SigninPage?
                    SignInBox(pageState, stateDispatcher, formHooksLogin, history)
                    :SignUpBox(pageState, stateDispatcher, formHooksReg)
                }
            </Card>
            </Box>
        </Container>
        );
    }
    
    export default Auth;
    