import React from 'react';
import {connect} from 'react-redux';
import {Alert,Container,Form, Button,Spinner,Image,Input} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {setMarketCover} from '../../actions/marketActions';

class MarketCoverPage extends React.Component {

    state = {
        resetButtonDisable:true,
        imageFile: null
      }

    renderError({error,touched}) {
        if(touched && error) {
            return(
                <Alert variant='danger'>
                    {error}
                </Alert>
            )
        }
    }

    renderFileInput = ({ input, type, meta,accept }) => {
      const { mimeType } = this.props;
      return (
          <div>
          <input
            name={input.name}
            type={type}
            accept={accept}
            onChange={event => this.handleChange(event, input)}
          />
          {meta && meta.invalid && meta.error && (
              <h2>Błąd</h2>
          )}
          </div>
      );
  };



    handleChange = (event, input) => {
      event.preventDefault();
      let imageFile = event.target.files[0];
      if (imageFile) {
        const localImageUrl = URL.createObjectURL(imageFile);
        const imageObject = new window.Image();
  
        imageObject.onload = () => {
          imageFile.width = imageObject.naturalWidth;
          imageFile.height = imageObject.naturalHeight;
          input.onChange(imageFile);
         
          URL.revokeObjectURL(imageFile);
        };
        this.setState({imageFile:localImageUrl});
        imageObject.src = localImageUrl;
      }
    };

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

  onSubmit = (marketCover) => {
      this.props.setMarketCover(this.props.match.params.id,marketCover);
  }

    render() {

        return(
            <Container className="bg-light border rounded shadow-container create-market-container">
                <h3>Edytuj zdjęcie</h3>
                <Form onSubmit={this.props.handleSubmit(this.onSubmit)} encType="multipart/form-data">
                <Field accept="image/*" type="file" name="marketCover" component={this.renderFileInput} />
                <div className="img-box">
                {this.state.imageFile && (<Image className="img" src={this.state.imageFile} rounded/>)}
                </div>
                <Button className="form-button" variant="primary" type="submit">
                  {this.renderButtonContent()}
                </Button>
                <Button className="form-button" variant="primary" type="reset" onClick={this.resetForm} disabled={this.state.resetButtonDisable}>
                  Cofnij zmiany
                </Button>
                </Form>
                {this.renderInfo()}
            </Container>
        )
    }
}

const validate = formValues => {
    const errors = {}
   

  if(formValues.marketCover) {
      if(!formValues.marketCover.type.includes("image")){
        errors['marketCover'] = "Wybierz plik który jest obrazem";
      }
  }

  return errors
}

const mapStateToProps = state => {
    return {
      alert: state.alert,
      loading: state.loading.SET_MARKET_COVER
    }
  }

const formWrapped = reduxForm(
    {
        form:'editCoverForm',
        validate
    }
)(MarketCoverPage);

export default connect(mapStateToProps,{setMarketCover})(formWrapped);

