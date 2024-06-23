import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { PlanControllerService } from 'src/shared/core/api/plan-controller/plan-controller.service';
import { PlanDetalleDto } from 'src/shared/core/model/index';
import { PlanComponent } from 'src/shared/components/plan/plan.component';
import { LocalStorageService } from 'src/app/menu/local-storage-service.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent?: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData?: {
    action: string;
    event: CalendarEvent;
  };
  plan!: PlanDetalleDto;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(
    private dialog: MatDialog,
    private planService: PlanControllerService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    const travelId = Number(localStorage.getItem('travelId'));
    this.planService
      .findPlanesByIdViaje({ idViaje: travelId })
      .subscribe((planes: PlanDetalleDto[]) => {
        this.events = planes.map((plan) => this.transformPlanToEvent(plan));
        this.refresh.next();
      });
  }

  transformPlanToEvent(plan: PlanDetalleDto): CalendarEvent {
    this.plan = plan;
    return {
      title: plan.nombre ?? '-',
      start: new Date(plan.horario?.inicio ?? new Date()),
      end: new Date(plan.horario?.fin ?? new Date()),
      color: colors['blue'],
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      meta: {
        plan,
      },
    };
  }

   dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (isSameDay(this.viewDate, date)) {
        this.activeDayIsOpen = !this.activeDayIsOpen;
      } else {
        this.activeDayIsOpen = true;
      }

      // Cambiar la vista a semanal si la vista actual es mensual
      if (this.view === CalendarView.Month) {
        this.setView(CalendarView.Week);
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    const dialogRef = this.dialog.open(PlanComponent, { data: this.plan });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.deleted) {
        this.ngOnInit();
      }
    });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: false,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  createNewPlan() {
    const viajeid = Number(this.localStorageService.getItem('travelId'));
    this.dialog.open(PlanComponent, {
      data: { idViaje: viajeid, nombre: '', descripcion: '' },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.ngOnInit();
    });
  }
}
