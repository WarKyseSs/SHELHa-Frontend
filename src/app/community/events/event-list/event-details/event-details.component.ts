import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DtoInputEvent} from "../../../../dtos/event/dto-input-event";
import {EventsService} from "../../events.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: DtoInputEvent | null = null;

  constructor(private _route: ActivatedRoute, private _eventService: EventsService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {
      if (args.has("urlEvent")) {
        const urlEvent = String(args.get("urlEvent"));
        this.fetchEventByUrl(urlEvent);
      }
    });
  }

  private fetchEventByUrl(urlEvent: string) {
    this._eventService
      .fetchEventByUrl(urlEvent)
      .subscribe(event => this.event = event);
  }

}
