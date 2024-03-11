import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/interface/note';
import { NoteService } from 'src/app/services/note.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allNotes: Note[] = [];
  showAddNote: boolean = false;
  showEditNote: boolean = false;
  isClicked: boolean = false;
  noteId: string = '';
  searchWord: string = '';
  addTitleValue: string = '';
  addContentValue: string = '';
  editTitleValue: string = '';
  editContentValue: string = '';
  constructor(
    private _NoteService: NoteService,
    private _ToastrService: ToastrService,
    private _HttpClient: HttpClient
  ) {}

  ngOnInit() {
    this.getNote();
  }

  getNote() {
    this._NoteService.getUserNote().subscribe({
      next: (data) => {
        if (data.notes.length != 0) {
          this.allNotes = data.notes;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  noteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
  });

  addNote() {
    this.isClicked = true;
    this._NoteService.addNoteApi(this.noteForm.value).subscribe({
      next: (data) => {
        this.isClicked = false;
        this.showAddNote = false;
        this.addTitleValue = '';
        this.addContentValue = '';
        this.editTitleValue = '';
        this.editContentValue = '';
        this.getNote();
        this._ToastrService.success('Note Added Successfully');
      },
      error: (err) => {
        console.log(err);
        this.isClicked = false;
      },
    });
  }

  getNoteId(id: any) {
    this.noteId = id;
    console.log(this.noteId);
  }

  deleteNote(id: any) {
    this._NoteService.deleteNote(id).subscribe({
      next: (data) => {
        this._ToastrService.success('Note Deleted Successfully');
        this.getNote();
        if (this.allNotes.length == 1) {
          this.allNotes = [];
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  editNote() {
    this.isClicked = true;
    this._NoteService.updateNote(this.noteId, this.noteForm.value).subscribe({
      next: (data) => {
        this.isClicked = false;
        this.getNote();
        this.showEditNote = false;
        this._ToastrService.success('Note Updated Successfully');
        this.addTitleValue = '';
        this.addContentValue = '';
        this.editTitleValue = '';
        this.editContentValue = '';
      },
      error: (err) => {
        console.log(err);
        this.isClicked = false;
      },
    });
  }
  stop(event: any) {
    event.stopPropagation();
  }
}
