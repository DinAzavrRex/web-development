import { Component, OnInit } from '@angular/core';
import {MeteoService} from "./service/meteo-service.service";
import {Meteo, Time2Temperature} from "./model/meteo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'InfiniteList';
  index = 0;
  maxindex=0;
  gridColumns = 5;
  page = 10;
  meteos: Meteo = {
    latitude:0,
    longitude:0,
    generationtime_ms: 0,
    utc_offset_seconds: 0,
    timezone: "",
    timezone_abbreviation: "",
    elevation: 0,
    hourly_units:{time: "",
    temperature_2m: ""},
    hourly:  {time: [],
        temperature_2m: []},
  };
  temps: Time2Temperature[] = [];
  curTemps: Time2Temperature[] = [];
  curTemps2: Time2Temperature[] = [];

  constructor(private meteoService: MeteoService) {}

  ngOnInit(): void {
    
    this.meteoService
      .getMeteo()
      .subscribe((meteos: Meteo) => {
        this.meteos = meteos;
        for(let i=0;i< meteos.hourly.time.length;i++){
        this.temps[i] = {time:meteos.hourly.time[i],temperature:meteos.hourly.temperature_2m[i]};}
        this.maxindex=meteos.hourly.time.length-1;
        this.curTemps.push(...this.fill());
        
      });
  }

  fill():Time2Temperature[]{

    for(let i=0; i<this.page;i++)
    this.curTemps2[i]=this.temps[i+this.index];

    //for(let i=0; i<(this.page);i++){
    //  this.curTemps[i] = this.temps[i+this.index];}
    //if(this.maxindex-10<=i){this.index=0; return this.curTemps;}
    this.index=this.index+this.page;
    return this.curTemps2;
  }

  onScroll(): void {
    this.curTemps.push(...this.fill());
  }
}
