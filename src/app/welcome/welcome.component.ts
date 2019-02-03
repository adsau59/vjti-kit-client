import { Component, OnInit } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

/**
 * Home Page
 */
export class WelcomeComponent implements OnInit {

  memeUrl: string;

  memeLoaded: boolean = false;

  constructor(public help: HelperService) { }

  /**
   * loads the image url into the output string
   */
  ngOnInit() {
    this.help.GetMemeUrl().subscribe(
      url => {
        this.memeUrl = url;
      }
    );
  }

  memeHasLoaded(){
    this.memeLoaded = true;
  }

}
