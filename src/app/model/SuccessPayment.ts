

export class Payment{
    paymentId:number|null = null;
    transactionId:string|null = null;
    razorpaySignature:string|null = null;
    source:string|null=null;

    constructor(){
        this.paymentId=null;
        this.transactionId=null;
        this.razorpaySignature=null;
        this.source=null;
    }
}