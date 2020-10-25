import React from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import Bet from './Bet';
import { marketsConstants } from '../../constants/marketsConstants';


class BetsList extends React.Component {

    componentDidMount() {
        
    }

    renderNotFoundInfo() {
        return(
        <div>
            <FontAwesomeIcon icon={faTimes} size={'6x'}/>
            <h3>Nie znaleziono zakładów</h3>
        </div>
        )
        
    }
    
    render(){
        console.log("Bets",this.props.bets);

        if(this.props.bets == null){
            return(
                <div className="text-center">
                    <FontAwesomeIcon icon={faTimes} size={'6x'}/>
                    <h3>Nie znaleziono zakładów</h3>
                    <h6>Dodaj zakłady, bez nich rynek nie będzie mógł się toczyć !</h6>
                </div>
            )
        }

        return(
            <div>
                {this.props.bets.map(bet => <Bet bestYesPrice={bet.bestYesPrice} bestNoPrice={bet.bestNoPrice} key={bet.id} betId={bet.id} marketId={this.props.marketId} chosenOption={bet.chosenOption} />)}
            </div>
        )
    }
}

export default BetsList