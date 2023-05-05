import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IProducto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-more-shop',
  templateUrl: './more-shop.component.html',
  styleUrls: ['./more-shop.component.css'],
})
export class MoreShopComponent {
  responsiveOptions!: any[];

  @Input() products!: IProducto[];

  constructor(private router:Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    
  }

  redirect(id: string) {
    this.router.navigate(['/index/producto', id]);
  }
}
