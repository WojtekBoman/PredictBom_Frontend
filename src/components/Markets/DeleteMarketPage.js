import React from 'react';
import {connect} from 'react-redux';
import { Alert, Button, Container, Spinner } from 'react-bootstrap';
import {fetchMarket,deleteMarket} from '../../actions/marketActions';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from 'react-loader-spinner';

class DeleteMarketPage extends React.Component {


    componentDidMount() {
        this.props.fetchMarket(this.props.match.params.id);
    }

    renderButtonContent() {
        if ((typeof this.props.loading !== 'undefined') && this.props.loading.pending) {
            return (
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
        }else{
            return "Zatwierdź"
        }
    }
  
    renderInfo() {
      if(this.props.alert.payload) {
          return <Alert className="login-alert" variant="danger">
              {this.props.alert.payload}
          </Alert>
      }
  }

    renderLoading() {
        if(typeof(this.props.loadingMarket) !== "undefined" && this.props.loadingMarket.pending){
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
                    {this.renderButtonContent()}
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
            <header>
                <h4>Usuwanie rynku</h4>
                <hr className="my-4"></hr>
            </header>
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