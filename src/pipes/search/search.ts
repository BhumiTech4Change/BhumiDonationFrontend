import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, searchText: string) {
    if(!searchText){
      return value;
    }
    searchText = searchText.toLocaleLowerCase();

    return value.filter(it => {
      console.log(it);
      let data=it.name+it.location+it.cause;
      return data.toLocaleLowerCase().includes(searchText);
    });
  }
}
