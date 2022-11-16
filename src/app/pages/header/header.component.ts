import { Component, OnInit } from '@angular/core';
import { SearchTextService } from 'src/app/services/search-text.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchText:string = '';
  constructor(private searchTextService:SearchTextService) { }

  ngOnInit(): void {
    this.searchTextService.sendData(this.searchText);
    this.onSearchTextChanged();
  }
  onSearchTextChanged() {
    this.searchTextService.sendData(this.searchText);
  }

}
