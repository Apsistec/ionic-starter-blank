import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonList,
  IonLabel,
  IonGrid,
  IonCol,
  IonRow,
  IonHeader,
  IonButton,
  IonInput,
  IonToolbar,
  IonTitle,
  IonContent,
  IonDatetime,
  IonModal,
  IonItem,
  IonButtons,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonList,
    IonLabel,
    IonGrid,
    IonCol,
    IonRow,
    IonDatetime,
    IonModal,
    IonHeader,
    IonButton,
    IonInput,
    IonToolbar,
    IonItem,
    IonTitle,
    IonContent,
    IonButtons,
  ],
})
export class HomePage {
  @ViewChild('datetime') datetime!: IonDatetime;
  presentingElement: HTMLElement | null = null;

  selectedDate: string = '';
  minDate: string;
  maxDate: string;
  showResults: boolean = false;

  dateResults: { label: string; value: string }[] = [];

  constructor() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString();

    // Current year + 5 years
    const maxYear = new Date();
    maxYear.setFullYear(maxYear.getFullYear() + 5);
    this.maxDate = maxYear.toISOString();
  }

  ngOnInit() {
    // Set the presenting element to the ion-app element for better modal accessibility
    this.presentingElement = document.querySelector('ion-app');
  }

  // Format the selected date for display in the input field
  displayDateFormat(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  onSubmit() {
    if (!this.selectedDate) {
      return;
    }

    this.dateResults = [];
    const selectedDateObj = new Date(this.selectedDate);

    // Today's date
    const today = new Date();
    this.dateResults.push({
      label: 'Today',
      value: today.toLocaleDateString(),
    });

    // Yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.dateResults.push({
      label: 'Yesterday',
      value: yesterday.toLocaleDateString(),
    });

    // 10 days past selected date
    const tenDaysPast = new Date(selectedDateObj);
    tenDaysPast.setDate(tenDaysPast.getDate() - 10);
    this.dateResults.push({
      label: '10 days past selected date',
      value: tenDaysPast.toLocaleDateString(),
    });

    // 1 year past selected date
    const oneYearPast = new Date(selectedDateObj);
    oneYearPast.setFullYear(oneYearPast.getFullYear() - 1);
    this.dateResults.push({
      label: '1 year past selected date',
      value: oneYearPast.toLocaleDateString(),
    });

    this.showResults = true;
  }
}
