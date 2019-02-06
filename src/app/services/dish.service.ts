import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { DISHES } from '../shared/dishes';
import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { RestangularConfigFactory } from '../shared/restConfig';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DishService {

  constructor(/*private http: HttpClient,*/ private restangular: Restangular, private processHttpmsgService: ProcessHttpmsgService) {}

    getDishes(): /*Promise*/Observable<Dish[]> {
        /*Restangular*/ return this.restangular.all('dishes').getList().pipe(catchError(error => error));
        /*HTTP*/ //return this.http.get<Dish[]>(baseURL + 'dishes');
        /*Observable*/ //return of(DISHES).pipe(delay(2000));
        /*Promise*/ /*return new Promise(resolve => {
        //Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES), 2000);
      });*/
    }

    getDish(id: number): /*Promise*/Observable<Dish> {
        /*Restangular*/ return this.restangular.one('dishes', id).get().pipe(catchError(error => error));
        /*HTTP*/ //return this.http.get<Dish>(baseURL + 'dishes/' + id);
        /*Observable*/ //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
        /*Promise*/ /*return new Promise(resolve => {
         //Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
      });*/
    }

    getFeaturedDish(): /*Promise*/Observable<Dish> {
        /*Restangular*/ return this.restangular.all('dishes').getList({featured: true}).pipe(map(dishes => dishes[0])).pipe(catchError(error => error));
        /*HTTP*/ //return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
        /*Observable*/ //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
        /*Promise*/ /*return new Promise(resolve => {
        //Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
      });*/
    }

  getDishIds(): Observable<number[] | any> {
    /*HTTP*/ return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id))).pipe(catchError(error => error));
    /*Observable*/ //return of(DISHES.map(dish => dish.id ));
  }
}
