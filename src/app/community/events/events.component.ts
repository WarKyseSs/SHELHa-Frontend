import { Component, OnInit } from '@angular/core';
import {DtoInputEvent} from "../../dtos/event/dto-input-event";
import {EventsService} from "./events.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: DtoInputEvent[] = [];

  constructor(private _eventsService: EventsService) { }

  ngOnInit(): void {
    this.fetchAllEvents()
  }

  fetchAllEvents(){
    this._eventsService.fetchAll().subscribe(events => this.events = events);
  }

  delete(dto: DtoInputEvent) {
    this._eventsService.delete(dto.idEvent).subscribe(() =>{
      this.events = this.events.filter(event => event.idEvent !== dto.idEvent);
    });
  }
}
