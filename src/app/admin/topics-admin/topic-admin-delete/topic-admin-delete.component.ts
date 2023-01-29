import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TopicsAdminService} from "../../../services/topic/topics-admin.service";
import {DtoInputTopic} from "../../../dtos/topic/dto-input-topic";

@Component({
  selector: 'app-topic-admin-delete',
  templateUrl: './topic-admin-delete.component.html',
  styleUrls: ['./topic-admin-delete.component.css']
})
export class TopicAdminDeleteComponent implements OnInit {

  @Input() topics : DtoInputTopic[] = [];
  @Output() topicsDeleted : EventEmitter<DtoInputTopic> = new EventEmitter<DtoInputTopic>();


  page: number = 1;
  count: number = 0;
  listSize: number = 5;
  listSizes: any = [5, 10, 15, 20, 50];


  constructor(private _topicAdminService : TopicsAdminService) { }

  ngOnInit(): void {
    this.fetchAllTopics();
  }

  emitDelete(topic : DtoInputTopic){
    this.delete(topic);
  }

  delete(dto : DtoInputTopic){
    this._topicAdminService.delete(dto.idCat).subscribe(() =>{
      this.topics = this.topics.filter(topic => topic.idCat !== dto.idCat);
    })
  }

  private fetchAllTopics(){
    this._topicAdminService.fetchAll().subscribe( topics => this.topics = topics);
  }

  onListDataChange(event: any) {
    this.page = event;
  }

  onListSizeChange(event: any) {
    this.listSize = event.target.value;
    this.page = 1;
  }
}
