import {Component, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputCreateEvent} from "../../../dtos/event/dto-output-create-event";
import {EventsService} from "../../../community/events/events.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  @Output() eventCreated: DtoOutputCreateEvent = {
    title: "",
    description:"",
    datePublication: new Date(),
    dateEvent: new Date(),
    city:"",
    street:"",
    streetNumber:"",
    postalCode: 0,
    idAuthor: 1
  };

  form: FormGroup = this._fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    dateEvent: [new Date(), Validators.required],
    city: ["", Validators.required],
    street: ["", Validators.required],
    streetNumber: ["", Validators.required],
    postalCode: [0, Validators.required]
  });

  constructor(private _toastr: ToastrService, private _fb: FormBuilder, private _eventService:EventsService) { }

  ngOnInit(): void {
  }

  emitEvent(){
    this.eventCreated = {
      title: this.form.value.title,
      description: this.form.value.description,
      datePublication: new Date(),
      dateEvent: this.form.value.dateEvent,
      city: this.form.value.city,
      street: this.form.value.street,
      streetNumber: this.form.value.streetNumber,
      postalCode: this.form.value.postalCode,
      idAuthor: 1
    };
    this.createEvent(this.eventCreated);
    this.form.reset();
    this._toastr.success("L'évenement "+this.eventCreated.title+" a bien été ajouté!");
  }

  createEvent(event: DtoOutputCreateEvent) {
    this._eventService.create(event).subscribe();
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }
}
