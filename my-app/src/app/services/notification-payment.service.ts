import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class NotificationPaymentService {

    public order_number: string = null;
    public order_price: string = '0';

    constructor(private http: Http) { }

    setOrderNumber(number: string) {
        this.order_number = number;
    }
    setOrderPrice(price: string) {
        this.order_price = price;
    }

    get getOrderNumber() {
        return this.order_number
    }

    get getOrderPrice() {
        return this.order_price
    }


    addNotificationPaymentDB(form) {
        return this.http.post('https://angsila.cs.buu.ac.th/~57660113/webAPI/customer/add-Notification-PaymentDB.php', form).pipe(map((res) => res.json()))
    }


}
