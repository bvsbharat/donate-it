import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
@Injectable()
export class UserService {
  socketIO: any;
  constructor(private commonService: CommonService) {
    this.socketIO = this.commonService.getSocket();
}

  registerUser(userdetails: string) {

    this.socketIO.emit("register-user", {
      name: userdetails["name"],
      type: userdetails["userType"] ? userdetails["userType"] : "donor",
      password: userdetails["password"],
      emailID: userdetails["emailId"],
      mobile: userdetails["phoneNumber"],
      ID: userdetails["empId"] ? userdetails["empId"] : ""
  });
  }

  Userregistered(cb) {
    this.socketIO.on("user-registered", function (response) {
      cb(response);
    });
  }
}
