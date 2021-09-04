import { Component, OnInit } from '@angular/core';
import { Articule } from '../../class/articule';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupName } from '@angular/forms';

@Component({
  selector: 'app-manage-articules-edit',
  templateUrl: './manage-articules-edit.component.html',
  styleUrls: ['./manage-articules-edit.component.css']
})
export class ManageArticulesEditComponent implements OnInit {
  constructor(private route:ActivatedRoute,private router:Router,private ServicesService:ServicesService) { }
  id:any;
  data:any;
  articule=new Articule();
  imageview: any;
  file:any;
  updateForm:FormGroup;

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes("image")) {
        const reader = new FileReader()
        reader.readAsDataURL(file);

        reader.onload = function load() {
          this.imageview = reader.result;
        }.bind(this);
        // console.log('prueba image> ');
        // console.log(this.articule.image);
        this.file= file;
      } else {
        console.log("error");
      }
    }
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params.id;
    this.getArticulesData()
  }
  getArticulesData() {
    this.ServicesService.getArticuleById(this.id).subscribe(res => {
      console.log(res);
      this.data = res;
      this.articule = this.data;
      // console.log(this.data);
    })
  }
  updateDataArticules() {
    console.log("articulo>>");
    console.log(this.articule);
    this.articule.image = this.file
    console.log("articulo>>");
    console.log(this.articule);

    this.ServicesService.updateArticuleData(this.id, this.articule).subscribe(res => {
    // this.ServicesService.updateArticuleData(this.id, this.articule.code, this.articule.codePostal, this.articule.stock, this.articule.description, this.articule.id_sub_categories, this.file).subscribe(res => {
      console.log("res servicio");
       console.log(res);
    this.router.navigate(['/manage-articules'])
    });
  }

 


}

