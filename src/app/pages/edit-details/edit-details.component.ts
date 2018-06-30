import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {
    param1: any;
    socketIO: any;
    responseData:any
    userData:{type:""};

  constructor(private route: ActivatedRoute,private commonService: CommonService) {
    var _that=this;
    this.route.params.subscribe( params => _that.param1=params );

  }

  ngOnInit() {
    const routeParams = this.route.snapshot.params;
    console.log("routeParams",)
    let that = this;
    this.socketIO = this.commonService.getSocket();
    this.socketIO.emit("search-one-post", routeParams.id);
    let sessionData = sessionStorage.getItem("userInfo");
    this.userData = JSON.parse(sessionData);

  }
}
