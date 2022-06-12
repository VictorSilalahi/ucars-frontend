import { Component, OnInit, ViewChild, ElementRef, LOCALE_ID, Inject } from '@angular/core';
import { formatNumber } from '@angular/common';
import { DataService } from '../data.service';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dataModels:any=[]

  @ViewChild('txtSearch', {static: false})
  txtSearch!: ElementRef;

  constructor( private serv:DataService, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
  }

  search(): void {
    if ($(this.txtSearch.nativeElement).val()=='')
    {
      alert("Type a word as search object!");
      return;
    }
    else
    {
      this.serv.search($(this.txtSearch.nativeElement).val()).subscribe(data=>{
        this.dataModels = data;
        for (var i=0; i<this.dataModels.length; i++)
        {
          var temp = formatNumber(this.dataModels[i]['price'],this.locale);
          this.dataModels[i]['price']=temp;
        }    
        console.log(this.dataModels);
      });
    }
  }
}
