import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private event: EventsService) { }

  events = [];
  ngOnInit() {
    this.getEvents();
  }


  getEvents() {
    this.event.getEvents().
    subscribe(
      res => this.events = res,
      err => console.log(err)
    );
  }
}
