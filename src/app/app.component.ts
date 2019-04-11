import {Component, OnInit, ViewChild} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig, NgxPaypalComponent, PayPalScriptService} from 'ngx-paypal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'paypal-test';
  public payPalConfig ?: IPayPalConfig;

  @ViewChild('payPalElem1') paypalComponent1?: NgxPaypalComponent;
  @ViewChild('payPalElem2') paypalComponent2?: NgxPaypalComponent;

  public constructor(private payPalScriptService: PayPalScriptService) {

  }

  ngOnInit(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'ASQUP4NZ4cxSNX_jrf7BM-bTuZwtXZmraKkSVFxOmTk81wg-lqxgnkLvCVCpkc5V7m-zKbTjkd5CtqpR',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: '1.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '1.99'
              }
            }
          },
          items: [{
            name: 'Monthly Kanbanone Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '1.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        // actions.order.get().then(details => {
        //     console.log('onApprove - you can get full order details inside onApprove: ', details);
        // });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        console.log(JSON.stringify(data));

        // this.paypalService.sendPaymentConfirmation(data).subscribe(responseOk=> {
        //   this.onPaymentSuccess();
        // }, responseKo => {
        //   this.onPaymentFailed();
        // });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: () => {
        console.log('onClick');
      }

    };

    this.payPalScriptService.registerPayPalScript({
      clientId: 'ASQUP4NZ4cxSNX_jrf7BM-bTuZwtXZmraKkSVFxOmTk81wg-lqxgnkLvCVCpkc5V7m-zKbTjkd5CtqpR',
      currency: 'EUR'
    }, (payPalApi) => {
      if (this.paypalComponent1) {
        this.paypalComponent1.customInit(payPalApi);
      }

      if (this.paypalComponent2) {
        this.paypalComponent2.customInit(payPalApi);
      }
    });
  }
}
