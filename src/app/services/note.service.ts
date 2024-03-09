import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient) { }
  addNoteApi(data:any):Observable<any>
  {
    return this._HttpClient.post(`https://note-sigma-black.vercel.app/api/v1/notes`,data)
  }
  getUserNote():Observable<any>
  {
    return this._HttpClient.get(`https://note-sigma-black.vercel.app/api/v1/notes`)
  }
  deleteNote(id:any):Observable<any>
  {
    return this._HttpClient.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`)
  }
  updateNote(id:any,data:any):Observable<any>
  {
    return this._HttpClient.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,data)
  }

}
