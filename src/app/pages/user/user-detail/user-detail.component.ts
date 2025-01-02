import { Component, OnInit } from '@angular/core';
import { CityService } from '../../city/city.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  cities : any = null;
  constructor(private cityService: CityService) { }
  ngOnInit(): void {
    this.getAllCity();
  }
  getAllCity(){
    this.cityService.getAllCities().subscribe(cities => {
     this.cities = cities;
       console.log(cities);
    });
    
}
}
