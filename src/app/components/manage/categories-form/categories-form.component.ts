import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { CategoryService } from '../../../service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-form',
  imports: [
    FormsModule,
    MatButtonModule,
    MatInput,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './categories-form.component.html',
  styleUrl: './categories-form.component.scss',
})
export class CategoriesFormComponent {
  name!: string;
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id!: string;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    if (this.id) {
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe((result: any) => {
        console.log(result);
        this.name = result.name;
      });
    }
  }

  add() {
    console.log(this.name);
    this.categoryService.addCategory(this.name).subscribe((result: any) => {
      alert('Category Added SucessFully');
      this.router.navigateByUrl('/admin/categories');
    });
  }
  update() {
    console.log(this.name);
    this.categoryService
      .updateCategory(this.id, this.name)
      .subscribe((result: any) => {
        alert('Category Updated SucessFully');
        this.router.navigateByUrl('/admin/categories');
      });
  }
}
