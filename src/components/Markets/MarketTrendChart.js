import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import {
  fetchTransactions,
  clearTransactions,
} from "../../actions/transactionActions";
import LineChart from "./LineChart";
import Loader from "react-loader-spinner";

class MarketTrendChart extends React.Component {
  state = {
    currentBet: this.props.bets[0].id,
    currentOption: true,
    timeAgo: 1,
  };

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    var today = new Date();
    today.setDate(today.getDate() - 1);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    console.log(this.state.currentBet, this.state.currentOption, today);
    this.setState({ timeAgo: today });
    console.log(today);
    this.props.fetchTransactions(
      this.state.currentBet,
      this.state.currentOption,
      today
    );
  }

  componentWillUnmount() {
    this.props.clearTransactions();
  }

  onChangeTimeAgo = (e) => {
    var today;
    if (this.props.correctBetId > 0) {
      let timestamp = Date.parse(this.props.endDate);
      today = new Date(timestamp);
      console.log(this.props.endDate);
    } else {
      today = new Date();
    }
    today.setDate(today.getDate() - e.target.value);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    this.setState({ timeAgo: today });
    console.log(this.state.currentBet, this.state.currentOption, today);
    console.log(today);
    this.props.fetchTransactions(
      this.state.currentBet,
      this.state.currentOption,
      today
    );
  };

  onChangeBet = (e) => {
    this.setState({ currentBet: e.target.value });
    console.log(e.target.value, this.state.currentOption, this.state.timeAgo);
    this.props.fetchTransactions(
      e.target.value,
      this.state.currentOption,
      this.state.timeAgo
    );
  };

  onChangeBetOption = (e) => {
    this.setState({ currentOption: e.target.value });
    this.props.fetchTransactions(
      this.state.currentBet,
      e.target.value,
      this.state.timeAgo
    );
  };

  renderLoading() {
    if (
      typeof this.props.loading !== "undefined" &&
      this.props.loading.pending
    ) {
      return (
        <Loader
          height={50}
          width={50}
          style={{ margin: "10px" }}
          type="TailSpin"
          color="black"
        />
      );
    }
  }

  renderMarketFilter() {
    return (
      <div>
        <h5>Zakład</h5>
        <Form.Control as="select" onChange={this.onChangeBet}>
          {this.props.bets.map((bet) => (
            <option value={bet.id}>{bet.title}</option>
          ))}
        </Form.Control>
      </div>
    );
  }

  renderBetOptionFilter() {
    return (
      <div>
        <h5>Opcja zakładu</h5>
        <Form.Control as="select" onChange={this.onChangeBetOption}>
          <option value={true}>Opcja na tak</option>
          <option value={false}>Opcja na nie</option>
        </Form.Control>
      </div>
    );
  }

  renderTimeAgoFilter() {
    const times = [
      { value: 1, text: "Ostatni dzień" },
      { value: 7, text: "Ostatni tydzień" },
      { value: 30, text: "Ostatni miesiąc" },
      { value: 90, text: "Ostatnie 90 dni" },
    ];

    return (
      <div>
        <h5>Przedział czasowy</h5>
        <Form.Control as="select" onChange={this.onChangeTimeAgo}>
          {times.map((time) => (
            <option value={time.value}>{time.text}</option>
          ))}
        </Form.Control>
      </div>
    );
  }

  render() {
    return (
      <div>
        <header style={{ marginBottom: "20px" }}>
          <h4>Trend rynku</h4>
        </header>
        {this.props.transactions && (
          <div>
            <Row>
              <Col sm={4}>{this.renderMarketFilter()}</Col>
              <Col sm={4}>{this.renderBetOptionFilter()}</Col>
              <Col sm={4}>{this.renderTimeAgoFilter()}</Col>
            </Row>
            <hr className="my-4"></hr>
            {this.renderLoading()}
            <LineChart
              transactions={this.props.transactions}
              color="#3E517A"
              title={"Cena akcji"}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading.FETCH_TRANSACTIONS,
    alert: state.alert,
    transactions: state.transactions,
    betId: ownProps.betId,
    option: ownProps.option,
  };
};

export default connect(mapStateToProps, {
  fetchTransactions,
  clearTransactions,
})(MarketTrendChart);
