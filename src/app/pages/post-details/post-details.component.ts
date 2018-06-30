import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import {Routes, RouterModule, Router, ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  socketIO: any;
  postId:any;
  commentsposted:string;
  constructor(private route: ActivatedRoute,private CommonService:CommonService,private router: Router) {
    var _that=this;
    this.route.params.subscribe( params => _that.postId=params );
 }
 postData:any
 userId:string;
 userData ={
  _id:"",
 };

  ngOnInit() {
    let _this = this;
    this.socketIO = this.CommonService.getSocket();
    let sessionData = sessionStorage.getItem("userInfo");
    this.userData = JSON.parse(sessionData);
    this.userId = this.userData._id;

    this.init();
    this.socketIO.on('post-in-detail', function(response){
      var responseData = response.data;
      console.log("post details",responseData);
      if(response.success && responseData.description) {
        _this.postData=responseData;
      } else {
         console.log("Error in Posting donation");
      }
  });

  }

  init(){
    this.socketIO.emit('search-one-post', this.postId.id);
  }


  postcomment(id){
    let _this = this;
    let userdetails=this.CommonService.getUserInformation();
    this.socketIO.emit("create-comment", {
      post:{_id:id},
      postedBy:userdetails["_id"],
      description:this.commentsposted
    });
    this.socketIO.on('new-comment-added', function (data) {
      console.log("comment data" ,data);
      if(data.success){
        _this.init();
        _this.commentsposted = '';
      }
    })
  }

  navigateEdit(id){
    this.router.navigate(['/editDetails', id])
  }


  deletePost(id){
    let _this = this;
    this.socketIO.emit('delete-post', id);
    this.socketIO.on('post-deleted', function (data) {
      _this.router.navigate(['/dashboard']);
    });
  }


}
