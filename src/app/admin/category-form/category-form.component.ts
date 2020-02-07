
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
 pageTitle: string;
 error: string;

 categoryForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private categoryservice:CategoryService,
    private router:Router,
    private route:ActivatedRoute,

  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if(id){
      console.log('Enter');
      this.pageTitle = 'Edit Category';
      this.categoryservice.getCategories(+id).subscribe(
        res=>{
          this.categoryForm.patchValue({
            id: res.id,
            title: res.category_name,
            
          });
          //console.log(res);
        }
      );
    }else{
      this.pageTitle = 'Create Category'; 
    }

    this.categoryForm = this.fb.group({
      id: [''],
      category_name: ['', Validators.required]
          })

  }
  get category_name() {
     return this.categoryForm.get('category_name');
    }
  onSubmit () {
    const formdata = new FormData();
    formdata.append('category_name',this.categoryForm.get('category_name').value);
    
    const id = this.categoryForm.get('id').value;
   // const id = this.route.snapshot.paramMap.get('id');
    //console.log(id);
    if(id){
      console.log('update');
       this.categoryservice.updatecategory(formdata, +id).subscribe(
         res => {
         this.router.navigate(['/admin/categories']);
    },
        
      );
    } else {
      this.categoryservice.createcategory(formdata).subscribe(
        res => {
            this.router.navigate(['/admin/categories']);
        },
      );
    }
  }

}
