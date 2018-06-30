import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { CommonService } from '../../services/common.service';
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs/Observable';

import { AngularFireStorage } from 'angularfire2/storage';
import { Input } from '@angular/core';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  post:any = {
    description: "",
    quantityRequired: 1,
    ageOfProduct:1,
    userDetails:"",
    title:"",
    category:"Apparel",
    quantityInHand:0,
    isPostActive:true,
    postedBy:"",
    images:[]
  }
  userDetails={
    "_id":''
  };
  ref: any;
  socketIO: any;
  @Input('userType') userType: string;
  @Input('appData') appData: any;
  uploadedImageUrls: any = [];
  title:string;
  placeholder:string;

  constructor(private router: Router, private db: AngularFireDatabase,private commonService: CommonService, private Postservice:PostService, private afStorage: AngularFireStorage) {
    
   }

  ngOnInit() {
    this.socketIO = this.commonService.getSocket();
    let sessionData = sessionStorage.getItem("userInfo");
    this.userDetails = JSON.parse(sessionData);
    this.init();
    console.log("from post",this.userType);
  }

  init(){
    let _this = this;
    this.title = this.userType ==  'ngo' ? 'Request a ' : ' Post a';
    this.placeholder = this.userType ==  'ngo' ? 'requirement' : 'donation';
    this.socketIO.on('post-in-detail', function (response) {
      if(response.success) {
        _this.post = response.data;
      } else {
        alert("Error in Posting donation");
      }
    });
  }
  upload(event) {

    let _this = this;
    let filesArray = event.target.files;
    for (var i = 0; i < filesArray.length; i++) {
      var file = filesArray[i];
      let fileName = file.name;
      let currentDate = new Date();
      fileName = currentDate.valueOf() + fileName;
      let downloadURLPromise = this.afStorage.upload('/Profiles' + "/" + fileName, file).downloadURL();
      downloadURLPromise.toPromise().then(function(response){
        _this.uploadedImageUrls.push(response);
        _this.post.images.push(response);
      });
    }
  }

  removeImage(index) {
    this.uploadedImageUrls.splice(index, 1);
  }

  newPost(formdata) {
    this.post.postedBy=this.userDetails._id;
    this.post.ageOfProduct=parseInt(this.post.ageOfProduct);
    this.post.quantityInHand=parseInt(this.post.quantityInHand);
    this.post.quantityRequired=parseInt(this.post.quantityRequired);
    // this.post.images = this.uploadedImageUrls;
    if(this.post._id) {
      this.socketIO.emit("update-post",this.post);
      var _this = this;
      this.socketIO.on("post-updated", function(response){
        if(response.success) {
          _this.router.navigate(['/dashboard']);
        } else {
           alert("Error in Posting donation");
        }
      });
    }
    else {
      this.socketIO.emit("create-post",this.post);
      var _this = this;
      this.socketIO.on("new-post-done", function(response){
        console.log("response",response);
        var responseData = response.data;
        if(response.success) {
            _this.socketIO.emit("fetch-latest-posts");
            _this.commonService.setUserInformation(responseData[0]);
        } else {
           alert("Error in Posting donation");
        }
      });
      //this.clearPost();
      formdata.resetForm();
    }

  }

  clearPost() {
    this.post = {
      title: "",
      categories: "Apparel",
      description: "",
      quantityRequired: "",
      ageOfProduct:"",
      productImages:[],
      userDetails:""
    }
  }

}
