import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource } from '@angular/material/table';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataSource=new MatTableDataSource<any>();
  allCountriesData:any[];
  displayedColumns:string[];
  isLoading:boolean=true;
  isDataAvailable:boolean=false;
  isPieChartEnabled:boolean=false;
  selectedCountry:any;
  pieChartData:number[];
  countryName:string;
  lastUpdated:Date;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('pieChart', {static:false}) pieChart:ElementRef;
  
  constructor(private homeService:HomeService,private changeDetector:ChangeDetectorRef) { }
  ngOnInit() {
    this.displayedColumns=['Country','TotalConfirmed','TotalActive','TotalRecovered','TotalDeaths'];
    this.getAllCountriesData();
  }

  getAllCountriesData(){
    this.homeService.getAllCountriesData().subscribe((data:any)=>{
      this.isDataAvailable=true;
      this.isLoading=false;
      this.lastUpdated=data.Date;
      this.allCountriesData=[...data.Countries];
      this.dataSource.data=[...this.allCountriesData];
      this.changeDetector.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(error=>{
      this.isLoading=false;
      console.error("Error",error);
    })) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showPieChart(country:any){
    this.isPieChartEnabled=true;
    this.countryName=country.Country;
    this.pieChartData=[country.TotalConfirmed,country.TotalActive,
      country.TotalRecovered,country.TotalDeaths];
      this.pieChart.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  downloadCSV(){
    this.isLoading=true;
    this.homeService.downloadCSV().subscribe((response:any)=>{
      this.isLoading=false;
      const dataType = response.body.type;
      const csvData = [];
      csvData.push(response.body);
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(csvData, { type: dataType }));
      downloadLink.setAttribute('download', this.getFileName(response));
      document.body.appendChild(downloadLink);
      downloadLink.click();
    },(error=>{
      this.isLoading=false;
      console.error("Error downloading CSV",error);
    }));
  }

  getFileName(response: any) {
  var contentDispositionHeader = response.headers.get('content-disposition');
  if (contentDispositionHeader) {
      var result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
      return result.replace(/"/g, '');
  }
}
}
