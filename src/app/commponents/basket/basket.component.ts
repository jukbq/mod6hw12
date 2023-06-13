import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faFilm, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GoodsResponse } from 'src/app/shared/interfaces/goods';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { HraderComponent } from '../hrader/hrader.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public summ = 0;
  public count = 0;
  public trashIcon = faTrash;
  public basket: Array<GoodsResponse> = [];


  constructor(
    private orderService: OrderService,
    private router: Router,
    public dialogRef: MatDialogRef<BasketComponent>
  ) { }

  ngOnInit(): void {
    this.addToBasket()
    this.updateBasket()
    this.orderService.chageBasket.subscribe(() => {
      this.addToBasket();
      this.summPrice(); 
    });
  }

  quantity_goods(goods: GoodsResponse, value: boolean): void {
    if (value) {
      ++goods.count
      this.editBasket(goods, value)
    } else if (!value && goods.count > 1) {
      --goods.count
      this.editBasket(goods, value)
    }

  }

  addToBasket(): void {
    let emptyBasket = document.querySelector('.empty_basket');
    const basketData = localStorage.getItem('basket');
    if (basketData && basketData !== 'null') {
      this.basket = JSON.parse(basketData);
      this.summPrice();
      emptyBasket?.classList.add('closrEmptyBasket');
    } else {
      emptyBasket?.classList.remove('closrEmptyBasket');
    }
  }

  summPrice(): void {
    this.summ = this.basket.reduce((summ: number, good: GoodsResponse) =>
      summ + good.count * good.price, 0)
    this.count = this.basket.reduce((count: number, goods: GoodsResponse) =>
      count + goods.count, 0)
  }

  editBasket(good: any, value: boolean) {
    let basket: Array<GoodsResponse> = []
    basket = JSON.parse(localStorage.getItem('basket') as string);
    let index = basket.findIndex(index => index.id === good.id)
    if (basket.some(good => good.id === good.id)) {
      if (value) {
        basket[index].count += 1;
      } if (!value) {
        basket[index].count -= 1;
      }
    }
    else {
      basket.push(good);
    }
    localStorage.setItem('basket', JSON.stringify(basket))
    this.orderService.chageBasket.next(true)
    this.summPrice()
  }

  delOrder(order: any) {
    let basket: Array<GoodsResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    let index = basket.findIndex(index => index.id === order.id);
    basket.splice(index, 1);
   
    if (basket.length == 0){
      localStorage.removeItem('basket');
      this.dialogRef.close()
    }else{
      localStorage.setItem('basket', JSON.stringify(basket))
      this.orderService.chageBasket.next(true)
      this.dialogRef.beforeClosed()
    }
    this.summPrice(); 
  }

  addOrder(order: any): void {
    this.dialogRef.close()
    let login = JSON.parse(localStorage.getItem('login') as string);
    let addOrder = {
      id: 0,
      login: login.fullName,
      email: login.email,
      phone: login.role,
      order: {
        name: order.name,
        count: order.count,
        price: order.price,
        images: order.images
      }
    }
    addOrder.order = order
    console.log(addOrder);
    console.log(order);
    this.orderService.addOrder(addOrder).subscribe(() => {
      this.router.navigate(['']);
      localStorage.removeItem('basket');

    })
    this.updateBasket()
  }
  updateBasket(): void {
    this.orderService.chageBasket.subscribe(() =>
      this.addToBasket()
    )
  }

  closeBasket(){
    this.dialogRef.close()
  }

}
