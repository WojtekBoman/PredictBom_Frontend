import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
  fetchContracts,
  fetchFilteredContracts,
} from "../../actions/contractActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSadTear,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";
import Contract from "./Contract";
import PaginationBar from "../Markets/PaginationBar";
import {
  changeContractPage,
  clearFilters,
  setStatusPending,
} from "../../actions/filterContractActions";
import { alertActions } from "../../actions/alertActions";

class ContractList extends React.Component {
  componentDidMount() {
    this.fetchContracts();
  }

  componentWillUnmount() {
    this.props.clear();
    this.props.clearFilters();
  }

  componentDidUpdate(prevProps) {
    if (
      !(JSON.stringify(this.props.filter) === JSON.stringify(prevProps.filter))
    ) {
      this.fetchContracts();
    }
  }

  fetchContracts() {
    if (this.props.offerPage) {
      this.props.fetchFilteredContracts(
        "PENDING",
        this.props.filter.contractOption,
        this.props.filter.betTitle,
        this.props.filter.marketTitle,
        this.props.filter.selectedCategories,
        this.props.filter.sortedBy,
        this.props.filter.page,
        this.props.filter.pageSize
      );
    } else {
      this.props.fetchFilteredContracts(
        this.props.filter.contractStatus,
        this.props.filter.contractOption,
        this.props.filter.betTitle,
        this.props.filter.marketTitle,
        this.props.filter.selectedCategories,
        this.props.filter.sortedBy,
        this.props.filter.page,
        this.props.filter.pageSize
      );
    }
  }

  renderNotFoundMessage() {
    return (
      <div className="text-center">
        <FontAwesomeIcon icon={faSadTear} size={"9x"} />
        <h2>Nie znaleziono żadnych kontraktów</h2>
      </div>
    );
  }

  renderInfo() {
    if (
      this.props.alert.payload &&
      !(typeof this.props.loading !== "undefined" && this.props.loading.pending)
    ) {
      return (
        <div className="text-center">
          <FontAwesomeIcon icon={faExclamationCircle} size={"9x"} />
          <h2>{this.props.alert.payload}</h2>
        </div>
      );
    }
  }

  returnObjectSize = (obj) => {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  renderContractList() {
    if (this.props.contracts.length > 0) {
      return (
        <Row style={{ width: "100%", margin: "0 auto" }}>
          {this.props.contracts.map((contract) => (
            <Col
              xs={12}
              md={6}
              className="d-flex align-items-stretch"
              key={contract.id}
              style={{ margin: "10px 0" }}
            >
              <Contract
                id={contract.id}
                offersSize={
                  contract.offers !== null
                    ? `Liczba ofert: ${contract.offers.length}`
                    : "Brak ofert"
                }
                bet={contract.bet}
                contractStatus={contract.contractStatus}
                marketInfo={contract.marketInfo}
                price={contract.price}
                shares={contract.shares}
                contractOption={contract.contractOption}
                betId={contract.betId}
              />
            </Col>
          ))}
        </Row>
      );
    } else if (!this.props.alert.payload) {
      return <div>{this.renderNotFoundMessage()}</div>;
    }
  }

  renderContent = () => {
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
      return (
        <div>
          {this.renderContractList()}
          <div>
            <PaginationBar
              paginationInfo={this.props.paginationInfo}
              changePage={changeContractPage}
            />
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderContent()}
        {this.renderInfo()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contracts: Object.values(state.contracts),
    loading: state.loading.FETCH_CONTRACTS,
    filter: state.filterContracts,
    paginationInfo: state.pagination.paginationContractInfo,
    alert: state.alert,
  };
};

export default connect(mapStateToProps, {
  fetchContracts,
  fetchFilteredContracts,
  clear: alertActions.clear,
  clearFilters,
  setStatusPending,
})(ContractList);
