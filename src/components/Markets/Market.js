import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Button } from "react-bootstrap";
import TimeAgo from "react-timeago";
import polishStrings from "react-timeago/lib/language-strings/pl";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { connect } from "react-redux";
import { displayMarketCover } from "../../helpers/MartketCovers";

const Market = (props) => {
  return (
    <Card>
      <LinkContainer to={`/markets/details/${props.marketId}`}>
        <Card.Img
          className="toMarket"
          variant="top"
          src={displayMarketCover(props.marketCover,props.marketCategory)}
          style={{ width: "100%", height: "15vw", objectFit: "cover" }}
        />
      </LinkContainer>
      <Card.Body>
        <Card.Title>{props.marketTitle}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        {props.user &&
          props.user.username === props.author &&
          props.correctBetId === 0 && (
            <div>
              {!props.published && (
                <LinkContainer
                  className="market-card-buttons"
                  to={`/markets/editCover/${props.marketId}`}
                >
                  <Button>Zmień zdjęcie</Button>
                </LinkContainer>
              )}

              <LinkContainer
                className="market-card-buttons"
                to={`/markets/editBets/${props.marketId}`}
              >
                <Button>
                  {!props.published ? (
                    <span>Zarządzaj zakładami</span>
                  ) : (
                    <span>Dodaj zakład</span>
                  )}
                </Button>
              </LinkContainer>
              {props.bets && !props.published && (
                <LinkContainer
                  className="market-card-buttons"
                  to={`/markets/makePublic/${props.marketId}`}
                >
                  <Button>Opublikuj rynek</Button>
                </LinkContainer>
              )}
              {/* {props.bets && !props.published && ( */}
              <LinkContainer
                className="market-card-buttons"
                to={`/markets/editMarket/${props.marketId}`}
              >
                <Button>Edytuj dane rynku</Button>
              </LinkContainer>
              {/* )} */}
              {props.published && (
                <LinkContainer
                  className="market-card-buttons"
                  to={`/markets/solveMarket/${props.marketId}`}
                >
                  <Button>Rozwiąż rynek</Button>
                </LinkContainer>
              )}
              {!props.published && (
                <LinkContainer
                  className="market-card-buttons"
                  to={`/markets/delete/${props.marketId}`}
                >
                  <Button>Usuń rynek</Button>
                </LinkContainer>
              )}
            </div>
          )}
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          Dodano{" "}
          <TimeAgo
            date={props.createdDate}
            formatter={buildFormatter(polishStrings)}
          />
        </small>
      </Card.Footer>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};

export default connect(mapStateToProps)(Market);
