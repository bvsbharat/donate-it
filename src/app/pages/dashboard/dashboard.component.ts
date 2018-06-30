import { Component, OnInit } from '@angular/core';
import { WidgetContainerComponent } from '../../shared/widget-container/widget-container.component';
import { NewPostComponent } from '../../shared/new-post/new-post.component';
import { PostCardComponent } from '../../shared/post-card/post-card.component';

import { AngularFireDatabase } from 'angularfire2/database';
import { CommonService } from '../../services/common.service';
import { Observable } from 'rxjs/Observable';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  postObservable: Observable<any[]>;
  public postData = [];
  filter = '';
  tempdata = [];
  socketIO: any;
  userDetails :any

  constructor(public PostService: PostService, private db: AngularFireDatabase, private commonService: CommonService) {
   
  }

  ngOnInit() {
    this.userDetails = this.commonService.getUserInformation();
    console.log("getIndo", this.userDetails.type);
    this.socketIO = this.commonService.getSocket();
    this.init();
  }

  init() {
    var _this = this;
    _this.socketIO.emit('fetch-all-posts');
    _this.socketIO.emit('fetch-latest-posts');
    // // on post of new method 
    this.socketIO.on("new-post-done", function (response) {
      console.log("response", response);
      var responseData = response.data;
      if (response.success) {
        _this.commonService.setUserInformation(responseData[0]);
        _this.socketIO.emit('fetch-all-posts');
      } else {
        alert("Error in Posting donation");
      }
    });
    // feacth data on db actions 
    this.socketIO.on("post-results-fetched", function (response) {
      // var responseData = _this.updatePostData(response.data);
      if (response.success && response.data.length > 0) {
        console.log(response.data);
        _this.postData = response.data;
      } else {
        console.log("Error in getting Posts", response);
      }
    });
    // filter subscribe 
    this.PostService.updateFilter.subscribe(function (val) {
      console.log(val);
      _this.filterBasedOnCategory('', val[0]);
    });
    
  }

  updatePostData(data) {
    let array = [];
    for (var i = 0; i < data.length; i++) {
      let post = data[i];
      post.postId = post._id;
      array.push(post);
    }
    return array;

  }



  updateOnDelete(id) {
    let _this = this;
    this.socketIO.emit('delete-post', id);
    this.socketIO.on('post-deleted', function (data) {
      _this.socketIO.emit('fetch-all-posts');
    });
  }

  filterBasedOnCategory(title, category) {
    let _this = this;
    this.socketIO.emit('filter-search', {
      title: title,
      category: category
    });
  }

  getActivityFeed() {
    this.socketIO.on('post-results-fetched', function (data) {
      console.log('activityFeed', data.data);
      this.activityFeed = data.data;
    });
  }

}
