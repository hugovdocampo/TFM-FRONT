import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html'
})
export class EventDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: CalendarEvent; action: string; }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
