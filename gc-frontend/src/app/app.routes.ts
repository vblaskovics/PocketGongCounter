import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CounterComponent } from './features/counter/counter.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "counters", component: CounterComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '', pathMatch: 'full' },
    //{ path: '**', component: PageNotFoundComponent },
];
