import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Categories } from '../../class/categories';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-manage-categories-edit',
  templateUrl: './manage-categories-edit.component.html',
  styleUrls: ['./manage-categories-edit.component.css']
})
export class ManageCategoriesEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router:Router, private ServicesService: ServicesService) { }
  id: any;
  data: any;
  categorie = new Categories();
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getCategoriesData();
  }

  getCategoriesData() {
    this.ServicesService.getCategorieById(this.id).subscribe(res => {
      console.log(res);
      this.data = res['data'];
      this.categorie = this.data;
      console.log(this.data);
    })
  }
  updateDataCategories() {
    this.ServicesService.updateCategorieData(this.id, this.categorie).subscribe(res => {
      console.log(res);
    this.router.navigate(['/manage-categories'])
    });
  }
}
