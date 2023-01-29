import { Component, OnInit } from '@angular/core';
import {DtoInputConversation} from "../../../dtos/conversation/dto-input-conversation";
import {ConversationService} from "../../../services/conversation/conversation.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputConversation} from "../../../dtos/conversation/dto-output-conversation";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit
{

  form: FormGroup = this._fb.group(
    {
      usernameOfReceiver: this._fb.control("",Validators.required),
      subject: this._fb.control("",Validators.required),
      message: this._fb.control("",Validators.required),
    });

  conversationToSend: DtoOutputConversation =
  {
    subject:"",
    lastMessage:"",
    usernameOfReceiver: "",
    idOfSender:-1
  };

  conversations: DtoInputConversation[] = [];
  showForm = false;

  constructor(private toastr: ToastrService,private conversationService: ConversationService,private _fb: FormBuilder)
  {

  }
  ngOnInit(): void
  {
    this.updateConversations();
  }

  updateConversations()
  {
    this.conversationService.getConversations().subscribe(conversations =>
    {
       //update all conversations
      for(let i = 0; i <conversations.length; i++)
      {
        this.updateInterlocutors(conversations[i]);
      }
      this.conversations = conversations;
    });
  }

  updateInterlocutors(conversations: DtoInputConversation)
  {
      (conversations).interlocutorUsername = this.conversationService.getOtherParticipantUsername(conversations);
  }

  toggleForm()
  {
    this.showForm = !this.showForm;
  }

  createConversation() {
    //match values
    this.conversationToSend.subject = this.form.value.subject;
    this.conversationToSend.usernameOfReceiver = this.form.value.usernameOfReceiver;
    this.conversationToSend.lastMessage = this.form.value.message;

    //create conversation and add to list
    this.conversationService.createConversation(this.conversationToSend).subscribe(
      conversation =>
      {
        console.log(conversation);
        this.updateInterlocutors(conversation);
        this.conversations.push(conversation);

        this.toastr.success("La conversation a bien été crée !");

      },
      error =>
      {
        this.toastr.error("La conversation n'a pas pu être créée !");
      }
    );
  }

}
