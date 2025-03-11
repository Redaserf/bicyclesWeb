import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuestHomeComponent } from '../../guest/guest-home/guest-home.component';
import { FooterComponent } from '../../global/footer/footer.component';
import { GuestSectionBiciComponent } from "../../guest/guest-section-bici/guest-section-bici.component";

@Component({
  selector: 'app-guest-layout',
  imports: [RouterOutlet, GuestHomeComponent, FooterComponent, GuestSectionBiciComponent, GuestSectionBiciComponent],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.css'
})
export class GuestLayoutComponent {

}
