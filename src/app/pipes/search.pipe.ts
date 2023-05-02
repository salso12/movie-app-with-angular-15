import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../models/film';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(listFilms : Film[], searchTerm : string): Film[] {
    return listFilms.filter(listFilms => {
      return listFilms.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

}
