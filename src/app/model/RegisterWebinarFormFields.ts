export class Notes{
	key1:string|null=null;
	key2:string|null=null;

    constructor(){
        this.key1=null;
        this.key2=null;
    }
}

export class Payment{
    amount:number|null=null
    currency:string|null=null;
    receipt:string|null=null;
    notes:Notes|null=null;

    constructor(){
        this.amount=null;
        this.currency=null;
        this.receipt=null;
        this.notes=null;
    }
}

export class RegisterWebinarFormFields{
    id:number|null=null;
    courseId:number|null=null
    name:string|null=null;
    email:string|null=null;
    mobile:string|null=null;
    location:string|null=null;
    occupation:string|null=null;
    source:string|null = null;
    initiatePayment:Payment;

    constructor(){
        this.id=null;
        this.courseId=null;
        this.name=null;
        this.email=null;
        this.mobile=null;
        this.location=null;
        this.occupation=null;
        this.source=null;
        this.initiatePayment=new Payment();
    }
}