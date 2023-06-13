import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ComponentsResponse, CopmponentsRequest } from 'src/app/shared/interfaces/components';
import { GoodsResponse } from 'src/app/shared/interfaces/goods';
import { ComponentsService } from 'src/app/shared/services/comments/comments.service';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

const LIST: any[] = [
  { name: 'Всі', link: 'all' },
  { name: 'Філадельфія', link: 'Філадельфія' },
  { name: 'Каліфорнія', link: 'Каліфорнія' },
  { name: 'Запечені', link: 'Запечені' },
  { name: 'Фірмові', link: 'Фірмові' },
  { name: 'Макі', link: 'Макі' },
  { name: 'Праміум', link: 'Праміум' }
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public updateBasket: EventEmitter<void> = new EventEmitter<void>();


  constructor(
    private commmpService: ComponentsService,
    private gooService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {
    this.router.events.subscribe()
   }


  public listCommponenet: any[] = LIST;
  public getArr!: Array<ComponentsResponse>
  public goodsArr!: Array<GoodsResponse>
  public activeItem: any;
  public compName!: string
  public goodsData!: GoodsResponse;

  ngOnInit(): void {
    this.getCategory()
    this.getGood()
 
  
  }

  getCategory(): void {
    this.commmpService.getAll().subscribe(data => {
      this.getArr = data
    })
  }

  getGood(): void {
    this.gooService.getAll().subscribe(data => {
      this.goodsArr = data
        
    })
  }

  getGoodst(): void {
    this.gooService.getAllByComponent(this.compName).subscribe(data => {
      this.goodsArr = data

    })
  }



  onSelectItem(component: ComponentsResponse): void {
    this.activeItem = component;
    this.compName = component.link
    if (this.compName == 'all') {
      this.getGood()
    } else {
      this.getGoodst()
    }

  }

  quantity_goods(good: GoodsResponse, value: boolean): void {
    if (value) {
      ++good.count
    } else if (!value && good.count > 1) {
      --good.count
    }
  }

  addToBasket(goods: GoodsResponse): void {
    let basket: Array<GoodsResponse> = []
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
  if (basket.some(good => good.id === goods.id)) {
        const index = basket.findIndex(good => good.id === goods.id);
        basket[index].count += goods.count;
      } else {
        basket.push(goods);
      }
    } else {
      basket.push(goods); 
    }
   localStorage.setItem('basket', JSON.stringify(basket))
    goods.count = 1
    this.orderService.chageBasket.next(true) 
    this.updateBasket.emit();
  }



}
