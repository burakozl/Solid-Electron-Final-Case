import { Component, OnInit } from '@angular/core';
import { SearchTextService } from 'src/app/services/search-text.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchText:string = '';//ngmodel ile inputdan alınacak değeri bu deşikene atar...

  constructor(
    private searchTextService:SearchTextService//oluşturulan servis'e yakaladığı değeri göndericek...
    ) { }

  ngOnInit(): void {
    this.searchTextService.sendData(this.searchText);//observable aracılığıyla subscribers'lara text'i gönder
    this.onSearchTextChanged();//bu metot ile her değişiklik olduğunda yakalaya bilmek için html tarafında input eventi ile ilgili inputu yalayıp tekrar service içersindeki sendData metoduna gönderir...
  }
  onSearchTextChanged() {
    this.searchTextService.sendData(this.searchText);
  }

}
