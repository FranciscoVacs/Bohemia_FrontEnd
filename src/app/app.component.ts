import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventService } from './services/event.service';
import { Event } from './models/event.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, HeroComponent, EventCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  nextEvent: Event | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadNextEvent();
  }

  loadNextEvent() {
    this.eventService.getFutureEvents().subscribe({
      next: (event) => {
        this.nextEvent = event;
      },
      error: (err) => {
        console.error('Error cargando evento:', err);
      }
    });
  }
}