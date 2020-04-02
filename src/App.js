import React from "react";

import Header from "./components/Header";
import Canvas from "./components/Canvas";
import "./App.css";

//display header ==done
//display fish count and market value
//display food remaining and market value
//display money remaining

//button buy food -
//button sell fish

//container showing how many fish

class App extends React.Component {
  state = {
    timeStart: new Date(),
    time: 0,
    fishCount: 2,
    fishCost: 100,
    fishFood: 100,
    fishFoodCost: 1,
    money: 0,
    fishMaxSize: 100
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 2000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    //Verhulst population formula n(t+1) = n(t)+rn(t)(1-n/k)
    //where N(t) represents number of individuals
    //at time t, r the intrinsic growth rate and K is the carrying capacit
    let newTime = new Date() - this.state.timeStart;
    let currentFish = this.state.fishCount;
    let growthRate = 0.5 / 12;
    let maxFish = this.state.fishMaxSize;
    let newFishCount =
      currentFish + growthRate * currentFish * (1 - currentFish / maxFish);
    let newFishFood = Math.max(
      this.state.fishFood - Math.round(currentFish),
      0
    );

    this.setState({
      time: newTime,
      fishCount: newFishCount,
      fishFood: newFishFood
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-clock">Counter {this.state.time}.</p>

        <p>
          You have{" "}
          <p className="fishCount"> {Math.round(this.state.fishCount)} </p> fish
        </p>

        <p>
          Current price per fish
          <p className="fishCost"> {this.state.fishCost}</p>$
        </p>
        <p>
          You have
          <p className="fishFood"> {this.state.fishFood}</p> food remaining
        </p>
        <p>
          Current price per food
          <p className="fishFoodCost"> {this.state.fishFoodCost}</p>$
        </p>

        <p>
          You have
          <p className="money"> {this.state.money} </p>$ remaining
        </p>

        <p>
          Your tanksize is
          <p className="tank"> {this.state.fishMaxSize} </p> fish
        </p>

        <Canvas
          numFish={Math.round(this.state.fishCount)}
          maxFish={this.state.fishMaxSize}
        />
      </div>
    );
  }
}

export default App;
