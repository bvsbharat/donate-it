import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { CommonService } from '../../services/common.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    userName: string = "James";
    userType: string = "Donor";
    socketIO: any;
    constructor(public location: Location, private element: ElementRef, private router: Router, private commonService: CommonService) {
        this.sidebarVisible = false;
    }
    searchValue: string = '';
    public searchResult = [];
    showResult:boolean;

    /**
     * sets the user name on initialize
     * @param  {void}
     * @return {void}
     */
    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.addevent();
        var userInfo = this.commonService.getUserInformation();
        this.socketIO = this.commonService.getSocket();
        if (userInfo) {
            var userName = userInfo.name;
            this.userName = userName ? userName : this.userName;
            this.userType = userInfo.type;
        }
        this.inIt();
    }

    ngOnDestroy(){
        // this.removelisner();
        console.log("distroy");
      }
    
      removelisner(){
        console.log("removed");
        let list = ["post-results-fetched"];
        for(let i=0; i < list.length; i++){
          this.socketIO.removeAllListeners(list[i]);
        }
      }

    inIt() {
       let  _this = this;
        this.socketIO.on('post-results-fetched', function (data) {
            if (data) {
             //   this.removeAllListeners();
                _this.searchResult = data.data;
            } 
            console.log("search data", _this.searchResult.length);
        });
    }

    logOut() {
        this.commonService.clearUserInformation();
        this.router.navigate(['/login']);
    }

    filterBasedOnCategory(title) {
        this.inIt();
        let _this = this;
        this.showResult = true;
        this.socketIO.emit('filter-search', {
            title: title
        });
    }

    showHideSearch(){
        this.showResult = false;
    }

    navigateMsg(id){
        this.showResult = false;
        this.router.navigate(['/postDetails', id]);
    }

    /**
   * This function will return
   * @param  {void}
   * @return {boolean}
   */
    addevent() {
        var $window = $(window),
            $document = $(document),
            $body = $('body'),
            $sidebar = $('.fixed-sidebar');

        //Scroll to top.
        $('.back-to-top').on('click', function () {
            $('html,body').animate({
                scrollTop: 0
            }, 1200);
            return false;
        });


        /* -----------------------
        * Input Number Quantity
              * --------------------- */

        $(document).on("click", ".quantity-plus", function () {
            var val = parseInt($(this).prev('input').val());
            $(this).prev('input').val(val + 1).change();
            return false;
        });

        $(document).on("click", ".quantity-minus", function () {
            var val = parseInt($(this).next('input').val());
            if (val !== 1) {
                $(this).next('input').val(val - 1).change();
            }
            return false;
        });

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href"); // activated tab
            if ('#events' === target) {
                $('.fc-state-active').click();
            }
        });

        // Toggle aside panels
        $("body", ".js-sidebar-open").on('click', function () {
            var mobileWidthApp = $('body').outerWidth();
            if (mobileWidthApp <= 560) {
                $(this).closest('body').find('.popup-chat-responsive').removeClass('open-chat');
            }

            $(this).toggleClass('active');
            $(this).closest($sidebar).toggleClass('open');
            return false;
        });

        // Close on "Esc" click
        $window.keydown(function (eventObject) {
            if (eventObject.which == 27 && $sidebar.is(':visible')) {
                $sidebar.removeClass('open');
            }
        });

        // Close on click outside elements.
        $document.on('click', function (event) {
            if (!$(event.target).closest($sidebar).length && $sidebar.is(':visible')) {
                $sidebar.removeClass('open');
            }
        });

        // Toggle inline popups

        var $popup = $('.window-popup');

        $(".js-open-popup").on('click', function (event) {
            var target_popup = $(this).data('popup-target');
            var current_popup = $popup.filter(target_popup);
            var offset = $(this).offset();
            current_popup.addClass('open');
            current_popup.css('top', (offset.top - (current_popup.innerHeight() / 2)));
            $body.addClass('overlay-enable');
            return false;
        });

        // Close on "Esc" click
        $window.keydown(function (eventObject) {
            if (eventObject.which == 27) {
                $popup.removeClass('open');
                $body.removeClass('overlay-enable');
                $('.profile-menu').removeClass('expanded-menu');
                $('.popup-chat-responsive').removeClass('open-chat');
                $('.profile-settings-responsive').removeClass('open');
                $('.header-menu').removeClass('open');
            }
        });

        // Close on click outside elements.
        $document.on('click', function (event) {
            if (!$(event.target).closest($popup).length) {
                $popup.removeClass('open');
                $body.removeClass('overlay-enable');
                $('.profile-menu').removeClass('expanded-menu');
                $('.header-menu').removeClass('open');
            }
        });

        // Close active tab on second click.
        $('[data-toggle=tab]').on('click', function () {
            if ($(this).hasClass('active') && $(this).closest('ul').hasClass('mobile-app-tabs')) {
                $($(this).attr("href")).toggleClass('active');
                $(this).removeClass('active');
                return false;
            }
        });

        // Close on "X" click
        $(".js-close-popup").on('click', function () {
            $(this).closest($popup).removeClass('open');
            $body.removeClass('overlay-enable');
            return false
        });

        $(".profile-settings-open").on('click', function () {
            $('.profile-settings-responsive').toggleClass('open');
            return false
        });

        $(".js-expanded-menu").on('click', function () {
            $('.header-menu').toggleClass('expanded-menu');
            return false
        });

        $(".js-chat-open").on('click', function () {
            $('.popup-chat-responsive').toggleClass('open-chat');
            return false
        });
        $(".js-chat-close").on('click', function () {
            $('.popup-chat-responsive').removeClass('open-chat');
            return false
        });

        $(".js-open-responsive-menu").on('click', function () {
            $('.header-menu').toggleClass('open');
            return false
        });

        $(".js-close-responsive-menu").on('click', function () {
            $('.header-menu').removeClass('open');
            return false
        });

        // Toggle aside panels
        $(".js-sidebar-open").on('click', function () {
            var mobileWidthApp = $('body').outerWidth();
            if (mobileWidthApp <= 560) {
                $(this).closest('body').find('.popup-chat-responsive').removeClass('open-chat');
            }
            $(this).toggleClass('active');
            $(this).closest($sidebar).toggleClass('open');
            return false;
        });
    }



}
