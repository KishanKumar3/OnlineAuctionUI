import { Component, Inject  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {
  productForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService) {
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        startingPrice: [0, [Validators.required, Validators.min(1)]],
        auctionDuration: [0, [Validators.required, Validators.min(1)]],
        category: ['', Validators.required],
        reservedPrice: [0, [Validators.required, Validators.min(1)]]
      }, { validators: this.reservedPriceValidator });
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(
        response => {
          console.log('Product added successfully', response);
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error adding product', error);
        }
      );
    }
  }
  reservedPriceValidator(form: FormGroup) {
    const startingPrice = form.get('startingPrice')?.value;
    const reservedPrice = form.get('reservedPrice')?.value;

    if (startingPrice !== null && reservedPrice !== null && reservedPrice <= startingPrice) {
      form.get('reservedPrice')?.setErrors({ reservedPriceInvalid: true });
    } else {
      form.get('reservedPrice')?.setErrors(null);
    }
  }
}
