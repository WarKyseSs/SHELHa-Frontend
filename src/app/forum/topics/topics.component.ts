import {Component, OnInit} from '@angular/core';
import {DtoInputTopics} from "../../dtos/topic/dto-input-topics";
import {TopicsService} from "../../services/topic/topics.service";

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  topics : DtoInputTopics[] = [];
  constructor(private _topicService : TopicsService) { }

  ngOnInit(): void {

    this.fetchAllTopics();
  }

  private fetchAllTopics(){
    this._topicService.fetchAll().subscribe( topics => this.topics = topics);
  }

}
