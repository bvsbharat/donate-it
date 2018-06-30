import {
    Injectable
  } from '@angular/core';


  import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';
  @Injectable()
  export class PostService {
    databaseRef: any;
    querybaseRef: any;
    updateFilter = new Subject<any>();

    constructor() {
    }

    insertPost(post: object) {

    }

    getPosts(categories:any) {
  
    }

  }
