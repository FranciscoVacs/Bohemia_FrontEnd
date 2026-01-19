import { Component, inject, signal, computed, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public modalService = inject(ModalService);
  public authService = inject(AuthService);

  // Dropdown state
  isDropdownOpen = signal(false);

  // Computed initials (first letter of name + first letter of surname)
  userInitials = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return '';
    const nameInitial = user.userName?.charAt(0).toUpperCase() || '';
    const surnameInitial = user.userSurname?.charAt(0).toUpperCase() || '';
    return `${nameInitial}${surnameInitial}`;
  });

  toggleDropdown(): void {
    this.isDropdownOpen.update(v => !v);
  }

  closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  logout(): void {
    this.closeDropdown();
    this.authService.logout();
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-dropdown-container')) {
      this.closeDropdown();
    }
  }
}
