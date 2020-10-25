import React from 'react';
import {connect} from 'react-redux';
import {fetchMarkets} from '../../actions/marketActions';
import {Row,Col,Spinner,Alert} from 'react-bootstrap';
import Market from './Market';
import PaginationBar from './PaginationBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSadTear} from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';



class MarketsList extends React.Component {

    componentDidMount() {
        this.props.fetchMarkets(this.props.typeOfMarkets,this.props.filter.marketTitle,this.props.filter.selectedCategories,this.props.filter.sortedBy,this.props.filter.page,this.props.filter.pageSize);
    }

    componentDidUpdate(prevProps,prevState) {
        if(!(JSON.stringify(this.props.filter)===JSON.stringify(prevProps.filter))){
            this.props.fetchMarkets(this.props.typeOfMarkets,this.props.filter.marketTitle,this.props.filter.selectedCategories,this.props.filter.sortedBy,this.props.filter.page,this.props.filter.pageSize);
        }
        
    }

    renderPagination() {
        if(this.props.markets.length > 0) {
            return(
                <div>
                    {/* lastPage={this.props.markets.markets.last} firstPage={this.props.markets.markets.first} currentPage={this.props.markets.markets.number} totalElements={this.props.markets.markets.totalElements} totalPages={this.props.markets.markets.totalPages} size={this.props.markets.markets.size}  */}
                    <PaginationBar />
                </div>
            )
        }
    }

    renderNotFoundMessage() {
        
        return (
        <div className="text-center">
            <FontAwesomeIcon icon={faSadTear} size={"9x"}/>
            <h2>Nie znaleziono żadnych rynków</h2>
        </div>
        )
    }

    renderLoadingMessage(){
        return(
        <div className="text-center">
        <Loader
             type="TailSpin"
             color="black"
        />
        </div>
        )
    }

    renderInfo() {
        if(this.props.alert.payload) {
            return <Alert className="login-alert" variant="danger">
                {this.props.alert.payload}
            </Alert>
        }
    }

    renderList() {
        if(this.props.markets.length > 0){
            return(
                <Row style={{width:"100%"}}>
                    {this.props.markets.map(market => 
                    <Col xs={12} sm={6} className="d-flex align-items-stretch" style={{margin:"20px 0"}} key={market.marketId}>
                        <Market marketId={market.marketId} marketTitle={market.topic} description={market.description} marketCategory={market.category} marketCover={market.marketCover} createdDate={market.createdDate}/>
                    </Col>
                    )}
                </Row>
                )
        }else{
            return (
                <div>
                    {((typeof this.props.loading !== 'undefined') && this.props.loading.pending) ? <div>{this.renderLoadingMessage()}</div> : <div>{this.renderNotFoundMessage()}</div> }
                </div>
            )
        }
        
    }

    render() {
        console.log("render marketslist")
        return(
                <div>
                {this.renderList()}
                {this.renderInfo()}
                {this.renderPagination()}
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return {
        typeOfMarkets: ownProps.typeOfMarkets,
        markets: Object.values(state.markets),
        loading: state.loading.FETCH_MARKETS,
        filter: state.filter,
        alert: state.alert
    }
}

export default connect(mapStateToProps,{fetchMarkets})(MarketsList);