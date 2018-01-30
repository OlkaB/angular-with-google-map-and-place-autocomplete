import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-fb-database',
  templateUrl: './fb-database.component.html',
  styleUrls: ['./fb-database.component.css'],
  providers: [AngularFireDatabase]
})
export class FbDatabaseRetrieveObjectComponent implements OnInit {

  items: Observable<any[]>;
  itemRef: AngularFireObject<any>; 


  constructor(db: AngularFireDatabase) {
    this.itemRef = db.object('skirts');
    this.items = this.itemRef.valueChanges(); //AngularFire valueChanges() unwraps the Firebase DataSnapshot by default, but you can get the data as the original snapshot by using the snapshotChanges() option.
	    /*this.itemRef.snapshotChanges().subscribe(action => {
			  console.log(action.type);
			  console.log(action.key)
			  console.log(action.payload.val())
			});*/
  }

  //Because AngularFireObject synchronizes objects from the realtime database, sorting will have no effect for queries that are not also limited by a range. For example, when paginating you would provide a query with a sort and filter. Both the sort operation and the filter operation affect which subset of the data is returned by the query; however, because the resulting object is simply json, the sort order will not be preseved locally. Hence, for operations that require sorting, you are probably looking for a list

  save(newName: string) {
    this.itemRef.set({ name: newName });
    console.log("Saved: ", this.itemRef);
  }
  update(newSize: string) {
    this.itemRef.update({ size: newSize });
    console.log("Updated: ", this.itemRef);
  }
  delete() {
    this.itemRef.remove();
    console.log("Deleted: ", this.itemRef);
  }


  ngOnInit() {
  	console.log("itemRef ", this.itemRef)
  }

  /*
	The table below highlights some of the common methods on the AngularFireObject.

	method	
	
	set(value: T)	Replaces the current value in the database with the new value specified as the parameter. This is called a destructive update, because it deletes everything currently in place and saves the new value.
		const itemRef = db.object('item');
		itemRef.set({ name: 'new name!'});
	
	update(value: T)	Updates the current value with in the database with the new value specified as the parameter. This is called a non-destructive update, because it only updates the values specified. Only objects are allowed for updates, not primitives. This is because using an update with a primitive is the exact same as doing a .set() with a primitive.
		const itemRef = db.object('item');
		itemRef.update({ age: newAge });
	
	remove()	Deletes all data present at that location. Same as calling set(null).
		const itemRef = db.object('item');
		itemRef.remove();


	Each data operation method in the table above returns a promise. However, you should rarely need to use the completion promise to indicate success, because the realtime database keeps the object in sync.

	The promise can be useful to chain multiple operations, catching possible errors from security rules denials, or for debugging.

	const promise = db.object('item').remove();
	promise
	  .then(_ => console.log('success'))
	  .catch(err => console.log(err, 'You dont have access!'));
  */

}
