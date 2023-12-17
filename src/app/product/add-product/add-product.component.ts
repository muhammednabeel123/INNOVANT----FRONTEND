import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyServiceNameService } from 'src/app/my-service-name.service';
import { EventService } from 'src/app/event.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  selectedImages: { url: string }[] = [];
  selectedFile : File[] = []

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private formBuilder: FormBuilder,
    private service: MyServiceNameService,
    private eventService: EventService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push({ url: e.target.result });
          for(let file of files){
            if(!this.selectedFile.includes(file)){
              this.selectedFile.push(file)
            }
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
    this.selectedFile.splice(index,1)
  }

  onSubmit(): void {
   
    if (this.productForm.valid) {
      const formData = new FormData();
      if (this.productForm.valid && this.productForm.controls && this.selectedFile) {
        for (let i = 0; i < this.selectedFile.length; i++) {
          formData.append('images', this.selectedFile[i]);
        }
        Object.keys(this.productForm.controls).forEach((controlName: string) => {
          const control = this.productForm.get(controlName);
          if (control && control.valid) {
            const value = control.value;
            formData.append(controlName, value);
          }
        });
      }
      console.log("hey there")
      this.service.addProduct(formData).subscribe(
        (res: any) => {
          console.log(res, 'Response from adding product');
          this.dialogRef.close(this.productForm.value);
        },
        (error: any) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }
}
