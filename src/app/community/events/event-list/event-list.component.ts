import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputEvent} from "../../../dtos/event/dto-input-event";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  @Input() events: DtoInputEvent[] = [];
  @Output() eventDeleted: EventEmitter<DtoInputEvent> = new EventEmitter<DtoInputEvent>();
  page: number = 1;
  count: number = 0;
  listSize: number = 5;
  listSizes: any = [5, 10, 15, 20, 50];

  constructor() { }

  ngOnInit(): void {
  }

  onListDataChange(event: any) {
    this.page = event;
  }

  onListSizeChange(event: any) {
    this.listSize = event.target.value;
    this.page = 1;
  }
}
