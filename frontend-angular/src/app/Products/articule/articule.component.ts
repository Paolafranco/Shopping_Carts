import { Component, OnInit, Input } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Articule } from '../../class/articule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articule',
  templateUrl: './articule.component.html',
  styleUrls: ['./articule.component.css']
})
export class ArticuleComponent implements OnInit {
  query: string = 'esto es una prueba';
  @Input() articles: any;
  article = new Articule();
  id:any;

  constructor(private ServicesServices: ServicesService, private router:Router) { }

  ngOnInit(): void {
    this.getArticlesData(this.query);
    this.getArticlesAll();
  }
  getArticlesData(query: string) {
    this.query = query;
    console.log(this.query)

    this.ServicesServices.readArticles(query).subscribe(res => {
      console.log(res);
      this.articles = res;
    })
  }
  getArticlesAll() {
    this.ServicesServices.readArticles().subscribe(res => {
      console.log(res);
      this.articles = res;
    })
  }
  saleDetails(){
    this.router.navigate(['/sale'])
  }
}