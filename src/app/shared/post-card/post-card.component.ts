import { Component, OnInit, Input,Pipe, PipeTransform, Output, EventEmitter } from '@angular/core';
import {KeysPipe} from '../../pipes/pipe';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { CommonService } from '../../services/common.service';
import { Observable } from 'rxjs/Observable';
import {Routes, RouterModule, Router, ActivatedRoute} from "@angular/router";
import { EventListener } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {

  @Input('postData') postData;
  @Output('deletedPostID') deletedPostID: EventEmitter<string> = new EventEmitter<string>();
  comments: any;
  objectKeys = Object.keys;
  commentText = '';
  socketIO: any;
  userId: any;
  userDetails:{
    _id:''
  }
  constructor(private db: AngularFireDatabase, private router: Router,private CommonService:CommonService) { }

  ngOnInit() {

    let sessionData = localStorage.getItem("userInfo");
    this.userDetails = JSON.parse(sessionData);
    this.userId = this.userDetails._id;
    this.socketIO = this.CommonService.getSocket();
    this.init();
  }

  init(){
    console.log(this.postData)
  }

  ngOnDestroy(){
    console.log("distroy from post");
    // this.socketIO.removeAllListeners('new-donation-added');
  }



  getCourses(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

  navigateMsg(id){
  this.router.navigate(['/postDetails', id]);
  }

  navigateEdit(id){
    this.router.navigate(['/editDetails', id])
  }


  submitDonation(post, donationData) {
    let data = donationData;
    post.donationMessage = "";
    var payLoad = {
        quantityOffered: parseInt(data.quantity),
        scheduledOn : new Date(data.date.year, data.date.month,data.date.day),
        donationBy: this.userId,
        post: post._id
    }
    let that = this;
    this.socketIO.emit('create-donation', payLoad);

      this.socketIO.on('new-donation-added', function (response) {
          console.log("donationAdded", response);
          var responseData=response.data;
          if(response.success) {
            post["show"] = false;
            that.socketIO.emit('fetch-all-posts');
          } else {
            post.donationMessage = responseData.reason;
            console.log(response.data.reason);
          }

      });
  }

  deletePost(id){
    this.deletedPostID.emit(id)
  }
}
