import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loaderService/loader.service';
import { LoaderState } from '../../models/loaderState';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
show:boolean = false;
private subscription : Subscription;
  constructor(
     private loaderService: LoaderService 
  ) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState)=>{
      this.show =state.show;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
