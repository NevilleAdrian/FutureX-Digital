import React from 'react';
import X from "../../assets/images/x.png"
import { PayPalButton } from "react-paypal-button-v2";
import "./index.css"

export default class PayPalBtn extends React.Component {
    render() {
        const { amount, onSuccess, currency, close, success } = this.props;
        console.log('details', success);
        return (
            <div className="paypal-body">
                <div>
                    <img className="cancel img-fluid x-button" onClick={close} src={X} />
                </div>
                {success === 'COMPLETED' &&
                    <div className="text-center green">
                        <p>PAYMENT WAS MADE SUCCESSFULLY</p>
                    </div>
                }
                <div className="middle">
                    <PayPalButton
                        amount={amount}
                        currency={currency}
                        onSuccess={(details, data) => onSuccess(details, data)}
                        options={{
                            clientId: "ASqkScII6EKhFqSiGe7rEcp7VYbIwUoi57E9gG0ZDWrPWcauXEDnI8mSWjeA-cZS9Fv_M8tVd4OlpuGc"
                        }}
                    />
                </div>

            </div>

        );
    }
}