import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-otheruser',
  templateUrl: './otheruser.component.html',
  styleUrls: ['./otheruser.component.css']
})
export class OtheruserComponent implements OnInit {
  /* Get an observable of follow array for logged in user */
private userId: String;
  constructor(private router: Router, private route: ActivatedRoute) { 
    /* Get the logged in user */
  }

  ngOnInit() {
    console.log('Inside image-list');
    this.userId = this.route.snapshot.params['id'];
    /* Get the search user name from the user id and also the follow list of logged in user
    if followlist contains search userid then navigate 
    else render html page to follow/ */

    this.router.navigateByUrl('imagelist/' + this.userId);
    
  }
  /*Onclick = followbutton write to db (follow array<- search user)
 on successfull write navigate to searched user imagelist */

 /* onclick of home button navigate to home component and reset the value of flag
 Import the imagelist component to access the getter,*/

}
