import React from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import {
  selectCategory,
  unselectCategory,
  updateSorted,
  changePageSize,
} from "../../actions/filterActions";
import {renderCategoryFilter} from '../../helpers/MarketCategories'

class MarketsFilter extends React.Component {
  state = {
    filters: [],
  };

  range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

  handleSort = (e) => {
    this.props.dispatch(updateSorted(e.target.value.split(",")));
  };

  handleCategory = (e) => {
    if (this.props.selectedCategories.includes(e.target.value)) {
      this.props.dispatch(unselectCategory(e.target.value));
    } else {
      this.props.dispatch(selectCategory(e.target.value));
    }
  };

  handlePageSize = (e) => {
    this.props.dispatch(changePageSize(parseInt(e.target.value)));
  };

  renderPageSizeFilter() {
    return (
      <div>
        <Form.Label>
          <h5>Rozmiar strony</h5>
        </Form.Label>
        <Form.Control as="select" onChange={this.handlePageSize}>
          {this.range(10, 30, 10).map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </Form.Control>
      </div>
    );
  }



  render() {
    return (
      <div>
        <Form.Label>
          <h5>Sortuj według</h5>
        </Form.Label>
        <Form.Control as="select" onChange={this.handleSort}>
          <option value={"createdDate,desc"}>Od najnowszych</option>
          <option value={"createdDate,asc"}>Od najstarszych</option>
          <option value={"predictedDateEnd,desc"}>
            Nabliższego czasu zakończenia
          </option>
          <option value={"predictedDateEnd,asc"}>
            Najdalszego czasu zakończenia
          </option>
        </Form.Control>
        <hr className="my-4"></hr>
        {this.renderPageSizeFilter()}
        <hr className="my-4"></hr>
        {renderCategoryFilter(this.handleCategory)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCategories: state.filterMarkets.selectedCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketsFilter);
