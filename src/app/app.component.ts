import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  NgbModal,
  NgbModalConfig,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServiceWorkerModule, NgbModalConfig, NgbModal, NgbActiveModal],
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'pwa-project';
  isPrompt: boolean = false;
  subscription!: Subscription;
  browserRefresh: boolean = false;

  @ViewChild('mymodal') mymodal: ElementRef | undefined;
  firsttime: string | null;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private router: Router
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.browserRefresh = !router.navigated;
      }
    });
    this.firsttime = localStorage.getItem('firsttime');

    if (
      localStorage.getItem('firsttime') == null ||
      localStorage.getItem('firsttime') == undefined
    ) {
      this.firsttime = 'true';
      localStorage.setItem('firsttime', 'true');
    } else localStorage.setItem('firsttime', 'false');
  }

  onSubmit(): void {
    this.isPrompt = true;
    if (this.isPrompt === true) {
      navigator.serviceWorker.register('ngsw-worker.js');
    }
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem('firsttime') === 'true') {
      this.open(this.mymodal);
    }
  }

  ngOnInit(): void {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }

  open(mymodal: any) {
    this.modalService.open(mymodal);
  }
}
