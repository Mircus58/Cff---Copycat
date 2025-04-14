import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallService } from '../../services/api-call.service';
import { RouteResponse } from '../../../interfaces';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

// Ionic standalone components
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonText,
  IonButton,
} from '@ionic/angular/standalone';


const ui = [
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonText,
  IonButton,
];

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormatDatePipe,
    ...ui, 
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  private formatDate = inject(FormatDatePipe);
  form: FormGroup;

  public result: RouteResponse | undefined;

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
        date: this.formatDate.transform(raw.date) // 👈 ISO → DD/MM/YYYY
      };

      const result = await this.api.getRoute(formattedParams);
      console.log(result);
      this.result = result;
    }
  }
}
