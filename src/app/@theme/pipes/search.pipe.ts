import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
 
    transform(items: any[], term: string): any[] {
        if (!items) return [];
        if (!term) return items;
        
        return items.filter(it => {
            return it.fullname.toLowerCase().includes(term.toLowerCase())
                || it.username.toLowerCase().includes(term.toLowerCase());
        });

        //return items.filter(item => item.id.indexOf(term) !== -1);
    }

}
