import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../interface/note';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allNotes:Note[],title:string): Note[] {
    return allNotes.filter(note=>note.title.toLowerCase().includes(title.toLowerCase()));
  }

}
