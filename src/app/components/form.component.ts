import { Component, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchCriteria, RATING } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  private fb = inject(FormBuilder)
  protected form!: FormGroup

  @Output()
  onSearch = new Subject<SearchCriteria>()

  FORM_RATING = RATING

  ngOnInit(): void {
    this.form = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      q: this.fb.control<string>('', [ Validators.required ]),
      limit: this.fb.control<number>(5),
      rating: this.fb.control<string>(this.FORM_RATING[0], Validators.required)
    })
  }

  processForm() {
    const values: SearchCriteria = this.form.value

    console.info('>>> form values: ', values)

    // Fire event
    this.onSearch.next(values)
  }

  clearForm() {
    this.form.reset()
    this.form = this.createForm()
  }

  invalidForm(): boolean {
    return this.form.invalid
  }
}
