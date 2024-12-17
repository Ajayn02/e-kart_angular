import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'searchkey',
  standalone: true
})
export class SearchkeyPipe implements PipeTransform {

  transform(value: any, key: any): any {
    if(value.length==0){
      return value
    }
    if(key.length==0){
      return value
    }
    
    const searchkey=key.toLowerCase()

    const result=value.filter((item:any)=>item.title.toLowerCase().includes(searchkey))
    // console.log(result);

    return result
  }

}
