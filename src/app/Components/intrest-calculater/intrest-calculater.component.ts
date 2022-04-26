import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  sl: number;
  principalAmount: number;
  monthlyPaid: number;
  balance: number;
  intrestAmount: number;
  remainingAmount: number;
}



@Component({
  selector: 'app-intrest-calculater',
  templateUrl: './intrest-calculater.component.html',
  styleUrls: ['./intrest-calculater.component.scss']
})
export class IntrestCalculaterComponent implements OnInit {
  displayedColumns: string[] = ['sl', 'principalAmount', 'monthlyPaid', 'balance', 'intrestAmount', 'remainingAmount'];
  dataSource: PeriodicElement[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  calc(value: any){
    let data = {
      principalAmount: parseFloat(value.principalAmount),
      mnthlyIntrest: parseFloat(value.mnthlyIntrest),
      mnthlyPayment: parseFloat(value.mnthlyPayment)
    };
    let sl = 0;
    let ds = [];
    while(data.principalAmount > 0){
      sl++;
      ds.push(
        {
          sl: sl, principalAmount: data.principalAmount, monthlyPaid: Math.min(data.principalAmount,data.mnthlyPayment),
          balance: data.principalAmount - Math.min(data.principalAmount,data.mnthlyPayment),
          intrestAmount: data.principalAmount > data.mnthlyPayment? ((data.principalAmount)/ 100) * data.mnthlyIntrest : 0,
          remainingAmount: (data.principalAmount - Math.min(data.principalAmount,data.mnthlyPayment)) + (data.principalAmount > data.mnthlyPayment? ((data.principalAmount)/ 100) * data.mnthlyIntrest : 0)
        }
      );
      data.principalAmount = (data.principalAmount - Math.min(data.principalAmount,data.mnthlyPayment)) + (data.principalAmount > data.mnthlyPayment? ((data.principalAmount)/ 100) * data.mnthlyIntrest : 0);
    }
    this.dataSource = ds;
  }
}
