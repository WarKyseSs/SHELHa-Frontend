import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DtoInputMessage} from "../../../dtos/message/dto-input-message";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../../../services/message/message.service";
import {SignInService} from "../../../services/user/sign-in.service";
import {DtoOutputMessage} from "../../../dtos/message/dto-output-message";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoInputConversation} from "../../../dtos/conversation/dto-input-conversation";
import {ConversationService} from "../../../services/conversation/conversation.service";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
// Component to display and send messages in a conversation
export class MessagesListComponent implements OnInit
{

  // Array to store the list of messages
  messages: DtoInputMessage[] = [];

  // URL of the SignalR API
  private readonly CHAT_URL = "https://localhost:7074/chat/";
  // Connection to the SignalR server
  private _hubConnection: HubConnection = new HubConnectionBuilder()
    .withUrl(this.CHAT_URL)
    .build();


  //Slug of the conversation (URL parameter)
  slug :string = "";
  // ID of the logged in user
  idOfUserConnected: number = -1;

  // Object representing the message to send
  messageToSend: DtoOutputMessage = {
    message:"",
    idSender:this.idOfUserConnected,
    conversationSlug:this.slug
  };

  // Object representing the conversation
  //@ts-ignore
  conversation: DtoInputConversation;

  // Form for entering messages
  form: FormGroup = this._fb.group({
    message: this._fb.control("",Validators.required),
  })

  // Reference to the list of messages
  //@ts-ignore
  @ViewChild('messagesList', { static: true }) messagesList: ElementRef;
  //@ts-ignore
  @ViewChild('chat') chat: ElementRef;
  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _messageService:MessageService,
    private _authService:SignInService, private _conversationService: ConversationService)
  { }


  ngOnInit(): void
  {
    // Retrieves the conversation and message information from the URL
    this._route.paramMap.subscribe(args => {
      if (args.has("slug"))
      {
        this.slug = String(args.get("slug"));
        this.getMessages(this.slug);
        this._conversationService.getBySlug(this.slug).subscribe(conversation => this.conversation = conversation);

      }
    });

    //Retrieves the ID of the logged in user
    this._authService.getIdOfUserConnected().subscribe(number => this.idOfUserConnected = number);

    //Starts the connection to the SignalR server
    this.startConnection();

  }

  // Sends a message to the server
  sendMessage()
  {
    // Update the messageToSend object with the message and conversation information
    this.messageToSend =
      {
      idSender:this.idOfUserConnected,
      conversationSlug:this.slug,
      message:this.form.value.message
    }

    // Persists the message in the database
    this._messageService.sendMessage(this.messageToSend).subscribe();

    // Displays the message in the conversation and sends it to the other user in real-time
    var receiver = this._conversationService.getOtherParticipantUsername(this.conversation);
    this.SendMessageToGroup(receiver,this.messageToSend.message);

    // Create an object with the necessary data to display the message
    const inputMessage =
      {
        id: this.idOfUserConnected,
        idSender: this.messageToSend.idSender,
        message: this.messageToSend.message,
        conversationSlug: this.messageToSend.conversationSlug,
        usernameOfSender:this._conversationService.getConnectedParticipantUsername(this.conversation)

      } as unknown as DtoInputMessage;

    // Add the message to the list of messages
    this.messages.unshift(inputMessage);

    // Reset the form
    this.form.reset();
  }

  startConnection()
  {
    this._hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch((err: string) => console.log("Error while starting connection: " + err));

    this._hubConnection.on('SendMessage', (username: string, receivedMessage: string) =>
    {
      console.log(`${username}: ${receivedMessage}`);
    });

    this._hubConnection.on('SendMessageToGroup', (username: string, receivedMessage: string, idConversation:number) =>
    {
      //only display the message if is the same conversation
      if(this.conversation.id==idConversation)
      {
        // Other information is not important for displaying the message, so we only create an object with the necessary data
        //only message, usernameOfSender, and idSender are used
        this.messages.unshift({
          id: 0,
          idConversation: 0,
          idSender: this._conversationService.getOtherParticipantId(this.conversation),
          message: receivedMessage,
          timestamp: new Date().toISOString(),
          isRead: false,
          usernameOfSender: username
        });
      }
    });
  }

  // Requests the list of messages from the server for a given conversation
  getMessages(slug:string): void
  {
    this._messageService.getMessages(slug).subscribe(messages => this.messages = messages);
  }

  // Sends a message to a specific user through the SignalR server
  SendMessageToGroup(receiver:string, message:string)
  {
    console.log("receiver ",receiver, " message",message, "id ", this.conversation.id)

    this._hubConnection
      .invoke("SendMessageToGroup", receiver, message, this.conversation.id)
      .catch(function (err)
      {
        return console.error(err.toString());
      });
  }
}
