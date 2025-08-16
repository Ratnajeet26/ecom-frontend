import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../types/brands';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../service/category.service';
import { BrandsService } from '../../../service/brands.service';
import { ProductServiceService } from '../../../service/product-service.service';
import { Product } from '../../../types/product';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';



@Component({
  selector: 'app-products-form',
  imports: [
    FormsModule,
    MatButtonModule,
    MatInput,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
})
export class ProductsFormComponent {
  formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    price: [0, [Validators.required]],
    shortDescription: ['', [Validators.required]],
    discount: [0],
    images: this.formBuilder.array([]),
    categoryId: [''],
    brandId: [''],
    isFeatured: [false],
    isNewProduct: [false],
  });

  isEdit = false;
  id!: string;
  private selectedFiles: File[] = []; // new
  imagePreviews: SafeUrl[] = [];
  router = inject(Router);
  route = inject(ActivatedRoute);
  brands: Brand[] = [];
  categories: Category[] = [];
  existingImages: string[] = [];

  constructor() {}
  categoryService = inject(CategoryService);
  brandsService = inject(BrandsService);
  productService = inject(ProductServiceService);
  private sanitizer = inject(DomSanitizer);
  readonly uploadsPath = `${environment.apiUrl}`;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.isEdit = true;

      this.productService.getProductById(this.id).subscribe((prod: Product) => {
        this.productForm.patchValue(prod);

        // filenames you still keep
        this.existingImages = (prod.images ?? []).filter(Boolean);

        // visible previews (absolute URLs)
        this.imagePreviews = this.existingImages.map((name) =>
          this.sanitizer.bypassSecurityTrustUrl(this.uploadsPath + name)
        );
      });
    }

    this.categoryService
      .getCategories()
      .subscribe((r) => (this.categories = r));
    this.brandsService.getBrand().subscribe((r) => (this.brands = r));
  }

  /* ---------- image handling ---------- */
  onFileSelected(evt: Event) {
    const files = (evt.target as HTMLInputElement).files;
    if (!files?.length) return;

    Array.from(files).forEach((file) => {
      this.selectedFiles.push(file);

      // preview
      const reader = new FileReader();
      reader.onload = () =>
        this.imagePreviews.push(
          this.sanitizer.bypassSecurityTrustUrl(reader.result as string)
        );
      reader.readAsDataURL(file);
    });

    // reset the input so the same file can be re‑selected if deleted
    (evt.target as HTMLInputElement).value = '';
  }

  removeImage(idx: number) {
    if (idx < this.existingImages.length) {
      /* remove from keep‑list */
      this.existingImages.splice(idx, 1);
    } else {
      /* remove the file object you had queued */
      this.selectedFiles.splice(idx - this.existingImages.length, 1);
    }
    this.imagePreviews.splice(idx, 1);
  }

  /* ---------- helpers ---------- */
  private buildFormData(): FormData {
    const fd = new FormData();

    Object.entries(this.productForm.value).forEach(([k, v]) => {
      if (k === 'images') return; // <-- skip
      if (v !== null && v !== undefined) fd.append(k, v as any);
    });

    /* ② tell the server which old files you’re keeping */
    fd.append('existingImages', JSON.stringify(this.existingImages));

    /* ③ append freshly‑picked files */
    this.selectedFiles.forEach((f) => fd.append('images', f));

    return fd;
  }

  /* ---------- submit ---------- */
  addProduct() {
    if (this.productForm.invalid) return alert('Fill all required fields');

    this.productService.addProduct(this.buildFormData()).subscribe(() => {
      alert('Product added');
      this.router.navigateByUrl('/admin/products');
    });
  }

  updateProduct() {
    if (this.productForm.invalid) return alert('Fill all required fields');

    this.productService
      .updateProduct(this.id, this.buildFormData())
      .subscribe(() => {
        alert('Product updated');
        this.router.navigateByUrl('/admin/products');
      });
  }
}
