import { Component, OnInit } from '@angular/core';

import { MyProfileCardComponent } from '../../shared/my-profile-card/my-profile-card.component';
import { PostCardComponent } from '../../shared/post-card/post-card.component';
import { ProfileWidgetContainerComponent } from '../../shared/profile-widget-container/profile-widget-container.component';

import { CommonService } from '../../services/common.service';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { PostService } from '../../services/post.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    postData = [];
    filter = '';
    tempdata = [];
    socketIO: any;
    userName: string = "James";
    userType: string = "Donor";
  
    constructor(public PostService: PostService,private commonService:CommonService, private db: AngularFireDatabase) { }

    ngOnInit() {
        this.socketIO = this.commonService.getSocket();
        var _this=this;
        this.getmydata();
        this.socketIO.on('post-results-fetched', function (response) {
          var responseData = response.data;
          
          if(response.success) {
            _this.postData=responseData;
          } else {
              console.log("Error in user login");
          }
        });
    }

    ngOnDestroy(){
        this.removelisner();
        console.log("distroy");
      }
    
      removelisner(){
        console.log("profile removed");
        let list = ["post-results-fetched","post-deleted"];
        for(let i=0; i < list.length; i++){
          this.socketIO.removeAllListeners(list[i]);
        }
      }

    getmydata(){
        let userdetails = JSON.parse(localStorage.getItem("userInfo"));
        if(userdetails) {
            var userName = userdetails.name;
            this.userName = userName ? userName : this.userName;
            this.userType = userdetails.type;
        }
        this.socketIO.emit('my-posts', userdetails._id);
    }

    updateOnDelete(id) {
        let _this = this;
        this.socketIO.emit('delete-post', id);
        this.socketIO.on('post-deleted', function (data) {
          _this.getmydata();
        });
      }

      

}
