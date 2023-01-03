import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmEqualValidator( main: string, confirm: string ): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        if ( !ctrl.get(main) || !ctrl.get(confirm) ) {
            return {
                confirmEqual: 'Invalid control names'
            };
        }

		const mainValue : string = ctrl.get(main)!.value;
		const confirmValue : string = ctrl.get(confirm)!.value;

		return confirmValue === mainValue
			? null
			: {
				confirmEqual: {
					main: mainValue,
					confirm: confirmValue
				}
			}
    };
}