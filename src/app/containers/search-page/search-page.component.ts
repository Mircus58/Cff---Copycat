import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';
import { RouteResponse } from '../../../interfaces';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-search-page',
  imports: [CommonModule, FormatDatePipe,ReactiveFormsModule, IonicModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  private formatDate = inject(FormatDatePipe);
  form: FormGroup;

  public result : RouteResponse | undefined;

  constructor(
    private fb: FormBuilder,
    private api: ApiCallService,
  ) {
    this.form = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

 async onSubmit(): Promise<void> {
  if (this.form.valid) {
    const raw = this.form.value;

    const formattedParams = {
      ...raw,
      date: this.formatDate.transform(raw.date) // 👈 transforme ISO → 4/8/2025
    };

    const result = await this.api.getRoute(formattedParams);
    console.log(result);
    this.result = result;
  }
}
}