import React from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchRanking } from "../../actions/rankingActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { alertActions } from "../../actions/alertActions";
import BackHeader from "../BackHeader";

class Ranking extends React.Component {
  componentDidMount() {
    this.props.fetchRanking();
  }

  componentWillUnmount() {
    this.props.clear();
  }

  renderLoading = () => {
    if (
      typeof this.props.loading !== "undefined" &&
      this.props.loading.pending
    ) {
      return (
        <div>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <h3>Pobieranie rankingu</h3>
        </div>
      );
    }
  };

  renderError = () => {
    if (this.props.alert.payload) {
      return (
        <div>
          <h3>Wystąpił błąd</h3>
        </div>
      );
    }
  };

  renderRanking() {
    if (this.props.ranking.length > 0) {
      return (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <FontAwesomeIcon className="mr-1" icon={faTrophy} />
                  Pozycja
                </th>
                <th>Użytkownik</th>
                <th>Budżet [$]</th>
              </tr>
            </thead>
            <tbody>
              {this.props.ranking.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>
                    {Math.round((user.budget + Number.EPSILON) * 100) / 100}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  }

  render() {
    return (
      <Container className="bg-light border rounded shadow-container create-market-container">
        <BackHeader title="Top 100 graczy" />
        <hr className="my-4"></hr>
        {this.renderLoading()}
        {this.renderRanking()}
        {this.renderError()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.FETCH_RANKING,
    alert: state.alert,
    ranking: state.ranking,
  };
};

export default connect(mapStateToProps, {
  fetchRanking,
  clear: alertActions.clear,
})(Ranking);
