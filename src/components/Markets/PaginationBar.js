import React from 'react';
import {Card, Button, InputGroup, FormControl,Nav} from 'react-bootstrap';
import {connect} from 'react-redux';
import {changePage} from '../../actions/filterActions';


class PaginationBar extends React.Component {

    range = (from, to, step = 1) => {
        let i = from;
        const range = [];
      
        while (i <= to) {
          range.push(i);
          i += step;
        }
      
        return range;
      }

      fetchPageNumbers = () => {
        const LEFT_PAGE = 'LEFT';
        const RIGHT_PAGE = 'RIGHT';
        const totalPages = this.props.totalPages
        const currentPage = this.props.currentPage;
        const pageNeighbours = 2;
    
        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = (this.pageNeighbours * 2) + 3;
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
          const hasRightSpill = (totalPages - endPage) > 1;
          const spillOffset = totalNumbers - (pages.length + 1);
    
          switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill): {
              const extraPages = this.range(startPage - spillOffset, startPage - 1);
              pages = [LEFT_PAGE, ...extraPages, ...pages];
              break;
            }
    
            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill): {
              const extraPages = this.range(endPage + 1, endPage + spillOffset);
              pages = [...pages, ...extraPages, RIGHT_PAGE];
              break;
            }
    
            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
              pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
              break;
            }
          }
    
          return [1, ...pages, totalPages];
        }
    
        return this.range(1, totalPages);
      }

      renderPagination() {
        if (!this.props.size || this.props.size === 1) return null;

        const LEFT_PAGE = 'LEFT';
        const RIGHT_PAGE = 'RIGHT';
    
        const { currentPage } = this.props;
        const pages = this.fetchPageNumbers();
    
        return (
            <Nav aria-label="Countries Pagination" className="text-center">
              <ul className="pagination">
                { pages.map((page, index) => {
    
                  if (page === LEFT_PAGE) return (
                    <li key={index} className="page-item">
                      <Nav.Link onClick={() => this.changePage(page-1)} className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </Nav.Link>
                    </li>
                  );
    
                  if (page === RIGHT_PAGE) return (
                    <Nav.Item key={index} className="page-item">
                      <Nav.Link onClick={() => this.changePage(page+1)} className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </Nav.Link>
                    </Nav.Item>
                  );
    
                  return (
                    <Nav.Item key={index} className={`page-item${ currentPage === page-1 ? ' active' : ''}`}>
                      <Nav.Link className="page-link" onClick={() => this.changePage(page)} >{ page }</Nav.Link>
                    </Nav.Item>
                  );
    
                }) }
    
              </ul>
            </Nav>
        );
      }

    changePage(page) {
        console.log("Wywołano dla strony",page-1)
        this.props.dispatch(changePage(page-1))
    }

    render() {
    
        const pageNumCss = {
            minWidth: "30px",
            maxWidth:"45px",
            border: "1px solid #292b2c",
            color: "#292b2c",
            textAlign: "center",
            fontWeight: "bold"
        };

        // return ( <Card.Footer>
        //     <div style={{ "float": "left" }}>
        //         Strona {this.props.currentPage + 1} z {this.props.size}
        //     </div>
        //     <div style={{ "float": "right" }}>
        //         <InputGroup size="sm">
        //             <InputGroup.Prepend>
        //                 <Button type="button" variant="outline-dark">
        //                     {/* <FontAwesomeIcon icon={faAngleDoubleLeft} /> */}
        //                      {"<<"}
        //                     </Button>
        //                 <Button type="button" variant="outline-dark" >
        //                     {/* <FontAwesomeIcon icon={faAngleLeft} /> */}
        //                      {"<"}
        //                     </Button>
        //             </InputGroup.Prepend>
        //             <FormControl style={pageNumCss} className={"bg-light"} name="currentPage" value={this.props.currentPage+1} disabled/>
        //             <InputGroup.Append>
        //                 <Button type="button" variant="outline-dark" >
        //                     {/* <FontAwesomeIcon icon={faAngleRight} />  */}
        //                     {">"}
        //                     </Button>
        //                 <Button type="button" variant="outline-dark">
        //                     {/* <FontAwesomeIcon icon={faAngleDoubleRight} />  */}
        //                     {">>"}
        //                     </Button>
        //             </InputGroup.Append>
        //         </InputGroup>
        //     </div>
        // </Card.Footer>)
        return (
            <div>
                {this.renderPagination()}
            </div>
        )
    }
}

// const mapStateToProps = (state,ownProps) => {
//     return {
//         totalPages: ownProps.totalPages,
//         firstPage: ownProps.firstPage,
//         lastPage: ownProps.lastPage
//     }
// }

const mapDispatchToProps = dispatch => {
    return{
        dispatch
    }
}

export default connect(null,mapDispatchToProps)(PaginationBar);