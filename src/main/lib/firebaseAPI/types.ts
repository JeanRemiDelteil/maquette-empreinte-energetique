import * as firebase from 'firebase';

interface IFirebaseDatabaseDriver {
	read(path: string): Promise<firebase.database.DataSnapshot>
	
	write(path: string, value: any): Promise<any>
	
	push(path: string, value?: any): Promise<firebase.database.ThenableReference>
	
	update(path: string, valueMap: any): Promise<any>
}
