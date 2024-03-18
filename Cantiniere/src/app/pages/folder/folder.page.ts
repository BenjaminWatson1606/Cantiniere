import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PopUpOrderComponent } from 'src/app/components/pop-up-order/pop-up-order.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  constructor(
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    
  }

  async openOrderModal(day: string) {
    const modal = await this.modalController.create({
      component: PopUpOrderComponent,
      cssClass: 'custom-modal-background',
      componentProps: {
        day: day,
      },
    });
    return await modal.present();
  }

  


}
