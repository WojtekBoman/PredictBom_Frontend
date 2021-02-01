import React from 'react';
import {connect} from 'react-redux';
import { Alert, Button, Container, Spinner } from 'react-bootstrap';
import {fetchMarket,deleteMarket} from '../../actions/marketActions';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from 'react-loader-spinner';
import BackHeader from '../BackHeader';
import {
    renderInput,
    renderInfo,
    renderSelectField,
  } from "../../helpers/FormInputs";
  import { renderButtonContent } from "../../helpers/LoadingContent";

class DeleteMarketPage extends React.Component {


    componentDidMount() {
        this.props.fetchMarket(this.props.match.params.id);
    }

    renderLoading() {
        if((typeof this.props.loadingMarket !== 'undefined') && this.props.loadingMarket.pending && !this.props.currentMarket){
            return(
                <div className="text-center">
                <Loader
                     type="TailSpin"
                     color="black"
                />
                </div>
                )
        }
    }

    renderFirstDeleteBetsInfo() {
            return(
                <div>
                    <h4>Aby usunąć rynek najpierw usuń zakłady</h4>
                    <LinkContainer to={`/markets/editBets/${this.props.match.params.id}`}>
                        <Button>
                            Edytuj zakłady
                        </Button>
                    </LinkContainer>
                </div>
            )
    }

    renderDeleteField() {
        return(
            <div>
                <h4>Czy na pewno chcesz usunąć rynek ?</h4>
                <Button onClick={() => this.props.deleteMarket(this.props.match.params.id)}>
                    {renderButtonContent(this.props.loading,"Usuń rynek")}
                </Button>
            </div>
        )
    }

    renderContent() {
        if(this.props.currentMarket) {
           return (
               <div>
                   {this.props.currentMarket.bets ? <div>{this.renderFirstDeleteBetsInfo()}</div> : <div>{this.renderDeleteField()}</div>}
               </div>
           )

           
        }
    }

    render() {
        return(
        <Container className="bg-light border rounded shadow-container create-market-container">
            <BackHeader title="Usuwanie rynku" />
            <hr className="my-4"></hr>
            {this.renderLoading()}
            {this.renderContent()}
        </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loadingMarket: state.loading.FETCH_MARKET,
        loading: state.loading.DELETE_MARKET,
        currentMarket: state.markets.find(market => market.marketId == ownProps.match.params.id),
        alert: state.alert
    }
}


export default connect(mapStateToProps,{fetchMarket,deleteMarket})(DeleteMarketPage);