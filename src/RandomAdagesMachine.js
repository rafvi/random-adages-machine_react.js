import React from 'react';
import adage from './adage.json';

import './RandomAdagesMachine.css';

const colors = [ '#003366', '#000066', '#006666', '#4dffff', '#0099cc', '#333399', '#009999', 
                 '#00ccff', '#3333cc', '#00cc66', '#9933ff', '#006600', '#cc33ff', '#ff33cc',
                 '#ff0066', '#666633', '#996633', '#663300', '#cc3300', '#990000', '#993333'];

const quoteRight = {
  fontSize: "12px",
  verticalAlign: "super"
}

class RandomAdagesMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adage: '', // -przysłowie polskie-
      meaning: '', // -znaczenia-
      color: "#3399ff"
    }
  }

  componentDidMount() {
    this.getAdage();
  }

  getAdage() {
    let data = adage.adages;
    let adageNumber = Math.floor(Math.random() * data.length);
    let randomAdage = data[adageNumber]; // actual adage

    this.setState({
      adage: randomAdage[0],
      meaning: randomAdage[1]
    })
  }

  getNewAdages = () => {
    this.changeColor()
    this.getAdage()

  }

  changeColor = () => {
    this.setState({
      color: colors[Math.floor(Math.random() * (colors.length - 0)) + 0]
    });

    document.body.style.backgroundColor = this.state.color;
    document.getElementById("adage-box").style.color = this.state.color;
    document.getElementById("btn-new-adage").style.color = this.state.color;
    document.getElementById("adage-tweet").style.color = this.state.color;
  }

  render() {
    const { adage, meaning } = this.state;
    return (
      <div id="wrapper">
        <h1 className="title">Polskie przysłowia</h1>

        <div id="adage-box">
          <AdageBox adage={adage} meaning={meaning} />

          <div id="buttons">
            <TwitterShare adage={adage} meaning={meaning} />
            <Button onClick={this.getNewAdages} />
          </div>
        </div>
      </div>
    );
  }
}

const AdageBox = ({ adage, meaning }) => {
  return (
    // Fragmenty pozwalają zgrupować listę potomków 
    // bez konieczności dodawania zbędnych węzłów do drzewa DOM
    <React.Fragment>
      <div id="adage">
        <i class="fas fa-quote-right" style={{ fontSize: "12px" }}></i>
        {adage}
        <i class="fas fa-quote-right" style={quoteRight}></i>
      </div>
      <div id="meaning">-[{meaning}]</div>
    </React.Fragment>
  )
}

const Button = ({ onClick }) => {
  return (
    <button id="btn-new-adage" onClick={onClick}><i class="fas fa-angle-double-right"></i></button>
  )
}

const TwitterShare = ({ adage, meaning }) => {
  return (
    <React.Fragment>
      <a id="adage-tweet" href={`https://twitter.com/intent/tweet?text=${adage} -[${meaning}]`} target="_blank" rel="noopener noreferrer" title="Post this quote on twitter!">
        <i class="fab fa-twitter"></i>
      </a>
    </React.Fragment>
  )
}

export default RandomAdagesMachine;
