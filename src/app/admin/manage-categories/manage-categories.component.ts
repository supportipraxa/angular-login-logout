import { Component, OnInit } from '@angular/core';
import{CategoryService} from '../../services/category.service';
import{Category} from '../../models/category';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  title = 'Manage Category';
  categorys:Category;
  error: string;

  constructor(private categoryservice:CategoryService) { }

  ngOnInit() {
    this.categoryservice.getcategory().subscribe(
    (data: Category) => this.categorys = data,
      error => this.error = error
    );
  }

  onDelete(id:number){
    if(confirm('Are you sure want to delete category id = ' + id)){
    this.categoryservice.deleteCategory(+id).subscribe(
    res=>{ 
    console.log(res);
    this.ngOnInit();
    },
    error => this.error = error  
  );
  }
}

}
