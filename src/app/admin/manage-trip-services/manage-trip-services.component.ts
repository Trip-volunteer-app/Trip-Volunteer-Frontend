import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
/// <reference types="@types/google.maps" />
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/Services/location.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-manage-trip-services',
  templateUrl: './manage-trip-services.component.html',
  styleUrls: ['./manage-trip-services.component.css']
})
export class ManageTripServicesComponent implements OnInit {
  @ViewChild('callUpdateDialog') updateDialog !: TemplateRef<any>;
  @ViewChild('callOptionalDialog') optionalDialog !: TemplateRef<any>;

  tripId!: number;
  showAddServiceForm = false;
  selectedServices: any[] = [];
  Services: any = [];
  sortedServices = [];
  previousServices: any = [];
  paginatedServices: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;
  selectedServicesDetails: any[] = [];
  servicesNotInTrip: any[] = [];

  constructor(
    public admin: AdminService,
    public location: LocationService,
    public dialog: MatDialog,
    private router: Router,
    public route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      this.tripId = +params.get('tripId')!;
      await this.admin.GetServicesByTripID(this.tripId);
      await this.admin.getAllServices();
      this.servicesNotInTrip = this.admin.sortedServices.filter((service: any) =>
        !this.admin.tripServices.some((tripService: any) => tripService.service_Id === service.service_Id)
      );
      this.totalPages = Math.ceil(this.servicesNotInTrip.length / this.itemsPerPage);
      this.updatePaginatedServices();
    });
  }

  ServicesFormGroup: FormGroup = new FormGroup({
    selectedServices: new FormControl([])
  });

  serviceFormGroup: FormGroup = new FormGroup({
    service_Name: new FormControl('', Validators.required),
    service_Cost: new FormControl('', [Validators.required, Validators.min(0)])
  });

  UpdateServicesFormGroup: FormGroup = new FormGroup({
    service_Id: new FormControl('', Validators.required),
    service_Name: new FormControl('', Validators.required),
    service_Cost: new FormControl('', [Validators.required, Validators.min(0)])
  });

  toggleAddService() {
    this.showAddServiceForm = !this.showAddServiceForm;
  }

  async cancelAddService() {
    this.showAddServiceForm = false;
    this.ServicesFormGroup.patchValue({
      newServiceName: '',
      newServiceCost: ''
    });
  }

  async addService() {
    try {
      this.previousServices = [...this.admin.sortedServices];
      await this.admin.CreateService(this.serviceFormGroup.value);
      await this.admin.getAllServices();
      this.servicesNotInTrip = this.admin.sortedServices.filter((service: any) =>
        !this.admin.tripServices.some((tripService: any) => tripService.service_Id === service.service_Id)
      );
      const newService: any = this.admin.sortedServices.find((service: any) =>
        !this.previousServices.some((prevService: any) => prevService.service_Id === service.service_Id)
      );
      if (newService) {
        const currentSelectedServices = this.ServicesFormGroup.value.selectedServices || [];
        this.ServicesFormGroup.patchValue({
          selectedServices: [...currentSelectedServices, newService.service_Id]
        });
        this.updateSelectedServicesDetails();
        this.openServiceDialog(newService);

      }
      this.cdr.detectChanges();
      this.updatePaginatedServices();
      this.cancelAddService();
    } catch (error) {
    }
  }

  async updatePaginatedServices(): Promise<void> {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedServices = this.servicesNotInTrip.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onServiceChange(isChecked: boolean, service: any) {
    const selectedServices = this.ServicesFormGroup.get('selectedServices') as FormControl;
    const currentSelection = selectedServices.value as number[];
    if (isChecked) {
      if (!currentSelection.includes(service)) {
        selectedServices.setValue([...currentSelection, service.service_Id]);
        this.openServiceDialog(service);

      }
    } else {
      selectedServices.setValue(currentSelection.filter(id => id !== service.service_Id));

    }
    this.optionalServices = this.optionalServices.filter(
      optionalService => optionalService.service_Id !== service.service_Id
    );
    const minimalOptionalServicesArray = this.optionalServices.map(Service => ({
      service_Id: Service.service_Id,
      is_Optional: Service.is_Optional
    }));
    this.minimalOptionalServices = minimalOptionalServicesArray;
    this.updateSelectedServicesDetails();
  }

  isServiceSelected(serviceId: number): boolean {
    return (this.ServicesFormGroup.get('selectedServices')?.value as number[]).includes(serviceId);
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedServices();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedServices();
    }
  }
  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedServices();
    }
  }

  updateSelectedServicesDetails() {
    const selectedServiceIds = this.ServicesFormGroup.value.selectedServices || [];
    this.selectedServicesDetails = this.admin.sortedServices.filter((service: any) =>
      selectedServiceIds.includes(service.service_Id)
    );
  }

  pData: any;
  openEditDialog(obj: any) {
    this.pData = obj;
    this.UpdateServicesFormGroup.controls['service_Id'].setValue(this.pData.service_Id)
    this.dialog.open(this.updateDialog)
  }

  updateCurrentTripService() {
    this.updateService();
  }

  updateAllTripsServices() {
    this.admin.updateServices(this.UpdateServicesFormGroup.value);
  }

  updateServiceForATrip: any = {};
  async updateService() {
    try {
      this.previousServices = [...this.admin.sortedServices];
      const updateServiceData = {
        trip_Id: this.tripId,
        service_Id: this.UpdateServicesFormGroup.controls['service_Id'].value,
        service_Name: this.UpdateServicesFormGroup.controls['service_Name'].value,
        service_Cost: this.UpdateServicesFormGroup.controls['service_Cost'].value
      }
      await this.admin.CreateServiceForTrip(updateServiceData);
      await this.admin.getAllServices();
      const newService: any = this.admin.sortedServices.find((service: any) =>
        !this.previousServices.some((prevService: any) => prevService.service_Id === service.service_Id)
      );
      if (newService) {
        const currentSelectedServices = this.ServicesFormGroup.value.selectedServices || [];
        this.ServicesFormGroup.patchValue({
          selectedServices: [...currentSelectedServices, newService.service_Id]
        });
      }
      this.cdr.detectChanges();
      this.updatePaginatedServices();
    } catch (error) {
    }
  }

  async Save() {
    const selectedServicesWithTripId = {
      SelectedServices: this.minimalOptionalServices,
      Trip_Id: this.tripId
    }
    await this.admin.CreateTripServiceForServicesList(selectedServicesWithTripId);
    this.ServicesFormGroup.patchValue({
      selectedServices: []
    });
    this.minimalOptionalServices.length=0;
    this.optionalServices.length=0;
    this.updateSelectedServicesDetails();
    await this.admin.getAllServices;
    await this.admin.GetServicesByTripID(this.tripId);
    this.servicesNotInTrip = this.admin.sortedServices.filter((service: any) =>
      !this.admin.tripServices.some((tripService: any) => tripService.service_Id === service.service_Id)
    );
  }

  return() {
    this.router.navigate(['admin/TripsInformation']);
  }

  back(id: number) {
    this.router.navigate(['admin/ManageTrips/', id]);
  }
  optionalServiceFormGroup: FormGroup = new FormGroup({
    service_Id: new FormControl('', Validators.required),
    is_Optional: new FormControl('', [Validators.required, Validators.min(0)]),
    service_Name: new FormControl('', Validators.required),
    service_Cost: new FormControl('', Validators.required),
  });

  openServiceDialog(service: any) {
    this.optionalServiceFormGroup.controls['service_Id'].setValue(service.service_Id)
    this.optionalServiceFormGroup.controls['service_Name'].setValue(service.service_Name)
    this.optionalServiceFormGroup.controls['service_Cost'].setValue(service.service_Cost)

    this.dialog.open(this.optionalDialog)
  }

  onCheckboxChange(event: any) {
    if (event.checked) {
      this.optionalServiceFormGroup.controls['is_Optional'].setValue(1);
    } else {
      this.optionalServiceFormGroup.controls['is_Optional'].setValue(0);
    }
  }
  optionalServices: any[] = [];
  minimalOptionalServices: any[] = [];
  saveOptionalService() {
    const optionalStatus = this.optionalServiceFormGroup.value;

    const existingServiceIndex = this.optionalServices.findIndex(
      (service) => service.service_Id === optionalStatus.service_Id
    );

    if (existingServiceIndex > -1) {
      this.optionalServices[existingServiceIndex] = optionalStatus;
    } else {
      this.optionalServices.push(optionalStatus);
    }
    const minimalOptionalServicesArray = this.optionalServices.map(service => ({
      service_Id: service.service_Id,
      is_Optional: service.is_Optional
    }));


    this.minimalOptionalServices = minimalOptionalServicesArray;
  }
  get optionalServicesList() {
    return this.optionalServices.filter(service => service.is_Optional === 1);
  }

  get nonOptionalServicesList() {
    return this.optionalServices.filter(service => service.is_Optional === 0);
  }
}