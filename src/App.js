import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Stocks from "./Components/stocks.js";
import Pagination from "./Components/paginate";
import axios from "axios";
class App extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      postsPerPage: 5,
      stocks: [],
      loading: true,
      currentStocks: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://api.coinlayer.com/list?access_key=310b29a1427b806043e3e2f98bb0372d"
      )
      .then((res) => {
        let obj = res.data.crypto;
        let data = Object.values(obj);
        var stocks = [...this.state.stocks];
        for (let i = 0; i < data.length; i++) {
          stocks[i] = {};
          stocks[i].id = i;
          stocks[i].name = data[i].name;
          stocks[i].symbol = data[i].symbol;
          stocks[i].max_supply = data[i].max_supply;
        }
        this.setState({ stocks });
        this.setState({ loading: false });
        this.CurrentStocks(this.state.currentPage);

        console.log(stocks);
      })
      .catch((err) => console.log(err));
  }
  CurrentStocks = (number) => {
    const indexOfLastPost = number * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    var currentStocks = [...this.state.currentStocks];
    currentStocks = this.state.stocks.slice(indexOfFirstPost, indexOfLastPost);
    this.setState({ currentStocks });
    this.setState({ currentPage: number });
  };

  paginate = (number) => {
    if (number === "Next") {
      var nextpage = this.state.currentPage + 1;
      this.CurrentStocks(nextpage);
    } else if (number === "Previous") {
      var previouspage = this.state.currentPage - 1;
      this.CurrentStocks(previouspage);
    } else {
      this.CurrentStocks(number);
    }
  };
  render() {
    const {
      postsPerPage,
      stocks,
      loading,
      currentStocks,
      currentPage,
    } = this.state;

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="d-flex">
            <h2>Crypto Currency App</h2>
            <form className="d-flex  float-left">
              <input className="form-control me-2" placeholder="search"></input>
              <button className="btn btn-outline-success" type="submit">
                search
              </button>
            </form>
          </div>
        </nav>
        <Stocks stocks={currentStocks} loading={loading} />
        <Pagination
          loading={loading}
          paginate={this.paginate}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}
export default App;
