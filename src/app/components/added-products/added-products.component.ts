import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, interval } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-added-products',
  templateUrl: './added-products.component.html',
  styleUrls: ['./added-products.component.css']
})
export class AddedProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'startingPrice', 'auctionDuration', 'category', 'reservedPrice', 'highestBid', 'sold'];

  now: number;
  updateInterval: Subscription | undefined;


  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private productService: ProductService) { 

    this.now = new Date().getTime();

  }

  ngOnInit(): void {
    this.getAddedProducts();

    this.updateInterval = interval(1000).subscribe(() => {
      this.now = new Date().getTime();
    });
  }
  ngOnDestroy(): void {
    if (this.updateInterval) {
      this.updateInterval.unsubscribe();
    }
  }
  getAddedProducts(): void {
    this.productService.getProductsAddedByUser().subscribe(
      (products) => {
        this.dataSource.data = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  convertToIST(utcTime: string): Date {
    return new Date(new Date(utcTime).getTime() + (5 * 60 * 60 * 1000 + 30 * 60 * 1000));
  }
  
  calculateTimeRemaining(startTime: string, endTime: string): string {
    const start = this.convertToIST(startTime).getTime();
    const end = this.convertToIST(endTime).getTime();
    const now = Date.now();
    
    const timeRemaining = end - now;
    
    if (timeRemaining < 0) {
      return 'Closed';
    }
    
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
