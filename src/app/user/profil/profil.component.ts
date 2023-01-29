import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DtoInputUser} from "../../dtos/user/dto-input-user";
import {SignUpService} from "../../services/user/sign-up.service";
import {ImplantationService} from "../../services/implantation/implantation.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  // Declare variables for user data and user ID
  user: DtoInputUser | null = null;
  username: string = "";

  // Inject the services and activated route into the constructor
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: SignUpService,
    private _implantationService: ImplantationService
  ) { }

  // Initialize the component by subscribing to the activated route's parameter map
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(args => {
      // Check if the map has an "id" parameter
      if (args.has("username")) {
        // Set the idUser variable to the value of the "id" parameter
        this.username = String(args.get("username"));
        // Call the fetchUserById function with the idUser value
        this.fetchUserByUsername(this.username);
      }
    });
  }

  // Function to fetch a user by their ID
  private fetchUserByUsername(username: string){
    // Call the fetchUserById function of the user service, passing in the ID
    this._userService
      .fetchUserByUsername(username)
      // Subscribe to the observable returned by the service and set the user variable to the returned user data
      .subscribe(user => this.user = user);
  }
}
