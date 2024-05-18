import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  auth = inject(AuthService);

  isAuthenticated: Signal<boolean> = computed(() => {
    return this.auth.user() !== null;
  });

  userEmail: Signal<null | string> = computed(() => {
    const user = this.auth.user();
    return user?.email ?? null;
  });

  constructor() {}

  logout() {
    this.auth.logout();
  }
}
