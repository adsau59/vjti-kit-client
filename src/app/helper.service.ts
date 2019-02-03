import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(public http: HttpClient) { }

  /**
   * Creates an observable which returns random image url form /r/PewdiepieSubmission subreddit
   */
  GetMemeUrl():Observable<string> {
    return this.http.get("https://www.reddit.com/r/PewdiepieSubmissions/.json?&show=all&limit=100").pipe(map((json:any) => {

      let imageType;

      let initPos = Math.round(Math.random()*90);

      for (let i = initPos, x = json.data.children.length; i < x; i++) {
        
        imageType = json.data.children[i].data.url.slice(-3);

        if (imageType === "jpg" || imageType === "png") {
          return json.data.children[i].data.url;
        }
      }

      return null;

    }));
  }
}
