import React from 'react';
import './Login.css';

class Login extends React.Component {
  componentDidMount(){
    console.log('Login mount');
      console.log('Results mount');
      fetch('/meme', { 'Content-Type': 'application/json' })
      .then(response=> response.json())
      .then(memes => console.log(memes));
    }
  

  componentWillUnmount(){
    console.log('Login unmount');
  }

  render(){
    return (
      <div className='Login Page'>
        Result Coming Soon...
      </div>
    );
  }
};

export default Login;