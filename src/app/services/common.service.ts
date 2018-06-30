import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

@Injectable()
export class CommonService {
  private socket: SocketIOClient.Socket;
  constructor() { 
    this.socket = io('https://donate-service-layer.herokuapp.com/');
  }

  name: string = "";
  userId: string = "";
  userInfo: any = {
    _id:"",
    userName: "",
    userId: ""
  };

  getSocket() {
    return this.socket;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
  setLoggedInUserId(id) {
    this.userId = id;
  }
  getLoggedInUserId() {
    return this.userId;
  }
  setUserInformation(info) {
    this.userInfo = info;
    if(info) {
      localStorage.setItem("userInfo", JSON.stringify(info));
    }
  }
  getUserInformation() {
    var userData = this.userInfo;
    try{
      if(this.userInfo._id === "") {
        var sessionData = localStorage.getItem("userInfo");
        userData = JSON.parse(sessionData);
      }
      return userData;
    } catch(err) {
      return userData;
    } 
  }
  clearUserInformation() {
    localStorage.removeItem("userInfo");
  }
}
