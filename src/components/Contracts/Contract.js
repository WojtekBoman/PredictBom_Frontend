import React from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "react-loader-spinner";
import { Image, Card, Icon } from "semantic-ui-react";
import { displayMarketCover } from "../../helpers/MartketCovers";
import './Contract.scss'

class Contract extends React.Component {
  state = {
    borderColor: "black",
    status: "",
    iconName: "",
  };

  componentDidMount() {
    switch (this.props.contractStatus.toLowerCase()) {
      case "pending":
        this.setState({
          borderColor: "black",
          status: "Oczekujący",
          iconName: "clock",
        });
        break;
      case "won":
        this.setState({
          borderColor: "green",
          status: "Wygrany",
          iconName: "trophy",
        });
        break;
      case "lost":
        this.setState({
          borderColor: "red",
          status: "Przegrany",
          iconName: "close",
        });
        break;
      default:
        this.setState({
          borderColor: "black",
          status: "Oczekujący",
          iconName: "clock",
        });
    }
  }

  renderLoading = () => {
    if (!this.props.market)
      return (
        <Row className="text-center no-gutters">
          <Loader type="TailSpin" color="black" />
        </Row>
      );
  };

  renderCardBorder = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "black";
      case "won":
        return "green";
      case "lost":
        return "red";
      default:
        return "black";
    }
  };


  render() {
    return (
      <Card fluid color={this.state.borderColor}>
        <LinkContainer to={`/contracts/details/${this.props.id}`}>
          <Image
            className="contract-cover"
            src={displayMarketCover( this.props.marketInfo.marketCover, this.props.marketInfo.marketCategory)}
          />
        </LinkContainer>
        <Card.Content>
          <Card.Header>{this.props.bet.title}</Card.Header>
          {this.props.contractOption ? (
            <Card.Header>Kontrakt na tak</Card.Header>
          ) : (
            <Card.Header>Kontrakt na nie</Card.Header>
          )}
          <Card.Meta>{this.props.marketInfo.topic}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <span>
            <Icon name="money bill alternate outline" />
            {this.props.shares > 0 ? (
              <span>Liczba akcji: {this.props.shares}</span>
            ) : (
              <span>Wszystkie akcje w sprzedaży</span>
            )}
          </span>
        </Card.Content>
        {this.props.contractStatus === "PENDING" && (
          <Card.Content extra>
            <span>
              <Icon name="sellsy" />
              {this.props.offersSize}
            </span>
          </Card.Content>
        )}
        <Card.Content extra>
          <span>
            <Icon name={this.state.iconName} />
            {this.state.status}
          </span>
        </Card.Content>
      </Card>
    );
  }
}

export default connect(null)(Contract);
