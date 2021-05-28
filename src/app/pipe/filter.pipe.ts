import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: string[], args: any=""): any {
    return value.filter(item => item.startsWith(args));
  }

}
