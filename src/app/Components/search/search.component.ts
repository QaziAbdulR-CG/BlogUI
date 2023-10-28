import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  of,
} from 'rxjs';
const APIKEY = 'e8067b53';

const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*',
  },
});

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild('movieSearchInput', { static: true })
  movieSearchInput!: ElementRef;
  isSearching: boolean;
  apiResponse: any;
  inputValue: any;
  fileInfo: string | undefined;

  constructor(private httpClient: HttpClient) {
    this.isSearching = false;
    this.apiResponse = [];
  }
  response = [
    {
      firstName: 'Akshay',
      lastName: 'Balasaheb Kulkarni',
      strength: '0.99',
      skills: [
        {
          name: 'Java',
          rating: 3.4,
        },
        {
          name: 'React',
          rating: 4,
        },
      ],
      profileLink: 'pdf file',
    },
    {
      firstName: 'Ghume',
      lastName: 'Balwant',
      strength: '0.99',
      skills: [
        {
          name: '.Net',
          rating: 4.4,
        },
        {
          name: 'Angular',
          rating: 5,
        },
      ],
      profileLink: 'pdf file',
    },
  ];

  ngOnInit() {
    fromEvent(this.movieSearchInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        // if character length greater then 2
        filter((res) => res.length > 2),
        // Time in milliseconds between key events
        debounceTime(1000),
        // If previous query is diffent from current
        distinctUntilChanged()
        // subscription for response
      )
      .subscribe((text: string) => {
        this.isSearching = true;

        this.searchGetCall(text).subscribe(
          (res) => {
            console.log('res', res);
            this.isSearching = false;
            this.apiResponse = res;
          },
          (err) => {
            this.isSearching = false;
            console.log('error', err);
          }
        );
      });
  }
  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.httpClient.get(
      'https://www.omdbapi.com/?s=' + term + '&apikey=' + APIKEY,
      { params: PARAMS.set('search', term) }
    );
  }
  name: string = '';
  file: any;
  getName(name: string) {
    this.name = name;
  }
  getFile(event: any) {
    this.file = event.target.files[0];
    this.fileInfo = this.file.name;
    console.log('file', this.file);

    let formData = new FormData();
    formData.set('name', this.file.name);
    formData.set('file', this.file);
    console.log(formData.get('name'));
    console.log(formData.get('file'));
    // this.httpClient.post("url", formData).subscribe((response => {}));
  }
  // rating = 3.5;
   stars(i:number) {
    return Array(Math.floor(i)).fill(0);
  }
}
