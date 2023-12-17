import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MyServiceNameService } from 'src/app/my-service-name.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { Product } from 'src/app/interface/user-interface';
import Swal from 'sweetalert2';


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
  confirmDelete(userId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUser(userId).subscribe(
          (response) => {
            console.log('User has been successfully deleted');
           
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
          
            this.ngOnInit(); 
          },
          (error) => {
            console.error('Error deleting user:', error);
            Swal.fire('Error', 'There was an error deleting the user.', 'error');
         
          }
        );
      }
    });
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
