import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import * as actions from '../actions';

class Payments extends Component {
  onToken = token => {
    this.props.handleToken(token);
  };
  render() {
    return (
      <StripeCheckout
        amount={500}
        name="Emaily"
        description="$5 for 5 emails"
        token={this.onToken}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
