import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';
import { LoginService } from '../../services/login.service';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    providers:[LoginService,UserService]
})
export class SignupComponent implements OnInit {
    test: Date = new Date();
    login: Object = {};
    userName: string = "";
    constructor(private router: Router, private commonService: CommonService, private LoginService: LoginService, private userService: UserService) { }
    isSignUp: boolean;
    userType: string = "donor";
    isDonorType: boolean = true;
    emailid;
    formdata;
    socketIO: any;
    userRegisterSuccess: boolean = false;
    userLoginFail: boolean = false;
    ngOnInit() {
        let userId = this.commonService.getUserInformation();
        if (userId._id) {
            this.router.navigate(['/dashboard']);
        }
        this.userType = "donor";
        this.socketIO = this.commonService.getSocket();
    }

    submitLogin(data) {
        this.emailid = data.emailId;
        let _that=this;
        this.LoginService.checkUser({
            emailID: data.emailId,
            password: data.password
        });
        this.LoginService.getUserDetails(function(response){
            if(response["success"]){
                _that.commonService.setUserInformation(response["data"]["user"]);
                _that.router.navigate(['/dashboard']);
            }else{
                _that.userLoginFail=true;
                console.log("Error in user login");
            }
        });

    };

    onClickSubmit(data) {
        //alert(JSON.stringify(data));
        var socketIO = this.commonService.getSocket();
        var that = this;
        this.userService.registerUser(data);
        this.userService.Userregistered(function (response) {
            if (response.success) {
                that.userRegisterSuccess = true;
            } else {

                console.log("Error in user registration");
            }
        });
    }
    changeUserType(data) {
        if (data.userType !== "donor") {
            this.isDonorType = false;
        } else {
            this.isDonorType = true;
        }
    }

    showLogin() {
        $(".nav-tabs .nav-link").removeClass("active");
        $('.nav-tabs .nav-link[href="#home"]').addClass("active");
    }
    showRegister() {
        $(".nav-tabs .nav-link").removeClass("active");
        $('.nav-tabs .nav-link[href="#profile"]').addClass("active");
    }
}
