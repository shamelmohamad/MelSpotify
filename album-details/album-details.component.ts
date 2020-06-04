import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotifyService} from '../spotify.service';
import {flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
    id: string = null;
    albumDetails = null;
    tracksDetails = null;
  constructor(
      private route: ActivatedRoute,
      private spotifyService: SpotifyService,
  ) { }

  ngOnInit() {
      this.getAlbumId();
      this.getAlbum();
  }

  getAlbumId() {
    this.id = this.route.snapshot.params.id;
  }

  getAlbum() {
    this.spotifyService.searchAlbumById(this.id)
        .pipe(
            flatMap(res => {
                this.albumDetails = res;
                return this.spotifyService.searchAlbumByIdTracks(this.id)
            }),
        )
        .subscribe(res => {
            this.tracksDetails = res;
        });
  }

    viewInSpotify(url: string) {
      window.open(url);
    }

}
