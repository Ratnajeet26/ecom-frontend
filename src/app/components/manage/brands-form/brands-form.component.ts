import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { BrandsService } from '../../../service/brands.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brands-form',
  imports: [
    FormsModule,
    MatButtonModule,
    MatInput,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './brands-form.component.html',
  styleUrl: './brands-form.component.scss',
})
export class BrandsFormComponent {
  name!: string;
  brandService = inject(BrandsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id!: string;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    if (this.id) {
      this.isEdit = true;
      this.brandService.getBrandById(this.id).subscribe((result: any) => {
        console.log(result);
        this.name = result.name;
      });
    }
  }

  add() {
    console.log(this.name);
    this.brandService.addBrand(this.name).subscribe((result: any) => {
      alert('Brand Added SucessFully');
      this.router.navigateByUrl('/admin/brand');
    });
  }
  update() {
    console.log(this.name);
    this.brandService
      .updateBrand(this.id, this.name)
      .subscribe((result: any) => {
        alert('Brand Updated SucessFully');
        this.router.navigateByUrl('/admin/brand');
      });
  }
}
