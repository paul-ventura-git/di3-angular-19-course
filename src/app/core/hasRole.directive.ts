import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User, UserRole } from '../../../backend-vet';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Structural directive that shows or hides elements based on the user's roles.
 * It accepts an array of roles and displays the element if the user has at least one of the specified roles.
 * Usage:
 * <div *hasRole="['admin', 'veterinary']">This content is only visible to admins and veterinarians.</div>
 */
@Directive({
  selector: '[hasRole]',
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  private user = toSignal(inject(AuthService).currentUser$);

  roles = input.required<UserRole[]>({
    alias: 'hasRole',
  });

  constructor() {
    effect(() => {
      const user = this.user();
      const roles = this.roles();

      this.viewContainerRef.clear();

      if (user && roles.length > 0 && this.hasRole(user, roles)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }

  hasRole(user: User, roles: UserRole[]) {
    return user.roles.some((role) => roles.includes(role));
  }
}
