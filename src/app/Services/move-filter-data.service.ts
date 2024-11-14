import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoveFilterDataService {
  constructor() { }
  private tripData: any = {};
  setTripData(data: any) {
    this.tripData = data;
  }

  getTripData() {
    return this.tripData;
  }

  activeTab: string = 'trip';

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getActiveTab(): string {
    return this.activeTab;
  }
}