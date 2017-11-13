import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-otheruser',
  templateUrl: './otheruser.component.html',
  styleUrls: ['./otheruser.component.css']
})
export class OtheruserComponent implements OnInit {
private userId: String;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('Inside image-list');
    this.userId = this.route.snapshot.params['id'];
    this.router.navigateByUrl('imagelist/' + this.userId);
  }

}
