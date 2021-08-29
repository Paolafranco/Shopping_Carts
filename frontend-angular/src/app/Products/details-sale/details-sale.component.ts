import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { Products } from '../../class/products';

@Component({
  selector: 'app-details-sale',
  templateUrl: './details-sale.component.html',
  styleUrls: ['./details-sale.component.css']
})
export class DetailsSaleComponent implements OnInit {
  id: any;
  data: any
  product = new Products();
  products: any;
  constructor(private rou:Router,private route: ActivatedRoute,private router:Router, private ServicesService: ServicesService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getProductData();
  }
  backHome(){
    this.rou.navigate(['/main-page']);
  }
  /* ejemplo de productos detalles */
  getProductData() {
    this.ServicesService.getProductById(this.id).subscribe(res => {
      console.log(res);
      this.products = res['data'];
    })
  }
}
