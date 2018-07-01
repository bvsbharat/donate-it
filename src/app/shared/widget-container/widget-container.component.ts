import { Component, OnInit,Input} from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonService } from '../../services/common.service';
import {Routes, RouterModule, Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.css']
})
export class WidgetContainerComponent implements OnInit {

  public today = new Date();
  public categories = {
    Apparel: false,
    Utensils: false,
    Furniture: false,
    Other: false
  }
  socketIO: any;
  activityFeed:any;
  @Input('feedData') feedData;
  constructor(private Postservice: PostService,private commonService: CommonService,private router: Router) { }

/**
 * sets the today date on initialize
 * @param  {void}
 * @return {void}
 */
  ngOnInit() {
    this.socketIO = this.commonService.getSocket();
    this.getActivityFeed();
  }

  

  /**
   * updates the filter
   * @param  {void}
   * @return {void}
   */
  onFilterChange() {
    let keys = Object.keys(this.categories);
    let _this = this;
    let filtered = keys.filter(function (key) {
      return _this.categories[key];
    });
    this.Postservice.updateFilter.next(filtered);
  }

  getActivityFeed(){
    this.socketIO.emit('fetch-latest-posts');

    let _this = this;
    this.socketIO.on('feed-fetched', function (response) {
      if (response.data.length > 0) {
        _this.activityFeed = response.data;
        console.log("activityFeed Posts", _this.activityFeed);
      } else {
        console.log("Error in activityFeed Posts", response);
      }
    });
  }

  ngOnDestroy(){
    this.removelisner();
    console.log("distroy");
  }

  removelisner(){
    console.log("feed-fetched removed");
    let list = ["feed-fetched"];
    for(let i=0; i < list.length; i++){
      this.socketIO.removeAllListeners(list[i]);
    }
  }

  navigateMsg(id){
    this.router.navigate(['/postDetails', id]);
    }

}
