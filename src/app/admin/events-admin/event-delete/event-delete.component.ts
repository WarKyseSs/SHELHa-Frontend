import {Component, Input, OnInit, Output} from '@angular/core';
import {DtoInputEvent} from "../../../dtos/event/dto-input-event";
import {EventsService} from "../../../community/events/events.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-event-delete',
  templateUrl: './event-delete.component.html',
  styleUrls: ['./event-delete.component.css']
})
export class EventDeleteComponent implements OnInit {

  @Input() events: DtoInputEvent[] = [];

  selected :number = 0;

  eventSelected: DtoInputEvent = {
    idEvent: -1,
    title: "",
    description:"",
    datePublication: new Date(),
    dateEvent: new Date(),
    city:"",
    street:"",
    streetNumber:"",
    postalCode: 0,
    idAuthor: -1,
    urlEvent: "",
    username: ""
  };

  @Output() eventDeleted: DtoInputEvent = {
    idEvent: -1,
    title: "",
    description:"",
    datePublication: new Date(),
    dateEvent: new Date(),
    city:"",
    street:"",
    streetNumber:"",
    postalCode: 0,
    idAuthor: -1,
    urlEvent: "",
    username: ""
  };

  form: FormGroup = this._fb.group({
    idEvent: [0, Validators.required],
    title: [""],
    description: [""],
    dateEvent: ["July 21, 1983 01:15:00"],
    city: [""],
    street: [""],
    streetNumber: [""],
    postalCode: [0],
    idAuthor: [0, Validators.required]
  });

  constructor(private _toastr:ToastrService, private _fb: FormBuilder, private _eventService: EventsService) { }

  ngOnInit(): void {
    this.fetchAllEvents();
  }

  emitDelete() {
    this.eventDeleted = {
      idEvent: this.form.value.idEvent,
      title: this.form.value.title,
      description: this.form.value.description,
      datePublication: new Date(),
      dateEvent: this.form.value.dateEvent,
      city: this.form.value.city,
      street: this.form.value.street,
      streetNumber: this.form.value.streetNumber,
      postalCode: this.form.value.postalCode,
      // à changer quand il y aura la connection
      idAuthor: 1,
      urlEvent: "",
      username: ""
    };

    if(this.eventDeleted.title == "" || this.eventDeleted.title == null){
      this.eventDeleted.title = this.eventSelected.title;
    }

    if(this.eventDeleted.description == "" || this.eventDeleted.description == null){
      this.eventDeleted.description = this.eventSelected.description;
    }

    if(this.eventDeleted.dateEvent == new Date("July 21, 1983 01:15:00") || this.eventDeleted.dateEvent == null){
      this.eventDeleted.dateEvent = this.eventSelected.dateEvent;
    }

    if(this.eventDeleted.city == "" || this.eventDeleted.city == null){
      this.eventDeleted.city = this.eventSelected.city;
    }

    if(this.eventDeleted.street == "" || this.eventDeleted.street == null){
      this.eventDeleted.street = this.eventSelected.street;
    }

    if(this.eventDeleted.streetNumber == "" || this.eventDeleted.streetNumber == null){
      this.eventDeleted.streetNumber = this.eventSelected.streetNumber;
    }

    if(this.eventDeleted.postalCode == 0 || this.eventDeleted.postalCode == null){
      this.eventDeleted.postalCode = this.eventSelected.postalCode;
    }

    this.eventSelected = {
      idEvent: 1,
      title: "",
      description:"",
      datePublication: new Date(),
      dateEvent: new Date(),
      city:"",
      street:"",
      streetNumber:"",
      postalCode: 0,
      idAuthor: 1,
      urlEvent: "",
      username: ""
    };

    if(window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.delete(this.eventDeleted);
      this._toastr.success("L'évenement "+this.eventDeleted.title+" a bien été supprimé!");
    }
    this.fetchAllEvents();
    this.form.reset();
  }

  delete(dto: DtoInputEvent) {
    this._eventService.delete(dto.idEvent).subscribe(() =>{
      this.events = this.events.filter(event => event.idEvent !== dto.idEvent);
    });
  }

  fetchAllEvents(){
    this._eventService.fetchAll().subscribe(events => this.events = events);
  }

  SelectHandler(idEvent: number) {
    for(let event of this.events){
      if(event.idEvent == idEvent){
        this.eventSelected = {
          idEvent: event.idEvent,
          title: event.title,
          description: event.description,
          datePublication: event.datePublication,
          dateEvent: event.dateEvent,
          city: event.city,
          street: event.street,
          streetNumber: event.streetNumber,
          postalCode: event.postalCode,
          urlEvent: event.urlEvent,
          idAuthor: event.idAuthor,
          username: ""
        }
      }
    }
  }
}
