import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  images_LoginPage = [
    { src: 'assets/images/Login/img1.png', label: 'Login Page' },
    { src: 'assets/images/Login/img2.png', label: 'Placeholder' },
    { src: 'assets/images/Login/img3.png', label: 'Field Validation' }
  ];

  images_NoPermissionUserDetails = [
    { src: 'assets/images/NoPermissionUserDetails/img1.png', label: 'Login Page' },
    { src: 'assets/images/NoPermissionUserDetails/img2.png', label: 'Placeholder' },
    { src: 'assets/images/NoPermissionUserDetails/img3.png', label: 'Field Validation' }
  ];

  images_PermissionUserDetails = [
    { src: 'assets/images/PermissionUserDetails/img1.png', label: 'Login Page' },
    { src: 'assets/images/PermissionUserDetails/img2.png', label: 'Placeholder' },
    { src: 'assets/images/PermissionUserDetails/img3.png', label: 'Field Validation' }
  ];

  activeImagePreview: any;
  currentIndex = 0;

  openModal(index: number, page: string) {

    this.currentIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage') as HTMLImageElement;
    const imageLabel = document.getElementById('imageLabel') as HTMLElement;

    if (modal && modalImage && imageLabel) {
      modal.classList.add('active');
      switch (page) {
        case "images_LoginPage":
          modalImage.src = this.images_LoginPage[index].src;
          imageLabel.textContent = this.images_LoginPage[index].label;
          break;
        case "images_NoPermissionUserDetails":
          modalImage.src = this.images_NoPermissionUserDetails[index].src;
          imageLabel.textContent = this.images_NoPermissionUserDetails[index].label;
          break;
        case "images_PermissionUserDetails":
          modalImage.src = this.images_PermissionUserDetails[index].src;
          imageLabel.textContent = this.images_PermissionUserDetails[index].label;
          break;
        case "ProfilePage":
          modalImage.src = this.images_LoginPage[index].src;
          imageLabel.textContent = this.images_LoginPage[index].label;
          break;
        case "ContactPage":
          modalImage.src = this.images_LoginPage[index].src;
          imageLabel.textContent = this.images_LoginPage[index].label;
          break;
        default:
          console.log("Invalid page");
          break;
      }
      this.activeImagePreview = page;
    }
  }

  closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) modal.classList.remove('active');
  }

  prevImage(page: string) {

    let lengthOfImage = 0;
    switch (page) {
      case "images_LoginPage":
        lengthOfImage = this.images_LoginPage.length;
        break;
      case "images_NoPermissionUserDetails":
        lengthOfImage = this.images_NoPermissionUserDetails.length;
        break;
      case "images_PermissionUserDetails":
        lengthOfImage = this.images_PermissionUserDetails.length;
        break;
      case "ProfilePage":

        break;
      case "ContactPage":

        break;
      default:
        console.log("Invalid page");
        break;
    }
    this.currentIndex = (this.currentIndex - 1 + lengthOfImage) % lengthOfImage;
    this.updateModalImage(page);
  }

  nextImage(page: string) {

    let lengthOfImage = 0;
    switch (page) {
      case "images_LoginPage":
        lengthOfImage = this.images_LoginPage.length;
        break;
      case "images_NoPermissionUserDetails":
        lengthOfImage = this.images_NoPermissionUserDetails.length;
        break;
      case "images_PermissionUserDetails":
        lengthOfImage = this.images_PermissionUserDetails.length;
        break;
      case "ProfilePage":

        break;
      case "ContactPage":

        break;
      default:
        console.log("Invalid page");
        break;
    }
    this.currentIndex = (this.currentIndex + 1) % lengthOfImage;
    this.updateModalImage(page);
  }

  updateModalImage(page: string) {

    const modalImage = document.getElementById('modalImage') as HTMLImageElement;
    const imageLabel = document.getElementById('imageLabel') as HTMLElement;
    if (modalImage && imageLabel) {
      switch (page) {
        case "images_LoginPage":
          modalImage.src = this.images_LoginPage[this.currentIndex].src;
          imageLabel.textContent = this.images_LoginPage[this.currentIndex].label;
          break;
        case "images_NoPermissionUserDetails":
          modalImage.src = this.images_NoPermissionUserDetails[this.currentIndex].src;
          imageLabel.textContent = this.images_NoPermissionUserDetails[this.currentIndex].label;
          break;
        case "images_PermissionUserDetails":
          modalImage.src = this.images_PermissionUserDetails[this.currentIndex].src;
          imageLabel.textContent = this.images_PermissionUserDetails[this.currentIndex].label;
          break;
        case "ProfilePage":
          modalImage.src = this.images_LoginPage[this.currentIndex].src;
          imageLabel.textContent = this.images_LoginPage[this.currentIndex].label;
          break;
        case "ContactPage":
          modalImage.src = this.images_LoginPage[this.currentIndex].src;
          imageLabel.textContent = this.images_LoginPage[this.currentIndex].label;
          break;
        default:
          console.log("Invalid page");
          break;
      }
    }
  }
}
