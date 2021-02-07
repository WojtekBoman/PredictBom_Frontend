import React from "react";
import { connect } from "react-redux";
import { fetchMarkets } from "../../actions/marketActions";
import { Row, Col } from "react-bootstrap";
import Market from "./Market";
import PaginationBar from "./PaginationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSadTear,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";
import { changePage, clearFilters } from "../../actions/filterActions";
import { alertActions } from "../../actions/alertActions";
import MarketsFilter from "./MarketsFilter";
import SearchBar from "./SearchBar";
import { updateSearch } from "../../actions/filterActions";

class MarketsList extends React.Component {
  componentDidMount() {
    this.props.fetchMarkets(
      this.props.typeOfMarkets,
      "",
      this.props.filter.selectedCategories,
      this.props.filter.sortedBy,
      0,
      this.props.filter.pageSize
    );
  }

  componentWillUnmount() {
    this.props.clear();
    this.props.clearFilters();
  }

  componentDidUpdate(prevProps) {
    if (
      !(JSON.stringify(this.props.filter) === JSON.stringify(prevProps.filter))
    ) {
      this.props.fetchMarkets(
        this.props.typeOfMarkets,
        this.props.filter.marketTitle,
        this.props.filter.selectedCategories,
        this.props.filter.sortedBy,
        this.props.filter.page,
        this.props.filter.pageSize
      );
    }
  }

  renderNotFoundMessage() {
    if (!this.props.alert.payload) {
      return (
        <div className="text-center">
          <FontAwesomeIcon icon={faSadTear} size={"9x"} />
          <h3>W tej chwili w grze nie toczą się żadne rynki</h3>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <FontAwesomeIcon icon={faExclamationCircle} size={"9x"} />
          <h3>{this.props.alert.payload}</h3>
        </div>
      );
    }
  }

  renderContent() {
    if (
      typeof this.props.loading !== "undefined" &&
      this.props.loading.pending
    ) {
      return (
        <div className="text-center">
          <Loader type="TailSpin" color="black" />
        </div>
      );
    } else {
      return <div>{this.renderList()}</div>;
    }
  }

  renderList() {
    if (this.props.markets.length > 0) {
      return (
        <Row>
          {this.props.markets.map((market) => (
            <Col
              xs={12}
              sm={6}
              className="d-flex align-items-stretch"
              style={{ margin: "20px 0" }}
              key={market.marketId}
            >
              <Market
                author={market.author}
                marketId={market.marketId}
                published={market.published}
                marketTitle={market.topic}
                description={market.description}
                marketCategory={market.category}
                marketCover={market.marketCover}
                createdDate={market.createdDate}
                bets={market.bets}
                correctBetId={market.correctBetId}
              />
            </Col>
          ))}
          <PaginationBar
            paginationInfo={this.props.paginationInfo}
            changePage={changePage}
          />
        </Row>
      );
    } else {
      return <div>{this.renderNotFoundMessage()}</div>;
    }
  }

  render() {
    return (
      <div className="mt-4">
        <SearchBar search={updateSearch} />
        <Row>
          <Col sm={3}>
            <MarketsFilter />
          </Col>
          <Col sm={9}>{this.renderContent()}</Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    typeOfMarkets: ownProps.typeOfMarkets,
    markets: Object.values(state.markets),
    loading: state.loading.FETCH_MARKETS,
    filter: state.filterMarkets,
    alert: state.alert,
    paginationInfo: state.pagination.paginationInfo,
  };
};

export default connect(mapStateToProps, {
  fetchMarkets,
  clear: alertActions.clear,
  clearFilters,
})(MarketsList);
