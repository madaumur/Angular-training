import { ComplexFormService } from './../../services/complex-form.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable, map, startWith, tap } from 'rxjs';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

@Component({
	selector: 'app-complex-form',
	templateUrl: './complex-form.component.html',
	styleUrls: ['./complex-form.component.scss']
})

export class ComplexFormComponent implements OnInit {

	loading: boolean = false
	mainForm!: FormGroup;
	personalInfoForm!: FormGroup;
	contactPreferenceCtrl!:FormControl;

	emailCtrl!: FormControl;
	confirmEmailCtrl!: FormControl;
	emailForm!: FormGroup;

	phoneCtrl!: FormControl;

	passwordCtrl!: FormControl;
	confirmPasswordlCtrl!: FormControl;
	loginInfoForm!: FormGroup;

	showEmailCtrl$!: Observable<boolean>
	showPhoneCtrl$!: Observable<boolean>
	showEmailError$!: Observable<boolean>
	showPasswordError$!: Observable<boolean>

	constructor( private formBuilder: FormBuilder, private complexFormService: ComplexFormService) {}

	ngOnInit(): void
	{
		this.initFormControl()
		this.initFormObservable()
		this.initMainForm()
	}

	private initFormControl (): void
	{
		// part 1 - Informations Personelles
		this.personalInfoForm = this.formBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required]
		})
		// part 2 - Préférences de contact
		this.contactPreferenceCtrl = this.formBuilder.control('email', Validators.required ) // Validator Facultatif
		// part 2.A - Email
		this.emailCtrl = this.formBuilder.control('')
		this.confirmEmailCtrl = this.formBuilder.control('')
		this.emailForm = this.formBuilder.group({
			email: this.emailCtrl,
			confirmEmail: this.confirmEmailCtrl
        }, {
			validators: [ confirmEqualValidator ('email', 'confirmEmail') ], updateOn: 'blur'
		});
		// part 2.B - Téléphone
		this.phoneCtrl = this.formBuilder.control('')
		// part 3 - Informations de connexion
		this.passwordCtrl = this.formBuilder.control('', Validators.required )
		this.confirmPasswordlCtrl = this.formBuilder.control('', Validators.required )
		this.loginInfoForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: this.passwordCtrl,
			confirmPassword: this.confirmPasswordlCtrl
		},{
			validators: [ confirmEqualValidator ('password', 'confirmPassword') ], updateOn: 'blur'
		});
	}

	private initMainForm (): void
	{
		this.mainForm = this.formBuilder.group({
			personalInfo: this.personalInfoForm,
			contactPreference: this.contactPreferenceCtrl,
			email: this.emailForm,
			phone: this.phoneCtrl,
			loginInfo: this.loginInfoForm
		})
	}

	private initFormObservable (): void
	{
		this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
			startWith(this.contactPreferenceCtrl.value),
			map(preference => preference === 'email'),
			tap(showEmailCtrl => { this.setEmailValiators( showEmailCtrl ) })
		)

		this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
			startWith(this.contactPreferenceCtrl.value),
			map(preference => preference === 'phone'),
			tap(showPhoneCtrl => { this.setPhoneValiators( showPhoneCtrl ) })
		)

		this.showEmailError$ = this.emailForm.statusChanges.pipe(
			map(status => status === 'INVALID'
			&& this.emailCtrl.value
			&& this.confirmEmailCtrl.value
			&& this.emailForm.hasError('confirmEqual'))
		)

		this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
			map(status => status === 'INVALID'
				&& this.passwordCtrl.value
				&& this.confirmPasswordlCtrl.value
				&& this.loginInfoForm.hasError('confirmEqual'))
		)
	}

	private setEmailValiators ( showEmailCtrl : boolean ): void
	{
		if (showEmailCtrl) {
			this.emailCtrl.addValidators([ Validators.required, Validators.email ]);
			this.confirmEmailCtrl.addValidators([ Validators.required, Validators.email ]);
		}
		else {
			this.emailCtrl.clearValidators();
			this.confirmEmailCtrl.clearValidators();
		}

		this.emailCtrl.updateValueAndValidity();
		this.confirmEmailCtrl.updateValueAndValidity();

		// ne marche pas si on remplace emailCtrl & confirmEmailCtrl par emailForm pour globalisé le truc
	}

	private setPhoneValiators ( showPhoneCtrl : boolean ): void
	{
		if (showPhoneCtrl) {
			this.phoneCtrl.addValidators([ Validators.required, Validators.minLength(10), Validators.maxLength(10) ]);
		}
		else {
			this.phoneCtrl.clearValidators();
		}

		this.phoneCtrl.updateValueAndValidity();
	}

	onSubmitForm(): void
	{
		this.loading = true;
		this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
			tap(saved => {
				this.loading = false;
				if (saved) {
					this.resetForm()
				}
				else{
					console.log('Echec de l\'enregistrement')
				}
			})
		).subscribe()
	}

	private resetForm(): void
	{
		this.mainForm.reset();
		this.contactPreferenceCtrl.patchValue('email')
	}

	getFormControlErrorText( ctrl : AbstractControl ): string {
		if ( ctrl.hasError('required') ) {
			return 'Ce champs est requis'
		}
		else if ( ctrl.hasError('email') ) {
			return 'Merci d\'entrer une adresse email valide'
		}
		else if ( ctrl.hasError('minlength') ) {
			return `'Ce champs ne contient pas assez de caractères'`
		}
		else if ( ctrl.hasError('maxlength') ) {
			return 'Ce champs contient trop de caractères'
		}
		else {
			return 'Ce champs contient une erreur'
		}
	}
}
