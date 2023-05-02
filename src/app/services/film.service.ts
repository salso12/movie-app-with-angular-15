import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  baseUrl = 'http://localhost:3000/film'

  constructor( private http:HttpClient) {
   }
   getFilms() {
    return this.http.get(this.baseUrl)
  }
  getCategories() {
    return this.http.get('http://localhost:3000/categories');
  }
  postFilms( data : Film){
    return this.http.post<Film>(this.baseUrl, data)
  }
  getOneFilm(id : number){
    return this.http.get(`${this.baseUrl}/${id}?_expand=categories`);
  }
  deleteFilm(id : number){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
  putFilm(id : number| undefined, data : Film){
    return this.http.patch(`${this.baseUrl}/${id}`, data)
  }
}
