import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';

import { ServicesService } from '../../services/services.service';
import { Categories } from '../../class/categories';
import { Products } from 'src/app/class/products';
import { Articule } from 'src/app/class/articule';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']

})
export class CategoriesComponent implements OnInit {

  constructor(private router: Router, private ServicesServices: ServicesService) { }
  categorie = new Categories();
  categories: any;

  product = new Products();
  products: any;

  query: string = 'esto es una prueba';
  @Input() articles: any;
  article = new Articule();



  ngOnInit(): void {
    this.getCategories()
    this.getProducts()
  }

  getCategories() {
    this.ServicesServices.getCategoriesData().subscribe(res => {
      this.categories = res;
    })
  }
  
  getProducts(){
    this.ServicesServices.getProductsDataJoin().subscribe(res => {
      console.log(res)
      this.products = res['data'];
    });
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

