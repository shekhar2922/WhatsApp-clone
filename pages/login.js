import { Button } from "@mui/material";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {
    const signIn = () => {
        auth.signInWithRedirect(provider).catch(alert);
    }
  return (
    <Container>
      <Head>
          <title>Login - WhatsApp</title>
      </Head>
      <LoginContainer>
          <Logo src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"/>
          <LoginButton onClick={signIn} variant="contained" color="success">Sign in with Google</LoginButton>
      </LoginContainer>
    </Container>
  )
}

export default Login;

const Container = styled.div`
display: grid;
place-items : center;
height: 100vh;
background-color: whitesmoke;
`;

const LoginContainer = styled.div`
display: flex;
flex-direction: column;
padding: 100px;
align-items: center;
background-color: white;
border-radius: 5px;
box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
`;

const Logo = styled.img`
height : 180px;
width : 180px;
margin-bottom: 50px;
margin-top : -20px;
`;

const LoginButton = styled(Button)`
color: white;
:hover{
    color: white;
    font-weight: 600;
  }
`;
