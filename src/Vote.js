import React from 'react';
import './Vote.css';

class Vote extends React.Component {
  state = {
    imgUrls: [
      'http://theawkwardyeti.com/wp-content/uploads/2015/01/0121_Heartwatchesthenews.png',
      'https://media.discordapp.net/attachments/576550326509764619/589870367968067584/Snapchat-1663181687.jpg?width=725&height=666',
      'https://cdn.discordapp.com/attachments/576550326509764619/588542078460362753/Snapchat-1743849407.jpg',
      'https://cdn.discordapp.com/attachments/576550326509764619/587878048087539713/image0.jpg',
      'https://images-ext-2.discordapp.net/external/x-ZJoUHev3eSLb6zc1-a9P4LIA-22dyHh1vKoIFWQDM/https/cdn.discordapp.com/attachments/576550326509764619/593075547815280661/bobbhlkash631.png',
      'https://bit.ly/2Xd9RnB',
    ],


    firstImg:0,
    secondImg:1,
  }
   pickNextImgs = ()=> {
    const nextFirstImg = Math.floor(Math.random() * this.state.imgUrls.length);
    let nextSecondImg = Math.floor(Math.random() * this.state.imgUrls.length);
    while(nextSecondImg === nextFirstImg)
      nextSecondImg = Math.floor(Math.random() * this.state.imgUrls.length);

    this.setState({
      firstImg: nextFirstImg,
      secondImg: nextSecondImg,
    });
  }

  voteFirst = ()=>{
    console.log('Create vote for' +this.state.imgUrls[this.state.firstImg]);
    this.pickNextImgs();
  }

voteSecond = ()=>{
    console.log('Create vote for' +this.state.imgUrls[this.state.secondImg]);
    this.pickNextImgs();
  }






  componentDidMount(){
    console.log('Vote mount');
  }

  componentWillUnmount(){
    console.log('Vote unmount');
  }

  render(){
    return (
      <div className='Vote Page'>
        <div className='img-box'>
          <div className='Vote-img' style={{
            backgroundImage: `url(${this.state.imgUrls[this.state.firstImg]})`
          }} onClick = {this.voteFirst}/>
          <div className='Vote-img' style={{
          backgroundImage: `url(${this.state.imgUrls[this.state.secondImg]})`
          }} onClick= {this.voteSecond}/>
        </div>
      </div>
    );
  }
};

export default Vote;