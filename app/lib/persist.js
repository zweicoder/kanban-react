import makeFinalStore from 'alt-utils/lib/makeFinalStore'

/**
 * Module to make things persist over browser sessions. Set debug = true to stop persisting.
 * @param alt       The alt instance connected to our stores
 * @param storage   The storage adapter we are using.
 * @param storeName Target store name
 */
export default function(alt, storage, storeName) {
    const finalStore = makeFinalStore(alt);

    try{
        alt.bootstrap(storage.get(storeName))
    }
    catch (e){
        console.log('Failed to bootstrap data',e)
    }

    finalStore.listen(()=>{
        if(!storage.get('debug')){
            storage.set(storeName, alt.takeSnapshot())
        }
    })
}