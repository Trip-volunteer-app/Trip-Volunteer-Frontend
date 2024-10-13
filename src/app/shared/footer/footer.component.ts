import { Component, OnInit} from '@angular/core';
import { ContactusService } from '../../Services/contactus.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  constructor(
    public contact: ContactusService,
  ) {}

  ngOnInit(): void {
    this.contact.getWebsiteInfo();

  }
}
