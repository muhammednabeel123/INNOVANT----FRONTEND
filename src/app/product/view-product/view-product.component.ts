import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MyServiceNameService } from 'src/app/my-service-name.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { Product } from 'src/app/interface/user-interface';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  
  constructor(
    private service: MyServiceNameService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  users$: any;

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.service.getProducts().subscribe((res:Product) => {
      this.users$ = res;
      console.log(this.users$, "this is data");
    });
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '500px', 
      position: { top: '0' }, 
    });

    dialogRef.afterClosed().subscribe(result => {
    
      this.ngOnInit()
    });
  }
  deleteUser(userId: number): void {
    this.service.deleteUser(userId).subscribe(
      (response) => {
        console.log("user has successfully deleted")
        this.ngOnInit()
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  EditUser(userId: number): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '500px',
      position: { top: '0' },
      data: { userId: userId } // Pass the userId as data to the dialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit(); // Refresh or execute any logic after the dialog is closed
    });
  }
}
