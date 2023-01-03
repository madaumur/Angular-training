import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
	name: 'stringifyName',
})
export class StringifyNamePipe implements PipeTransform {
	transform(value: { firstname: string; lastname: string }): string {
		return `${value.lastname.toUpperCase()} ${value.firstname}`
	}
}
