const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


let inputStream = Fs.createReadStream('IMDb names.csv', 'utf8');
let inputMovies = Fs.createReadStream('DisTable.csv', 'utf8');
let listAllCrew = []
let data = []
let header = [
    {avg_vote: 'avg_vote'},
    {duration: 'duration'},
    {total_votes: 'total_votes'},
    {TARGET: 'TARGET'},
    {imdb_title_id: 'imdb_title_id'},
    {title: 'title'},
    {original_title: 'original_title'},
    {year: 'year'},
    {date_published: 'date_published'},
    {genre: 'genre'},
    {country: 'country'},
    {language: 'language'},
    {director: 'director'},
    {writer: 'writer'},
    {production_company: 'production_company'},
    {actors: 'actors'},
    {description: 'description'},
    {budget: 'budget'},
    {usa_gross_income: 'usa_gross_income'},
    {worlwide_gross_income: 'worlwide_gross_income'},
    {Selected: 'Selected'},
    {'Selected (1)': 'Selected (1)'}
]

inputStream
    .pipe(new CsvReadableStream({parseNumbers: true, parseBooleans: true, trim: true, asObject: true}))
    .on('data', function (row) {
        //console.log('A row arrived: ', row.writer)
        //listAllCrew.push(row.name)
        header.push({[row.name]: row.name})
    })
    .on('end', function (data) {
        //console.log(listAllCrew)
        console.log('No more rows!');
        //console.log(header)
        readIMDBMovies()
    });

let v = 0

const readIMDBMovies = () => {
    inputMovies
        .pipe(new CsvReadableStream({parseNumbers: true, parseBooleans: true, trim: true, asObject: true}))
        .on('data', function (row) {
            //console.log(row)
            if (v === 3) {
                v++
                //console.log(row)
                let actorList = transformToList(row.actors)
                console.log(actorList)
                for (let i = 22; i < header.length; i++) {
                    if(actorList.includes(Object.keys(header[i])[0])){
                        console.log(Object.keys(header[i])[0])
                    }
                    row[Object.keys(header[i])[0]] = actorList.includes(Object.keys(header[i])[0]) ? 1 : 0

                }
                //console.log(Object.keys(row))

                console.log('aaaaaa')

                //console.log(row)
                data.push(row)
                const csvWriter = createCsvWriter({
                    path: 'out.csv',
                    header
                });

                csvWriter
                    .writeRecords(data)
                    .then(() => console.log('The CSV file was written successfully'));

            } else {
                v++
            }
        })
        .on('end', function (data) {
            console.log('No more rows!');
        });
}

const transformToList = (string) => {
    const re = /,\s/
    let ar = string.split(re)
    //console.log(ar)
    return ar
}
