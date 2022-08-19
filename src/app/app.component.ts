import { Component } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServiceWorkerModule],
})
export class AppComponent {
  title = 'pwa-project';
  isPrompt: boolean = false;

  onSubmit(): void {
    this.isPrompt = true;
    if (this.isPrompt) {
      navigator.serviceWorker.register('ngsw-worker.js');
    }
  }

  cancelDownload(): void {
    this.isPrompt = false;
  }
}
