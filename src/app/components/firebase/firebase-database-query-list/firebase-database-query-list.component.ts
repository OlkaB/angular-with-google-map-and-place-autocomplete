import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-firebase-database-query-list',
  templateUrl: './firebase-database-query-list.component.html',
  styleUrls: ['./firebase-database-query-list.component.css']
})
export class FirebaseDatabaseQueryListComponent implements OnInit {

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string|null>;
  
  constructor(db: AngularFireDatabase) {
    this.size$ = new BehaviorSubject(null);
    this.items$ = this.size$.switchMap(size =>
      db.list('/items', ref =>
        size ? ref.orderByChild('size').equalTo(size) : ref
      ).snapshotChanges()
    );
  }

  filterBy(size: string|null) {
    this.size$.next(size);
  }

  ngOnInit() {
  }

}
