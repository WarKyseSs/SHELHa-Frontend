import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputTopics} from "../../../dtos/topic/dto-input-topics";


@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit {
  @Input() categories : DtoInputTopics[] = [];
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
