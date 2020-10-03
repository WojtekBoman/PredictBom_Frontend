import React from 'react';
import {connect} from 'react-redux';
import {fetchMarkets} from '../../actions/marketActions';
import {Row,Col,Spinner} from 'react-bootstrap';
import Market from './Market';
import PaginationBar from './PaginationBar'


class MarketsList extends React.Component {

    componentDidMount() {
        this.props.fetchMarkets(this.props.typeOfMarkets,this.props.filter.marketTitle,this.props.filter.selectedCategories,this.props.filter.sortedBy,this.props.filter.page);
    }

    componentDidUpdate(prevProps,prevState) {
        if(!(JSON.stringify(this.props.filter)===JSON.stringify(prevProps.filter))){
            this.props.fetchMarkets(this.props.typeOfMarkets,this.props.filter.marketTitle,this.props.filter.selectedCategories,this.props.filter.sortedBy,this.props.filter.page);
        }
        
    }

    renderPagination() {
        if(this.props.markets.markets) {
            console.log("Markets",this.props.markets.markets);
            return(
                <div>
                    <PaginationBar lastPage={this.props.markets.markets.last} firstPage={this.props.markets.markets.first} currentPage={this.props.markets.markets.number} totalElements={this.props.markets.markets.totalElements} totalPages={this.props.markets.markets.totalPages} size={this.props.markets.markets.size} />
                </div>
            )
        }
    }

    renderLoadingMessage(){
        if ((typeof this.props.loading !== 'undefined') && this.props.loading.pending) {
        return(
        <div>
        <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        />
        Ładowanie...
        </div>
        )
    }
    }

    renderList() {


        if(this.props.markets.markets){
            return(
                <Row style={{width:"100%"}}>
                    {this.props.markets.markets.content.map(market => 
                    <Col xs={12} sm={6} className="d-flex align-items-stretch" style={{margin:"20px 0"}} key={market.marketId}>
                        <Market marketId={market.marketId} marketTitle={market.topic} description={market.description} marketCategory={market.category} marketCover={market.marketCover}/>
                    </Col>
                    )}
                </Row>
                )
        }
        
    }

    render() {
        return(
                <div>
                {this.renderLoadingMessage()}
                {this.renderList()}
                {this.renderPagination()}
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        typeOfMarkets: ownProps.typeOfMarkets,
        markets: state.markets,
        loading: state.loading.FETCH_MARKETS,
        filter: state.filter
    }
}

export default connect(mapStateToProps,{fetchMarkets})(MarketsList);