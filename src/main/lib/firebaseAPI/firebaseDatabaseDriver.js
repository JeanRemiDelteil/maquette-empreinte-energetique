export const dbRead = (ref) => (path) => ref.child(path).once('value');
export const dbWrite = (ref) => (path, value) => ref.child(path).set(value);
export const dbPush = (ref) => (path, value) => ref.child(path).push(value);
export const dbUpdate = (ref) => (path, valueMap) => ref.child(path).update(valueMap);
export const dbDelete = (ref) => (path) => ref.child(path).set(null);


/**
 * @param {firebase.database.Reference} ref
 * @return {IFirebaseDatabaseDriver}
 */
export const driver = (ref) => ({
	read: dbRead(ref),
	write: dbWrite(ref),
	push: dbPush(ref),
	update: dbUpdate(ref),
	delete: dbDelete(ref),
});
