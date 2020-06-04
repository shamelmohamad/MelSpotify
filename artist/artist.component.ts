import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SpotifyService } from "../spotify.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-artist",
  templateUrl: "./artist.component.html",
  styleUrls: ["./artist.component.css"]
})
export class ArtistComponent implements OnInit {
  id: string = null;
  albums$: Observable<any> = null;
  artist = null;
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getArtistId();
    this.getAlbums();
    this.getArtist();
  }

  getArtistId() {
    this.id = this.route.snapshot.params.id;
  }

  getAlbums() {
    this.albums$ = this.spotifyService.searchArtistAlbum(this.id).pipe(
      map((res: any) => {
        return res.items.filter(item => item);
      })
    );
  }

  getArtist() {
    this.spotifyService
      .searchArtist(this.id)
      .pipe()
      .subscribe(res => {
        console.log(res);
        this.artist = res;
      });
  }

  viewDetails(id: string) {
    this.router.navigate(["album", id]);
  }
}
