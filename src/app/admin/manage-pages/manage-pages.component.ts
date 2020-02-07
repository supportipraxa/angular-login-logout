import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { Page } from '../../models/page';

@Component({
  selector: 'app-manage-pages',
  templateUrl: './manage-pages.component.html',
  styleUrls: ['./manage-pages.component.css']
})
export class ManagePagesComponent implements OnInit {
  title = 'Manage Pages';
  pages: Page;
  error: string;
  constructor(private pageservice:PageService) { }

  ngOnInit() {
   
    this.pageservice.getPages().subscribe(
      (data: Page) => this.pages = data,
      error => this.error = error
    );
  }

  onDelete(id:number){
    if(confirm('Are you sure want to delete page id = ' + id)){
    this.pageservice.deletepage(+id).subscribe(
    res=>{ 
    console.log(res);
    this.ngOnInit();
    },
    error => this.error = error  
  );
  }
}

}
