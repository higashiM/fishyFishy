import React from "react";

import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Alert from "./components/Alert";
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
    time: new Date(0).toLocaleString("en-UK", { time: false }),
    fishCount: 2,
    fishCost: 100,
    fishSell: 0,
    fishFood: 100,
    fishFoodCost: 1,
    fishFoodBuy: 0,
    money: 100,
    fishMaxSize: 100,
    alert: "",
    maxFish: 0
  };

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    //Verhulst population formula n(t+1) = n(t)+rn(t)(1-n/k)
    //where N(t) represents number of individuals
    //at time t, r the intrinsic growth rate and K is the carrying capacit
    let newTime = new Date() - this.state.timeStart;
    let currentFish = Math.max(this.state.fishCount, 0);
    let growthRate = 0.5 / 12;
    let maxFish = this.state.fishMaxSize;

    let newFishFood = this.state.fishFood - Math.round(currentFish);
    let newDeadFish = 0;

    if (newFishFood < 0) {
      newDeadFish = -Math.min(newFishFood / 8, -1);
      this.setState({
        alert:
          "you have run out of food and the fish are going hannibal the cannibal"
      });

      newFishFood = 0;
    }

    let newFishCount =
      currentFish +
      growthRate * currentFish * (1 - currentFish / maxFish) -
      newDeadFish;

    let milliToDays = 60 * 60 * 24;

    let newMaxFish = Math.max(newFishCount, this.state.maxFish);
    this.setState({
      time: new Date(newTime * milliToDays).toLocaleString(),
      fishCount: newFishCount,
      fishFood: newFishFood,
      deadFish: newDeadFish,

      maxFish: newMaxFish
    });
  }

  buyFood = currentState => {
    this.setState({
      fishFood: this.state.fishFood + 100,
      money: this.state.money - this.state.fishFoodCost * 100,
      fishFoodCost: this.state.fishFoodCost + 1
    });
  };
  buyNewTank = currentState => {
    this.setState({
      fishMaxSize: 400,
      money: this.state.money - 1000
    });
  };

  sellFish = currentState => {
    if (this.state.fishCount > 0) {
      this.setState({
        fishCount: this.state.fishCount - 1,
        money: this.state.money + this.state.fishCost,
        fishCost: this.state.fishCost - 1
      });
    } else {
      this.setState({ alert: "no fish to sell!" });
    }
  };

  render() {
    return (
      <div className="App">
        <Header maxFish={Math.round(this.state.maxFish)} />
        <p className="App-clock">Date {this.state.time}.</p>

        <p>
          You have
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
          <p className="tank"> {this.state.fishMaxSize} </p> fish - a 400
          capacity tank is available for $1000
        </p>
        <p>
          <button onClick={() => this.buyFood()}>buy 100 food</button>
          <button onClick={() => this.buyNewTank()}>buy Tank</button>
          <button onClick={() => this.sellFish()}>Sell a Fish</button>
        </p>

        <Canvas
          numFish={Math.round(this.state.fishCount)}
          maxFish={this.state.fishMaxSize}
          deadFish={this.state.deadFish}
        />
        <Alert alert={this.state.alert} />
      </div>
    );
  }
}
export default App;
