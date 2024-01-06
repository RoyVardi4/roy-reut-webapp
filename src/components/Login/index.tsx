import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from '@mui/material/styles';
import { IUser } from '../../interfaces/User';
import LoginAPI from '../../api/Login';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user: IUser = {
      email: data.get('email') as string,
      password: data.get('password') as string
    };

    try {
      await LoginAPI.userLogin(user);
      if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
        navigate('/', {replace: true});
      } else {
        alert('error logging in')
      }
    } catch(err) {
      alert(err)
    }    
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      try {
        if (codeResponse.access_token) {
          localStorage.setItem('accessToken', codeResponse.access_token);
          navigate('/', {replace: true});
        } else {
          alert('error logging in')
        }
      } catch(err) {
        alert(err)
      }  
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Button onClick={() => loginGoogle()} >Sign in with Google</Button>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </ThemeProvider>
  );
}