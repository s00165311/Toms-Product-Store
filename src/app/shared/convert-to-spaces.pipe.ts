import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'convertToSpaces' })

export class ConvertToSpaces implements PipeTransform {

    public transform(value: string, character: string): string {
        return value.replace(character, ' ');
    }
}