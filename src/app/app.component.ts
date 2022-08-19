import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  NgbModal,
  NgbModalConfig,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServiceWorkerModule, NgbModalConfig, NgbModal, NgbActiveModal],
})
export class AppComponent implements AfterViewInit {
  title = 'pwa-project';
  isPrompt: boolean = false;

  @ViewChild('mymodal') mymodal: ElementRef | undefined;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  onSubmit(): void {
    this.isPrompt = true;
    if (this.isPrompt === true) {
      this.activeModal.close();
      // this.modalService.close();
      navigator.serviceWorker.register('ngsw-worker.js');
    }
  }

  ngAfterViewInit(): void {
    this.open(this.mymodal);
  }

  open(mymodal: any) {
    this.modalService.open(mymodal);
  }
}
