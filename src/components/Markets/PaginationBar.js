import React from "react";
import { Nav } from "react-bootstrap";
import { connect } from "react-redux";

class PaginationBar extends React.Component {
  state = {
    pageNeighbours: 1,
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

  fetchPageNumbers = () => {
    const LEFT_PAGE = "LEFT";
    const RIGHT_PAGE = "RIGHT";
    const totalPages = this.props.paginationInfo.totalPages;
    const currentPage = this.props.paginationInfo.number;
    const pageNeighbours = this.state.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = this.range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = this.range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = this.range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return this.range(1, totalPages);
  };

  renderPagination() {
    if (this.props.paginationInfo) {
      if (
        !this.props.paginationInfo.totalPages ||
        this.props.paginationInfo.totalPages === 1
      )
        return null;

      const LEFT_PAGE = "LEFT";
      const RIGHT_PAGE = "RIGHT";

      const { number } = this.props.paginationInfo;
      const pages = this.fetchPageNumbers();

      return (
        <Nav aria-label="Countries Pagination" className="text-center">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <Nav.Link
                      onClick={() => this.handleMoveLeft(number)}
                      className="page-link"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </Nav.Link>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <Nav.Item key={index} className="page-item">
                    <Nav.Link
                      onClick={() => this.handleMoveRight(number)}
                      className="page-link"
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </Nav.Link>
                  </Nav.Item>
                );

              return (
                <Nav.Item
                  key={index}
                  className={`page-item${number === page - 1 ? " active" : ""}`}
                >
                  <Nav.Link
                    className="page-link"
                    onClick={() => this.changePage(page)}
                  >
                    {page}
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </ul>
        </Nav>
      );
    }
  }

  changePage(page) {
    this.props.dispatch(this.props.changePage(page - 1));
  }

  handleMoveLeft(page) {
    this.props.dispatch(
      this.props.changePage(page - 1 - this.state.pageNeighbours * 2 - 1)
    );
  }

  handleMoveRight(page) {
    this.props.dispatch(
      this.props.changePage(page + this.state.pageNeighbours * 2 + 1)
    );
  }

  render() {
    return <div>{this.renderPagination()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    paginationInfo: ownProps.paginationInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationBar);
