import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

@Injectable()
export class TestProvider {

  events: any[] = [];
  speakers:  any[] = [];

  constructor(private http: HttpClient) {}

  getEvents(){
    return this.http.get('assets/data/events.json');
  }

  getSpeakers(){
    return this.http.get('assets/data/speakers.json');
  }

  getEventsWithSpeaker(){
    return Observable.forkJoin(
      this.getEvents(),
      this.getSpeakers()
    )
    .map(res => this.join( res[0], res[1] ))
  }

  join(events, speakers){
    return events.map(event => {
      return speakers
      .filter(speaker => speaker.id == event.speaker_id)
      .map(speaker => {
        return {
          id: event.id,
          title: event.title,
          date: event.date,
          speaker_id: event.speaker_id,
          speaker: speaker
        }
      })
    }).reduce((a,b) =>{
      return a.concat(b);
    }, []);

  }

}
