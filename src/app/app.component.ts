import { Component } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: this.isPrompt,
    });
  }

  cancelDownload(): void {
    this.isPrompt = false;
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: this.isPrompt,
    });
  }
}
