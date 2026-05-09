import { Component, OnInit } from '@angular/core';
import { Friend, FriendsService } from './services/friends.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'gender'];
  friends: Friend[] = [];

  lastChange: any = null;

  constructor(
    private friendsService: FriendsService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.loadFriends();

    this.socketService.escucharCambios().subscribe((data) => {
      this.lastChange = data;
      this.loadFriends();
    });
  }

  loadFriends(): void {
    this.friendsService.getFriends().subscribe((data) => {
      this.friends = data;
    });
  }
}