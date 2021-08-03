import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-httpclient-app';

  /**
   *
   */
  constructor(public router: Router) {
  }

  GoToHome() {
    this.router.navigate(['']);
  }

  GoToAdmin() {
    this.router.navigate(['post-list']);
  }


}



