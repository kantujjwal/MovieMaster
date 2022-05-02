export interface Order{ 
    id: string;
    UserId: string;
    OrderDate: Date;
    DeliveryStatus: string; 
    PaymentMode: string;
    PaymentStatus: string;
    DeliveryAddress: string;
    BillingAddress: string;
    ContactNo: string;
    Amount: number;
    Penalty: number;
    PaidAmount: number;
    Items: OrderItem[]; 
}

export interface OrderItem{
    id: string;
    scheduledays: number;
    title: string,
    posterurl: string[],
    actualReturnDate?: Date;
    penalty?: number;
    rate: number;
}