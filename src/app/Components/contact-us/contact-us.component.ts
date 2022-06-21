import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Name'];
  dataSource: any = [];

  csv = `"ID","Name","Severity","Result","Recommended"
"V-63415","Length of password history maintained","Medium","None"
"V-63419","Maximum password age","Medium","42","60"
"V-63421","Minimum password age","Medium","0","1"
"V-63423","Minimum password length","Medium","0","14"
"V-63427","Password must meet complexity requirements","Medium","0","1"
"V-63429","Store passwords using reversible encryption","Passed","0"
"V-63405","Account lockout duration","Medium","30","15"
"V-63409","Account lockout threshold","Medium","Never","3"
"V-63413","Reset account lockout counter","Medium","30","15"
"V-63843","Access Credential Manager as a trusted caller","Passed",""
"V-63847","Act as part of the operating system","Passed",""
"V-63857","Create a pagefile","Passed","BUILTIN\Administrators"
"V-63859","Create a token object","Passed",""
"V-63863","Create permanent shared objects","Passed",""
"V-63865","Create symbolic links","Passed","BUILTIN\Administrators"
"V-63869","Debug programs","Passed","BUILTIN\Administrators"
"V-63881","Enable computer and user accounts to be trusted for delegation","Passed",""
"V-63883","Force shutdown from a remote system","Passed","BUILTIN\Administrators"
"V-63917","Load and unload device drivers","Passed","BUILTIN\Administrators"
"V-63925","Lock pages in memory","Passed",""
"V-63927","Manage auditing and security log","Passed","BUILTIN\Administrators"
"V-63931","Modify firmware environment values","Passed","BUILTIN\Administrators"
"V-63933","Perform volume maintenance tasks","Passed","BUILTIN\Administrators"
"V-63935","Profile single process","Passed","BUILTIN\Administrators"
"V-63939","Restore files and directories","Medium","BUILTIN\Administrators;S-1-5-32-551","BUILTIN\Administrators"
"V-63941","Take ownership of files or other objects","Passed","BUILTIN\Administrators"
"V-63601","Accounts: Administrator account status","Passed","False"
"V-63611","Accounts: Guest account status","Passed","False"
"V-63617","Accounts: Limit local account use of blank passwords to console logon only","Passed","1"
"V-63619","Accounts: Rename administrator account","Medium","Administrator","X_Admin"
"V-63625","Accounts: Rename guest account","Medium","Guest","Visitor"
"V-71761","Audit: Force audit policy subcategory settings to override audit policy category settings","Medium","","1"
"V-63639","Domain member: Digitally encrypt or sign secure channel data (always)","Passed","1"
"V-63643","Domain member: Digitally encrypt secure channel data (when possible)","Passed","1"
"V-63647","Domain member: Digitally sign secure channel data (when possible)","Passed","1"
"V-63653","Domain member: Disable machine account password changes","Passed","0"
"V-63661","Domain member: Maximum machine account password age","Passed","30"
"V-63665","Domain member: Require strong (Windows 2000 or later) session key","Passed","1"
"V-63669","Interactive logon: Machine inactivity limit","Passed","900"
  `;
  jsonData: any = [];
  constructor() {
    this.jsonData = this.csvToJson(this.csv);
    this.dataSource = new MatTableDataSource<any>(this.jsonData.data);
    this.displayedColumns = this.jsonData.headers;
   }
   @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
   @ViewChild(MatSort) sort: MatSort | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }
  filters:{key:string, value:string}[] = []
  filterData(key: string, val: string){
    const found = this.filters.find(x=>x.key==key);
    if(found)
    {
      found.value = val;
    }else{
      this.filters.push({key:key, value:val});
    }
    console.log(this.filters);
    this.dataSource = new MatTableDataSource<any>(this.getFilteredData());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getFilteredData(){
    let data = this.jsonData.data;
    this.filters.forEach((f)=>{
     data = data.filter((d:any)=>d[f.key].includes(f.value));
    });
    return data;
  }

  sortSetting: {key:string, asc: boolean} = {
    key: '',
    asc: false
  };

  sortData(key: string): void{
    let data = this.getFilteredData();

    if(this.sortSetting.key == key){
      this.sortSetting.asc = !this.sortSetting.asc;
    }else{
      this.sortSetting = {
        key: key,
        asc: true
      }
    }
    console.log(this.sortSetting);
    if(this.sortSetting.asc){
    data.sort((a:any,b:any)=> a[key].localeCompare(b[key]));
    }else{
      data.sort((a:any,b:any)=> b[key].localeCompare(a[key]));
      }
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(key);
  }
  csvToJson(csv: string){
    //csv = csv.replace('/"', '"');

    const array = csv.split("\n");

    /* Store the converted result into an array */
    const csvToJsonResult = [];

    /* Store the CSV column headers into seprate variable */
    const headers = array[0].split(",").map(item => item.trim().replace('\"','').replace('\"',''));

    /* Iterate over the remaning data rows */
    for (let i = 1; i < array.length - 1; i++) {
    /* Empty object to store result in key value pair */
    const jsonObject: any = {}
    /* Store the current array element */
    const currentArrayString = array[i]
    let string = ''

    let quoteFlag = 0
    for (let character of currentArrayString) {
      if (character === '"' && quoteFlag === 0) {
          quoteFlag = 1
      }
      else if (character === '"' && quoteFlag == 1) quoteFlag = 0
      if (character === ',' && quoteFlag === 0) character = '|'
      if (character !== '"') string += character
    }

    let jsonProperties = string.split("|")

    for (let j in headers) {
      // if (jsonProperties[j].includes(",")) {
      // jsonObject[headers[j]] = jsonProperties[j]
      //   .split(",").map(item => item.trim())
      // }
      // else {
        jsonObject[headers[j]] = jsonProperties[j]?jsonProperties[j]:'';
      // }
    }
    /* Push the genearted JSON object to resultant array */
    csvToJsonResult.push(jsonObject)
    }
    return {data: csvToJsonResult, headers: headers};

  }
}
