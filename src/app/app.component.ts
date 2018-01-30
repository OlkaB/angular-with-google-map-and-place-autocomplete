import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	ngOnInit() {
		alert("Firebase source code and tutorial: \n\nhttps://github.com/angular/angularfire2/blob/master/docs/rtdb/objects.md\n\n http://javasampleapproach.com/angular-tutorial#Firebase_Realtime_Database");
		console.log("https://github.com/angular/angularfire2/blob/master/docs/rtdb/objects.md \n\n http://javasampleapproach.com/angular-tutorial#Firebase_Realtime_Database");
	}
}