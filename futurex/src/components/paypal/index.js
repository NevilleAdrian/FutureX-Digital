import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

export default class PayPalBtn extends React.Component {
    render() {
      const { amount, onSuccess, currency } = this.props;
        return (
            <PayPalButton
              amount={amount}
              currency={currency}
              onSuccess={(details, data) => onSuccess(details, data)}
              options={{
                clientId: "ASqkScII6EKhFqSiGe7rEcp7VYbIwUoi57E9gG0ZDWrPWcauXEDnI8mSWjeA-cZS9Fv_M8tVd4OlpuGc"
              }}
          />
        );
    }
}