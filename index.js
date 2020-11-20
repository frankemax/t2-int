const Fs = require('fs');
const CsvReadableStream = require('csv-reader');

let inputStream = Fs.createReadStream('DisTable.csv', 'utf8');

inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true ,asObject:true}))
    .on('data', function (row) {
        console.log('A row arrived: ', row.writer)
        transformToList(row.writer)
    })
    .on('end', function (data) {
        console.log('No more rows!');
    });

const saveInMemory = () => {

}

const transformToList = (string) =>{
    const re = /,\s/
    let ar = string.split(re)
    console.log(ar)
}
