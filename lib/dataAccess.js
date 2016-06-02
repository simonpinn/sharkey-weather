export function writeData(connectionString, pgNative, insertStatement, insertValues){
    var client = new pgNative.Client(connectionString);
    client.connect((err) => {
    if(err) {
        return console.error('could not connect to postgres', err);
    }
    
    client.query(insertStatement, insertValues, 
        (err, result)=> {
            if(err) {
            return console.error('error running query', err);
            }
            client.end();
        });
    });
}

export function fetchData(connectionString, pgNative, selectStatement, onComplete){
    var client = new pgNative.Client(connectionString);
    client.connect((err) => {
    if(err) {
        return console.error('could not connect to postgres', err);
    }
    
    client.query(selectStatement, 
        (err, result)=> {
            if(err) {
                return console.error('error running query', err);
            }          
            
            onComplete(result.rows);
            client.end();
        });
    });
}