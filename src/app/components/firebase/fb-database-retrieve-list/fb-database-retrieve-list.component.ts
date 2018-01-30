import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-fb-database-retrieve-list',
  templateUrl: './fb-database-retrieve-list.component.html',
  styleUrls: ['./fb-database-retrieve-list.component.css']
})
export class FbDatabaseRetrieveListComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;


  constructor(db: AngularFireDatabase) {
    this.itemsRef = db.list('skirts');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    /*
		valueChanges()
					this.items = db.list('skirts').valueChanges();
			What is it? - Returns an Observable of data as a synchronized array of JSON objects. All Snapshot metadata is stripped and just the method provides only the data.

			Why would you use it? - When you just need a list of data. No snapshot metadata is attached to the resulting array which makes it simple to render to a view.

			When would you not use it? - When you need a more complex data structure than an array or you need the key of each snapshot for data manipulation methods. This method assumes you either are saving the key for the snapshot data or using a "readonly" approach.


		snapshotChanges()
			What is it? - Returns an Observable of data as a synchronized array of AngularFireAction<DatabaseSnapshot>[].

			Why would you use it? - When you need a list of data but also want to keep around metadata. Metadata provides you the underyling DatabaseReference and snapshot key. Having the snapshot's key around makes it easier to use data manipulation methods. This method gives you more horsepower with other Angular integrations such as ngrx, forms, and animations due to the type property. The type property on each AngularFireAction is useful for ngrx reducers, form states, and animation states.

			When would you not use it? - When you need a more complex data structure than an array or if you need to process changes as they occur. This array is synchronized with the remote and local changes in the Firebase Database.

				Limiting events
						There are four child events: "child_added", "child_changed", "child_removed", and "child_moved". Each streaming method listens to all four by default. However, your site may only be intrested in one of these events. You can specify which events you'd like to use through the first parameter of each method:

						this.itemsRef = db.list('items');
						this.itemsRef.snapshotChanges(['child_added'])
						  .subscribe(actions => {
						    actions.forEach(action => {
						      console.log(action.type);
						      console.log(action.key);
						      console.log(action.payload.val());
						    });
						  });


		stateChanges()
			What is it? - Returns an Observable of the most recent change as an AngularFireAction.

			Why would you use it? - The above methods return a singular AngularFireAction from each child event that occurs. stateChanges() emits changes as they occur rather than syncing the query order. This works well for ngrx integrations as you can build your own data structure in your reducer methods.

			When would you not use it? - When you just need a list of data. This is a more advanced usage of AngularFireDatabase.


		auditTrail()
			What is it? - Returns an Observable of AngularFireAction[] as they occur. Similar to stateChanges(), but instead it keeps around the trail of events as an array.

			Why would you use it? - This method is like stateChanges() except it is not ephemeral. It collects each change in an array as they occur. This is useful for ngrx integrations where you need to replay the entire state of an application. This also works as a great debugging tool for all applications. You can simple write db.list('items').auditTrail().subscribe(console.log) and check the events in the console as they occur.

			When would you not use it? - When you just need a list of data. This is a more advanced usage of AngularFireDatabase.


		Returning promises
		Each data operation method in the table above returns a promise. However, you should rarely need to use the completion promise to indicate success, because the realtime database keeps the list in sync.
		The promise can be useful to chain multiple operations, catching possible errors from security rules denials, or for debugging.
				const promise = db.list('items').remove();
				promise
				  .then(_ => console.log('success'))
				  .catch(err => console.log(err, 'You do not have access!'));
    */
  }

  addItem(newName: string) {
    this.itemsRef.push({ text: newName });
  }
  replaceItem(key: string, newText: string) {
  	this.itemsRef.set(key, { size: newText });
  }

  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.itemsRef.remove(key); 
  }
  deleteEverything() {
    this.itemsRef.remove();
  }

  ngOnInit() {
  }

}
