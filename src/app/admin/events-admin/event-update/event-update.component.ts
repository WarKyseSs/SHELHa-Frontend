import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoInputEvent} from "../../../dtos/event/dto-input-event";
import {EventsService} from "../../../community/events/events.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {

  events: DtoInputEvent[] = [];

  selected :number = 0;
  date: Date = new Date("July 21, 1983 01:15:00");

  eventSelected: DtoInputEvent = {
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

  @Output() eventUpdated: DtoInputEvent = {
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

  form: FormGroup = this._fb.group({
    idEvent: [0, Validators.required],
    title: [""],
    description: [""],
    dateEvent: [this.date],
    city: [""],
    street: [""],
    streetNumber: [""],
    postalCode: [0],
    idAuthor: [0, Validators.required]
  });

  constructor(private _toastr: ToastrService, private _fb: FormBuilder, private _eventService: EventsService) { }

  ngOnInit(): void {
    this.fetchAllEvents();
  }

  emitUpdateEvent(){
    this.eventUpdated = {
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

    if(this.eventUpdated.title == "" || this.eventUpdated.title == null){
      this.eventUpdated.title = this.eventSelected.title;
    }

    if(this.eventUpdated.description == "" || this.eventUpdated.description == null){
      this.eventUpdated.description = this.eventSelected.description;
    }

    if(this.eventUpdated.dateEvent == this.date || this.eventUpdated.dateEvent == null){
      this.eventUpdated.dateEvent = this.eventSelected.dateEvent;
    }

    if(this.eventUpdated.city == "" || this.eventUpdated.city == null){
      this.eventUpdated.city = this.eventSelected.city;
    }

    if(this.eventUpdated.street == "" || this.eventUpdated.street == null){
      this.eventUpdated.street = this.eventSelected.street;
    }

    if(this.eventUpdated.streetNumber == "" || this.eventUpdated.streetNumber == null){
      this.eventUpdated.streetNumber = this.eventSelected.streetNumber;
    }

    if(this.eventUpdated.postalCode == 0 || this.eventUpdated.postalCode == null){
      this.eventUpdated.postalCode = this.eventSelected.postalCode;
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

    this.updateEvent(this.eventUpdated);
    this.fetchAllEvents();
    this.form.reset();
    this._toastr.success("L'évenement "+this.eventUpdated.title+" a bien été modifié!");
  }

  updateEvent(dto: DtoInputEvent) {
    this._eventService.update(dto).subscribe(() => {
      let event = this.events.filter(event => event.idEvent == dto.idEvent)[0];
      let index = this.events.indexOf(event);
      this.events.splice(index, 1, dto);
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
