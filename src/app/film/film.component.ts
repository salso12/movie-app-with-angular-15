import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { Categories } from '../models/categories';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit{

  constructor( private filmService : FilmService) {
  }
  Listfilms : Film[]=[];
  Films : Film[] = [];
  searchTerm: string ='';
  editable = false

  newFilm : Film = {
    title: '',
    content: '',
    icon: '',
    link: '',
    category: ''
  }
  isExpanded = [];

  showForm = false

  list: boolean = false;
  initFilm(){
    this.newFilm = {
      title: '',
      content: '',
      icon: '',
      link: '',
      category: ''
    }
  }
  categories: any[] = [];

  addFilm(){
    this.filmService.postFilms(this.newFilm).subscribe((Response)=>{
      this.Listfilms = [ ...this.Listfilms,Response]
      this.initFilm()
    })
    this.showForm = false
    this.editable = false
  }
  ngOnInit(): void {
    this.getFilms();
  }
  // getFilms(){
  //   this.filmService.getFilms().subscribe((responce : any) =>{
  //     console.log(responce)
  //     this.Listfilms =this.Films = responce;
  //   })
  // }
  getFilms() {
    this.filmService.getFilms().subscribe((response: any) => {
      this.Listfilms = this.Films = response;
      this.filmService.getCategories().subscribe((categories: any) => {
        this.categories = categories;
        this.Listfilms.forEach((film) => {
          // Map the category id to category name
          const category = this.categories.find(
            (c) => c.id === film.category
          );
          film.category = category ? category.name : "N/A";
        });
      });
    });
  }


  deleteFilm(id : any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.filmService.deleteFilm(id).subscribe(()=>{
          this.Listfilms = this.Listfilms.filter((item)=>{
            return item.id!== id
          })
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }
  editFilm(data: Film){
    this.newFilm = data
    this.editable = true
    this.showForm = true
    console.log(data)
  }
  updateFilm(){
    const title = this.newFilm.title;

  // Get the value of the "Poster" input field
  const icon = this.newFilm.icon;

  // Get the value of the "link" input field
  const link = this.newFilm.link;

  // Get the value of the "Content" input field
  const content = this.newFilm.content;

    this.filmService.putFilm(this.newFilm.id,{title,content,icon,link,category: this.newFilm.category}).subscribe((responce)=>{
      this.initFilm()
      this.showForm = false
      this.editable = false
  })
}
toggleFormVisibility() {
  this.showForm = !this.showForm;
  // this.edittable = !this.edittable
  this.initFilm()
}
viewMode(etat:boolean){
  this.list = etat
}
}
