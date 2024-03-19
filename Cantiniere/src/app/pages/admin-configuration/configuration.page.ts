import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Configuration } from 'src/app/interfaces/configuration';
import { ConfigurationService } from 'src/app/services/admin-configuration/configuration.service';

@Component({
  selector: 'app-admin-config',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class AdminConfigPage implements OnInit {

  selectedConfigId = 1;

  configForm = new FormGroup({
    quantity: new FormControl(500, [Validators.required, Validators.maxLength(3)]),
    hours: new FormControl(10, [Validators.required, Validators.maxLength(2)]),
    minutes: new FormControl(30, [Validators.required, Validators.maxLength(2)]),
  });

  constructor(
      private configurationService: ConfigurationService,
      private toastController: ToastController,
    ){}

  ngOnInit() {
    this.configurationService.getConfigurationById(this.selectedConfigId).subscribe(
      res => this.setForm(res),
      error => console.error(error),
    );
  }

  /**
   * Submit configuration's modifications to the database
   */
  onSubmit(){
    if(!this.configForm.valid){
      console.error("Formulaire invalide");
      return;
    }

    const config = this.getFormConfig();
    this.configurationService.updateConfiguration(config)?.subscribe(
      res => this.createUpdateToast(true),
      error => this.createUpdateToast(false),
    );
  }

  /**
   * Set form value based on a given configuration
   * @param config The configuration to get values from
   */
  setForm(config: Configuration){
    if(!config.orderTimeLimit || !config.maximumOrderPerDay){
      return;
    }
    this.configForm.setValue(
      {
      quantity: config.maximumOrderPerDay,
      hours: parseInt(config.orderTimeLimit.split(':')[0]),
      minutes: parseInt(config.orderTimeLimit.split(':')[1]),
    });
  }

  /**
   * Get a configuration from form input values
   * @returns Returns a configuration object created from input values
   */
  getFormConfig(): Configuration{
    const orderTimeLimit = `${this.configForm.controls.hours.value}:${this.configForm.controls.minutes.value}:00`
    return {
      id: this.selectedConfigId,
      maximumOrderPerDay: this.configForm.controls.quantity.value,
      orderTimeLimit: orderTimeLimit,
    } as Configuration;
  }

  /**
   * Create a toaster to notify the user if the update operation was successful or not
   * @param success Is the operation successful
   */
  async createUpdateToast(success: boolean) {
    const message = success ? 'La configuration a bien été mise à jour !' : 'Une erreur est survenue durant la modification.'
    const color = success ? 'success' : 'danger';
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      color: color
    });

    await toast.present();
  }
}
