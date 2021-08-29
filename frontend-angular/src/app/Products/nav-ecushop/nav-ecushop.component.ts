import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Articule } from '../../class/articule';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-nav-ecushop',
  templateUrl: './nav-ecushop.component.html',
  styleUrls: ['./nav-ecushop.component.css']
})
export class NavEcushopComponent implements OnInit {
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  query: string = '';


  constructor(private ServicesServices: ServicesService) { }

  data: any;
  current_articule: Articule;

  ngOnInit(): void {

  }
  onSearch() {
    this.ServicesServices.searchArticule(this.query).subscribe(res => {
      this.data = res;
      this.current_articule = new Articule();
    })
  }

  getArticlesData() {
    this.onEnter.emit(this.query);
  }

}
