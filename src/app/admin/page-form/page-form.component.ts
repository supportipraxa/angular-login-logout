
import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.css']
})
export class PageFormComponent implements OnInit {
  pageTitle: string;
  error: string;
  pageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Page';
      this.pageService.getPage(+id).subscribe(
        res => {
          this.pageForm.patchValue({
            title: res.title,
            description: res.description,
            is_active: res.is_active,
            id: res.id
          });
         
        }
      );
    } else {
      this.pageTitle = 'Create Page';
    }

    this.pageForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      is_active: ['1'],
          });
  }
  get title() {return this.pageForm.get('title');}
  get description() { return this.pageForm.get('description'); }

  onSubmit () {
   
    const formData = new FormData();
    formData.append('title', this.pageForm.get('title').value);
    formData.append('description', this.pageForm.get('description').value);
    formData.append('is_active', this.pageForm.get('is_active').value);
     const id = this.pageForm.get('id').value;
     if (id) {
      
      this.pageService.updatepage(formData, +id).subscribe(
        res => {
             this.router.navigate(['/admin/pages']);
         },
       );
    } else {
      this.pageService.createpage(formData).subscribe(
        res => {
          this.router.navigate(['/admin/pages']);
});}

}
}
