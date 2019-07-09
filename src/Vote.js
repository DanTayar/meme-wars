import React from 'react';
import './Vote.css';

const offlineImgs = [  'http://theawkwardyeti.com/wp-content/uploads/2015/01/0121_Heartwatchesthenews.png',
      'https://media.discordapp.net/attachments/576550326509764619/589870367968067584/Snapchat-1663181687.jpg?width=725&height=666',
      'https://cdn.discordapp.com/attachments/576550326509764619/588542078460362753/Snapchat-1743849407.jpg',
      'https://cdn.discordapp.com/attachments/576550326509764619/587878048087539713/image0.jpg',
      'https://worldwidefoot.files.wordpress.com/2012/08/crsitianoronaldo-calma-798090.jpg'
];

class Vote extends React.Component {
  state = {
    memes: [],

    firstImg:0,
    secondImg:1,
  }

   pickNextImgs = ()=> {
    const nextFirstImg = Math.floor(Math.random() * this.state.memes.length);
    let nextSecondImg = Math.floor(Math.random() * this.state.memes.length);
    while(nextSecondImg === nextFirstImg)
      nextSecondImg = Math.floor(Math.random() * this.state.memes.length);

    this.setState({
      firstImg: nextFirstImg,
      secondImg: nextSecondImg,
    });
  }

  voteFirst = ()=>{
    console.log('Create vote for' +this.state.memes[this.state.firstImg]);
    this.vote(
      this.state.memes[this.state.firstImg].id,
      this.state.memes[this.state.secondImg].id,
      );
  }

voteSecond = ()=>{
    console.log('Create vote for' +this.state.memes[this.state.secondImg]);
    this.vote(
      this.state.memes[this.state.secondImg].id,
      this.state.memes[this.state.firstImg].id,
      );
  }

vote = (winner , looser) => {
  fetch('/vote' , {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
    Authorization : 'Bearer ' + localStorage.sessionToken , 
  },
    body: JSON.stringify({
      winner: winner,
      looser: looser,
    }),
  }).then(response => response.json())
    .then(responseJson =>{
      console.log(responseJson);
      this.pickNextImgs();
    })
}




  componentDidMount(){
    console.log('Vote mount');
    fetch('/meme')
      .then(response => response.json())
      .then(memes => {
        this.setState({memes: memes});
      })
  }

  componentWillUnmount(){
    console.log('Vote unmount');
  }

  render(){
    return (
      <div className='Vote Page'>
        <div className='img-box'>
        {this.state.memes.length ? (
          <>
          <div className='Vote-img' style={{
            backgroundImage: `url(${this.state.memes[this.state.firstImg].imgUrl})`
          }} onClick = {this.voteFirst}/>
          <div className='Vote-img' style={{
          backgroundImage: `url(${this.state.memes[this.state.secondImg].imgUrl})`
          }} onClick= {this.voteSecond}/>
          </>
          ): null}
        </div>
      </div>
    );
  }
};

export default Vote;