import { Component, OnInit } from '@angular/core';

import {CommonService} from '../../services/common.service'
@Component({
  selector: 'app-profile-widget-container',
  templateUrl: './profile-widget-container.component.html',
  styleUrls: ['./profile-widget-container.component.css']
})
export class ProfileWidgetContainerComponent implements OnInit {

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
