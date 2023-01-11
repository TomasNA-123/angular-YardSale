import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelNumber'
})
export class VowelNumbePipe implements PipeTransform {

  vowels=["A","a","E","e","I","i","O","o","U","u"];

  transform(value: string): string {
    return value.split("").map((element)=>{
      const index = this.vowels.indexOf(element);
      return index != -1 ? index : element;
    }).join("");
  }

}
