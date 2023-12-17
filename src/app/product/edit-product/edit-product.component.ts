import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyServiceNameService } from 'src/app/my-service-name.service';
import { EventService } from 'src/app/event.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  selectedImages: { url: string }[] = [];
  newlySelectedImages:{ url: string }[] = [];
  selectedFile : File[] = []
  user:any 
  productId:number|undefined 
  productData:any

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    private formBuilder: FormBuilder,
    private service: MyServiceNameService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    console.log('Received data:', this.data)
    this.user = this.data
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }
ngOnInit(): void {
  this.productId = this.user.userId
  this.service.getProductsById(this.productId).subscribe((res:any)=>{
    this.productData = res
    this.productForm.patchValue({
      name: this.productData.name,
      price: this.productData.price
   
    });
    if (this.productData.images && this.productData.images.length > 0) {
      this.productData.images.forEach((imageUrl: string) => {
        this.selectedImages.push({ url: imageUrl });
      });
    }
    
  })
  
}

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.newlySelectedImages.push({ url: e.target.result });
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
    const imageUrlToDelete = this.selectedImages[index].url; // Get the image URL
    this.service.deleteProductImage(this.productId, imageUrlToDelete).subscribe(
      (res: any) => {
        console.log(res, 'Image deleted successfully');
        this.selectedImages.splice(index, 1); // Remove the image from the array locally
      },
      (error: any) => {
        console.error('Error deleting image:', error);
      }
    );
  }

  removeNewImage(index: number): void {
    this.newlySelectedImages.splice(index, 1);
   
  }
  

  onSubmit(): void {
     // Fetch the product ID you want to edit
    if (this.productForm.valid && this.productId && this.selectedFile ) {
      const formData = new FormData();
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
      console.log("anything")
      this.service.editProductById(this.productId, formData).subscribe(
        (res: any) => {
          console.log(res, 'Response from editing product');
          this.dialogRef.close(this.productForm.value);
        },
        (error: any) => {
          console.error('Error editing product:', error);
        }
      );
    }
  }
  
}
