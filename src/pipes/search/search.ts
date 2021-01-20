import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, searchText: string) {
    if(!searchText){
      return value;
    }
    searchText = searchText.toLocaleLowerCase();

    return value.filter(it => {
      console.log(it);
      let data=it.name+it.bio+it.domain+it.designation;
      return data.toLocaleLowerCase().includes(searchText);
    });
  }
}
