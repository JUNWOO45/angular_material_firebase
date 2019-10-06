import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() headerNavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription

  constructor(private authSerice: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authSerice.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  onToggleHeader() {
    this.headerNavToggle.emit();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
