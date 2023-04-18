import { Component } from '@angular/core';
import { ChequeoService } from 'src/app/utils/chequeo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  get username() {
    return this.checkSvc.token;
  }

  constructor(private checkSvc: ChequeoService) {}
}
