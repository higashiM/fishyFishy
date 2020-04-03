import React from "react";

import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Alert from "./components/Alert";
import "./App.css";

//figure out current state
//save all state to local
//game over on 0 fish -- stop the timer?
//stats-> more intuitive?

class App extends React.Component {
  state = {
    timeStart: new Date(),
    time: 0,
    fishCount: 2,

    fishCost: 100,
    fishSell: 0,
    fishFood: 100,
    fishFoodCost: 1,
    fishFoodBuy: 0,
    money: 150,
    fishMaxSize: 9,

    nextMaxSize: 16,
    alert: "",
    maxFish: 2,
    reDraw: false
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
    let newTime = Math.floor((new Date() - this.state.timeStart) / 1000);
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
    let newRedraw = false;
    if (newFishCount < currentFish) newRedraw = true;

    if (newFishCount < 1) newFishCount = 0;

    let newMaxFish = Math.max(newFishCount, this.state.maxFish);

    localStorage.setItem("High Score", Math.round(newMaxFish));

    this.setState({
      time: newTime,
      fishCount: newFishCount,
      fishFood: newFishFood,
      deadFish: newDeadFish,
      maxFish: newMaxFish,
      reDraw: newRedraw
    });
  }

  buyFood = currentState => {
    if (currentState.money >= currentState.fishFoodCost * 100) {
      let newFishFood = currentState.fishFood + 100;
      let newMoney = currentState.money - currentState.fishFoodCost * 100;

      let newFishFoodCost = currentState.fishFoodCost + 0.1;

      this.setState({
        fishFood: newFishFood,
        money: newMoney,
        fishFoodCost: newFishFoodCost
      });
    } else {
      this.setState({ alert: "not enough cash to buy a food!" });
    }
  };
  buyNewTank = currentState => {
    if (currentState.money > currentState.nextMaxSize * 10) {
      let factor = Math.sqrt(currentState.nextMaxSize) + 3;
      let newNextMaxSize = factor * factor;
      let newFishMaxSize = currentState.nextMaxSize;
      let newMoney = currentState.money - currentState.nextMaxSize * 10;
      this.setState({
        fishMaxSize: newFishMaxSize,
        money: newMoney,
        nextMaxSize: newNextMaxSize,
        reDraw: true
      });
    } else {
      this.setState({ alert: "not enough cash to buy a tank!" });
    }
  };

  sellFish = currentState => {
    if (currentState.fishCount > 0) {
      let newFishCount = currentState.fishCount - 1;
      let newMoney = currentState.money + currentState.fishCost;
      let newfishCost = currentState.fishCost - 1;

      this.setState({
        fishCount: newFishCount,
        money: newMoney,
        fishCost: newfishCost
      });
    } else {
      this.setState({ alert: "no fish to sell!" });
    }
  };

  reset() {
    this.setState({
      timeStart: new Date(),
      time: 0,
      fishCount: 2,
      fishCost: 100,
      fishSell: 0,
      fishFood: 100,
      fishFoodCost: 1,
      fishFoodBuy: 0,
      money: 150,
      fishMaxSize: 9,
      nextMaxSize: 16,
      alert: "",
      reDraw: true
    });
  }
  render() {
    const {
      time,
      fishCount,
      fishCost,
      fishFood,
      fishFoodCost,
      money,
      fishMaxSize,
      nextMaxSize,
      alert,
      deadFish,
      reDraw
    } = this.state;
    return (
      <div className="App">
        <Header maxFish={localStorage.getItem("High Score")} />
        <p className="App-clock">
          Day {time} <button onClick={() => this.reset()}>reset</button>
        </p>
        <p>
          You have
          <p className="fishCount"> {Math.round(fishCount)} </p> fish - market
          price of fish is
          <p className="fishCost"> {fishCost}</p>$ each
        </p>
        <p>
          You have
          <p className="fishFood"> {fishFood}</p> food in storage - price per
          food is
          <p className="fishFoodCost">
            {" "}
            {Math.round(fishFoodCost * 100) / 100}
          </p>
          $
        </p>

        <p>
          You have
          <p className="money"> {Math.round(money * 100) / 100} </p>$ remaining
        </p>

        <p>
          <button
            onClick={() => this.buyFood({ fishFood, fishFoodCost, money })}
          >
            buy 100 food
          </button>
          <button onClick={() => this.sellFish({ fishCount, money, fishCost })}>
            Sell a Fish
          </button>
          <p>
            Your tanksize is
            <p className="tank"> {fishMaxSize} </p> fish - a {nextMaxSize}{" "}
            capacity tank is available{" "}
            <button onClick={() => this.buyNewTank({ nextMaxSize, money })}>
              buy Tank for ${nextMaxSize * 10}
            </button>
          </p>
        </p>
        <Alert alert={alert} />

        <Canvas
          numFish={Math.round(fishCount)}
          maxFish={fishMaxSize}
          deadFish={deadFish}
          reDraw={reDraw}
        />
      </div>
    );
  }
}
export default App;
