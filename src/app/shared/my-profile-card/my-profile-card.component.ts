import { Component, OnInit } from '@angular/core';

import {CommonService} from '../../services/common.service'
@Component({
  selector: 'app-my-profile-card',
  templateUrl: './my-profile-card.component.html',
  styleUrls: ['./my-profile-card.component.css']
})
export class MyProfileCardComponent implements OnInit {

  constructor(private commonService: CommonService) { }
  userName: string = "James";
  userType: string = "Donor";
  ngOnInit() {
    let userdetails=this.commonService.getUserInformation();
        if(userdetails) {
            var userName = userdetails.name;
            this.userName = userName ? userName : this.userName;
            this.userType = userdetails.type;
        }
  }

}
