import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoodsResponse } from 'src/app/shared/interfaces/goods';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { faFilm, faL, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROLE } from 'src/app/shared/services/constant/role.constant';
import { LoginResponse } from 'src/app/shared/interfaces/accoumt';
import { OrderResponse } from 'src/app/shared/interfaces/order';
import { MatDialog } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';
import { SighInComponent } from '../sigh-in/sigh-in.component';
import { BasketComponent } from '../basket/basket.component';


@Component({
  selector: 'app-hrader',
  templateUrl: './hrader.component.html',
  styleUrls: ['./hrader.component.scss']
})
export class HraderComponent implements OnInit {

  public basket: Array<GoodsResponse> = [];
  public summ = 0;
  public count = 0;
  public activeClass = true;
  public basketActive = false;
  public isLogin = false;
  public loginUrl = '';


  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.addToBasket()
    this.changeUserUrl()
    this.loadGasket()

  }

  addToBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.summPrice()
    }
  }
  summPrice(): void {
    this.summ = this.basket.reduce((summ: number, good: GoodsResponse) =>
      summ + good.count * good.price, 0)
    this.count = this.basket.reduce((count: number, goods: GoodsResponse) =>
      count + goods.count, 0)
  }

  active() {
    this.activeClass
  }

loadGasket(){
  let basket = JSON.parse(localStorage.getItem('basket')as string);
  console.log(basket);

  
}

  changeUserUrl() {
    const courentUser = JSON.parse(localStorage.getItem('curentUser') as string);
    if (courentUser && courentUser.role == ROLE.ADMIN) {
      this.isLogin = true
      this.loginUrl = 'admin'
    } else if (courentUser && courentUser.role == ROLE.USER) {
      this.isLogin = true
      this.loginUrl = 'user-cabinet'
    } else {
      this.isLogin = false
      this.loginUrl = ' '
    }
  }

  sighInModal(): void {
   let sighIn =  this.dialog.open(SighInComponent,{
     panelClass: 'sigh_maoa_dialog',
   })
      
   sighIn.afterClosed().subscribe(() => {
      this.isLogin = true;
      this.changeUserUrl();
    });
  };

  openBasket(): void {
    if (!this.basketActive) {
      let before = document.querySelector('.header_basket');
      before?.classList.add('clickBasket');
      this.basketActive = true;
      const dialogRef = this.dialog.open(BasketComponent, {
        panelClass: 'basket_dialog',
      });
      dialogRef.afterClosed().subscribe(() => {
        before?.classList.remove('clickBasket');
        this.basketActive = false;
      });
      dialogRef.beforeClosed().subscribe(() => {
        this.addToBasket();
      });
    }
  }

};
