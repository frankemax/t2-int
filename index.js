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
        header.push({[row.name]:row.name})
        
    })
    .on('end', function (data) {
        //console.log(listAllCrew)
        console.log('No more rows!');
        console.log(header)
        readIMDBMovies()
    });

const readIMDBMovies = () => {
    inputMovies
        .pipe(new CsvReadableStream({parseNumbers: true, parseBooleans: true, trim: true, asObject: true}))
        .on('data', function (row) {
            data.push(row)
    
            console.log(row)
            let actorList = transformToList(row.actors)
        })
        .on('end', function (data) {
            console.log(listAllCrew)
            console.log('No more rows!');
            data[0].for
            const csvWriter = createCsvWriter({
                path: 'path/to/file.csv',
                header: [
                    {id: 'name', title: 'NAME'},
                    {id: 'lang', title: 'LANGUAGE'}
                ]
            });
            
            
        });
    
}


const transformToList = (string) => {
    const re = /,\s/
    let ar = string.split(re)
    //console.log(ar)
    return ar
}
