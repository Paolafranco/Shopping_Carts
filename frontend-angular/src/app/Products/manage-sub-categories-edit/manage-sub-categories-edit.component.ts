import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { subCategories } from '../../class/subcategories';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-sub-categories-edit',
  templateUrl: './manage-sub-categories-edit.component.html',
  styleUrls: ['./manage-sub-categories-edit.component.css']
})
export class ManageSubCategoriesEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private ServicesService: ServicesService,) { }
  id: any;
  data: any;
  subcategorie = new subCategories();
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getsubCategoriesData();
  }

  getsubCategoriesData() {
    this.ServicesService.getsubCategorieById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.subcategorie = this.data;
      console.log(this.data);
    })
  }
  updatesubDataCategories() {
    this.ServicesService.updatesubCategorieData(this.id, this.subcategorie).subscribe(res => {
      console.log(res);
      this.router.navigate(['/manage-subcategories'])
    });
  }
}
