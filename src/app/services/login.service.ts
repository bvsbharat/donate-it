import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
  @Injectable()
  export class LoginService {
    socketIO: any;
    constructor(private commonService: CommonService) {
        this.socketIO = this.commonService.getSocket();
    }

    checkUser(post: any) {
        console.log(post);
        this.socketIO.emit("login-attempt", {
            emailID: post.emailID,
            password: post.password
        });
    }

    getUserDetails(cb) {
      //  let responseData;
        this.socketIO.on("login-attempt-response", function (response) {
            cb(response);
        });
        
    }

  }
