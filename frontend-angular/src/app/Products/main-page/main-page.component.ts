import { Component, OnInit, Input } from '@angular/core';
import { Categories } from '../../class/categories';
import { ServicesService } from 'src/app/services/services.service';
import { Articule } from 'src/app/class/articule';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  categories: any;
  categorie= new Categories();
  constructor(private router: Router,private ServicesServices: ServicesService) { }

  query: string = 'esto es una prueba';
  @Input() articles: any;
  article = new Articule();

  ngOnInit(): void {
    this.getCategorieData();
  }
  getCategorieData() {
    this.ServicesServices.getCategoriesData().subscribe(res => {
      console.log(res);
      this.categories = res;
    })
}
/* buscador */
getArticlesData(query: string) {
  this.query = query;
  console.log(this.query)

  this.ServicesServices.readArticles(query).subscribe(res => {
    console.log(res);
    this.articles = res;
    this.router.navigate(['/articles']);
  })
}
}