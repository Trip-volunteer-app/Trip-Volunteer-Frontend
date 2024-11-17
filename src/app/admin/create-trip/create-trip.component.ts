import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
/// <reference types="@types/google.maps" />
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { LocationService } from '../../Services/location.service';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})

export class CreateTripComponent implements OnInit {
  @ViewChild('departureInput') departureInput!: ElementRef;
  @ViewChild('destinationInput') destinationInput!: ElementRef;
  @ViewChild('callNumberDialog') numbersDialog !: TemplateRef<any>;
  @ViewChild(MatStepper) stepper!: MatStepper;



  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  //Services
  paginatedServices: any[] = [];
  showAddServiceForm = false;
  selectedServices: any[] = [];
  Services: any = [];
  sortedServices = [];
  previousServices: any = [];

  //volunteer
  paginatedVolunteerRoles: any[] = [];
  showAddVolunteerRoleForm = false;
  selectedVolunteerRoles: any[] = [];
  VolunteerRoles: any = [];
  sortedVolanteerRoles = [];
  previousVolunteerRoles: any = [];
  totalVolunteerPages: number = 0;
  currentVolunteerPage: number = 1;
  itemsPerVolunteerPage: number = 10;


  //location
  locationData: any = {};
  ImagePreview: string | ArrayBuffer | null | undefined = null;
  center: google.maps.LatLngLiteral = { lat: 31.9454, lng: 35.9284 };
  zoom = 10;
  departurePosition: any;
  distenationPosition: any;
  markerPositions: {
    departure?: google.maps.LatLngLiteral;
    destination?: google.maps.LatLngLiteral;
  } = {};
  selectedMarker: 'departure' | 'destination' = 'departure';
  location1: any = [];
  location2: any = [];

  constructor(
    public admin: AdminService,
    private router: Router,
    public location: LocationService,
    private http: HttpClient,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  public toastr:ToastrService) { }


  async ngOnInit(): Promise<void> {
    this.admin.getAllCategories();
    await this.admin.getAllServices();
    await this.admin.getAllVolunteerRoles();
    this.totalPages = Math.ceil(this.admin.Services.length / this.itemsPerPage);
    this.totalVolunteerPages = Math.ceil(this.admin.Services.length / this.itemsPerPage);
    this.updatePaginatedVolunteerRoles();
    this.updatePaginatedServices();
  }

  firstFormGroup: FormGroup = new FormGroup({
    categoryControl: new FormControl('', Validators.required),

  });

  secondFormGroup: FormGroup = new FormGroup({
    Trip_Name: new FormControl('', Validators.required),
    Start_Date: new FormControl('', Validators.required),
    End_Date: new FormControl('', Validators.required),
    Max_Number_Of_Users: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', Validators.required),
  });

  ServicesFormGroup: FormGroup = new FormGroup({
    selectedServices: new FormControl([])
  });

  serviceFormGroup: FormGroup = new FormGroup({
    service_Name: new FormControl('', Validators.required),
    service_Cost: new FormControl('', [Validators.required, Validators.min(0)])
  });
  
  locationFormGroup: FormGroup = new FormGroup({
    departure_Location: new FormControl('', Validators.required),
    destination_Location: new FormControl('', Validators.required),
    departure_Latitude: new FormControl('', Validators.required),
    departure_Longitude: new FormControl('', Validators.required),
    destination_Latitude: new FormControl('', Validators.required),
    destination_Longitude: new FormControl('', Validators.required),
  });

  selectedCategoryId: number | null = null;

  onCategoryChange(event: any): void {
    this.selectedCategoryId = event.value;
  }
  validateAndNext(stepper: MatStepper): void {
    this.secondFormGroup.markAllAsTouched();

    if (this.secondFormGroup.valid) {
      this.onSubmit();
      stepper.next();
    }
  }

  TripImage: FormGroup = new FormGroup({
    image_Name: new FormControl('', Validators.required),
  })


  uploadImage(file: any) {
    if (file.length === 0) return;

    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      this.ImagePreview = e.target?.result;
    };
    reader.readAsDataURL(fileToUpload);
  }

  onSubmit(): void {
    if (this.secondFormGroup.valid && this.ServicesFormGroup.valid && this.locationData) {
      const tripData = {
        ...this.secondFormGroup.value,
        Category_Id: this.selectedCategoryId,
        image_Name: this.TripImage.value.image_Name,
        SelectedServices: this.ServicesFormGroup.value.selectedServices,
        SelectedVolunteerRoles: this.roleEntries,
        ...this.locationFormGroup.value,
        Trip_Price: this.totalTripPrice,
        Max_Number_Of_Volunteers: this.maxNumberOfVolunteers
      };

      this.admin.CreateTrip(tripData);
    }
  }
  back() {
    this.router.navigate(['admin/TripsInformation']);

  }
  async addMarker(event: google.maps.MapMouseEvent): Promise<void> {
    if (event.latLng) {
      const position = event.latLng.toJSON();
      try {
        if (this.selectedMarker === 'departure') {
          this.markerPositions.departure = position;
          const locationInfo = await this.location.getLocationInfo(position.lat, position.lng);
          this.departurePosition = this.location.locationdetails;
        } else if (this.selectedMarker === 'destination') {
          this.markerPositions.destination = position;
          const locationInfo = await this.location.getLocationInfo(position.lat, position.lng);
          this.distenationPosition = this.location.locationdetails;
        }
        this.updateFormGroup();
      } catch (error) { }
    }
  }
  updateFormGroup() {
    if (this.markerPositions.departure) {
      this.locationFormGroup.patchValue({
        departure_Latitude: this.markerPositions.departure.lat,
        departure_Longitude: this.markerPositions.departure.lng,
      });
    }
    if (this.markerPositions.destination) {
      this.locationFormGroup.patchValue({
        destination_Latitude: this.markerPositions.destination.lat,
        destination_Longitude: this.markerPositions.destination.lng,
      });
    }
  }
  saveLocations() {
    if (this.locationFormGroup.valid) {
    }

  }

  getGeocodeInfo(address: string, type: 'departure' | 'destination') {
    this.http
      .get(`https://localhost:7004/api/Location_Api/get-geocode-info?Address=${address}`)
      .subscribe(
        (res: any) => {
          const location = {
            lat: res.latitude,
            lng: res.longitude
          };

          if (type === 'departure') {
            this.markerPositions.departure = location;
            this.departurePosition = address;
          } else if (type === 'destination') {
            this.markerPositions.destination = location;
            this.distenationPosition = address;
          }
        },
        (err) => {
        }
      );
  }

  setupDepartureInputListener() {
    fromEvent(this.departureInput.nativeElement, 'input')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        const address = this.departureInput.nativeElement.value;
        if (address) {
          this.getGeocodeInfo(address, 'departure');
        }
      });
  }

  setupDestinationInputListener() {
    fromEvent(this.destinationInput.nativeElement, 'input')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        const address = this.destinationInput.nativeElement.value;
        if (address) {
          this.getGeocodeInfo(address, 'destination');
        }
      });
  }

  ngAfterViewInit() {
    this.setupDepartureInputListener();
    this.setupDestinationInputListener();

  }

  onDepartureInputChange(departure: string) {
    if (departure) {
      this.getGeocodeInfo(departure, 'departure');
    }
  }
  onDestinationInputChange(destination: string) {
    if (destination) {
      this.getGeocodeInfo(destination, 'destination');
    }
  }
  async updatePaginatedServices(): Promise<void> {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedServices = this.admin.sortedServices.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalTripPrice: number = 0;

  onServiceChange(isChecked: boolean, serviceId: number) {
    const selectedServices = this.ServicesFormGroup.get('selectedServices') as FormControl;
    const currentSelection = selectedServices.value as number[];

    const selectedService = this.paginatedServices.find(service => service.service_Id === serviceId);

    if (selectedService) {
      const serviceCost = selectedService.service_Cost;

      if (isChecked) {
        if (!currentSelection.includes(serviceId)) {
          selectedServices.setValue([...currentSelection, serviceId]);
          this.totalTripPrice += serviceCost;
        }
      } else {
        selectedServices.setValue(currentSelection.filter(id => id !== serviceId));
        this.totalTripPrice -= serviceCost;
      }
    }
  }

  isServiceSelected(serviceId: number): boolean {
  const selectedServices = this.ServicesFormGroup.get('selectedServices')?.value;
  return Array.isArray(selectedServices) && selectedServices.includes(serviceId);
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
      if (this.serviceFormGroup.valid){
      const result = await Swal.fire({
        title: 'Add a new service?',
        text: 'Are you sure you want to add a new service?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!',
      });

      // If the user confirmed, proceed with the service creation
      if (result.isConfirmed) {
        await this.admin.CreateService(this.serviceFormGroup.value);
        await this.admin.getAllServices();
        const newService: any = this.admin.sortedServices.find((service: any) =>
          !this.previousServices.some((prevService: any) => prevService.service_Id === service.service_Id)
        );
        if (newService) {
          this.totalTripPrice = this.totalTripPrice + newService.service_Cost;
          const currentSelectedServices = this.ServicesFormGroup.value.selectedServices || [];
          this.ServicesFormGroup.patchValue({
            selectedServices: [...currentSelectedServices, newService.service_Id]
          });
        }else{
          this.toastr.error('error creating service');

        }
        this.cdr.detectChanges();
        this.updatePaginatedServices();
        this.cancelAddService();
        this.toastr.success('Service created successfully');

      
      }}

    } catch (error) {
      this.toastr.error('error creating service');
     }
  }

  clearImage(): void {
    this.ImagePreview = null;
    const control = this.TripImage.get('image_Name');
    control?.reset();
    control?.markAsTouched();
  }
  async updatePaginatedVolunteerRoles(): Promise<void> {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedVolunteerRoles = this.admin.SortedVolunteerRoles.slice(startIndex, startIndex + this.itemsPerPage);
  }

  RolesNumberFormGroup: FormGroup = new FormGroup({
    volunteer_Role_Id: new FormControl('', Validators.required),
    number_Of_Volunteers: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  RolesFormGroup: FormGroup = new FormGroup({
    selectedRoles: new FormControl([])
  });
  roleFormGroup: FormGroup = new FormGroup({
    role_Name: new FormControl('', Validators.required),
  });
  role1: any = {};
  maxNumberOfVolunteers: number = 0;

  async onVolunteerRoleChange(isChecked: boolean, volunteerRoleId: number) {
    const selectedVolunteerRoles = this.RolesFormGroup.get('selectedRoles') as FormControl;
    const currentSelection = selectedVolunteerRoles.value as number[];
    const selectedVolunteer = this.paginatedVolunteerRoles.find(role => role.volunteer_Role_Id === volunteerRoleId);

    if (selectedVolunteer) {
      const volunteerCount = selectedVolunteer.number_Of_Volunteers;

      this.newRoleId = selectedVolunteer.volunteer_Role_Id;

      if (isChecked) {
        if (!currentSelection.includes(volunteerRoleId)) {
          const updatedSelection = [...currentSelection, volunteerRoleId];
          selectedVolunteerRoles.setValue(updatedSelection);
          this.maxNumberOfVolunteers += volunteerCount;
          this.openEditDialog(this.newRoleId);
        }
      } else {
        this.roleEntries = this.roleEntries.filter(role => role.volunteer_Role_Id !== volunteerRoleId);
        this.maxNumberOfVolunteers += volunteerCount;

        this.role1 = await this.admin.SortedVolunteerRoles.find((r: any) => r.volunteer_Role_Id === volunteerRoleId);

        if (this.role1) {
          this.roleInfo = this.roleInfo.filter(role => role.volunteer_Role_Name !== this.role1.role_Name);
        } else { }
        const updatedSelection = currentSelection.filter(id => id !== volunteerRoleId);
        selectedVolunteerRoles.setValue(updatedSelection);
        this.maxNumberOfVolunteers -= volunteerCount;
      }
      this.maxNumberOfVolunteers = this.roleEntries.reduce((total, entry) => total + Number(entry.number_Of_Volunteers), 0);
    }
  }

  isVolunteerRolelected(VolunteerRoleId: number): boolean {
    const selectedRoles = this.RolesFormGroup.get('selectedRoles')?.value as number[];  // Get value as array
    return selectedRoles && Array.isArray(selectedRoles) && selectedRoles.includes(VolunteerRoleId);
  }

  nextVolunteerPage(): void {
    if (this.currentVolunteerPage < this.totalVolunteerPages) {
      this.currentVolunteerPage++;
      this.updatePaginatedVolunteerRoles();
    }
  }

  previousVolunteerPage(): void {
    if (this.currentVolunteerPage > 1) {
      this.currentVolunteerPage--;
      this.updatePaginatedVolunteerRoles();
    }
  }
  goToVolunteerPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentVolunteerPage = page;
      this.updatePaginatedVolunteerRoles();
    }
  }


  toggleAddVolunteer() {
    this.showAddVolunteerRoleForm = !this.showAddVolunteerRoleForm;
  }

  async cancelAddVoluntter() {
    this.showAddVolunteerRoleForm = false;
    this.ServicesFormGroup.patchValue({
      newVolunteerName: '',
      newVolunteerNumber: ''
    });
  }
  newRoleId: number = 0;

  async addVolunteer() {
    try {
      this.previousVolunteerRoles = [...this.admin.SortedVolunteerRoles];

      await this.admin.CreateVolunteerRoles(this.roleFormGroup.value);
      await this.admin.getAllVolunteerRoles();

      const newRole: any = this.admin.SortedVolunteerRoles.find((role: any) =>
        !this.previousVolunteerRoles.some((prevRole: any) => prevRole.volunteer_Role_Id === role.volunteer_Role_Id)
      );

      if (newRole) {
        this.newRoleId = newRole.volunteer_Role_Id;
        this.maxNumberOfVolunteers += newRole.number_Of_Volunteers;

        const currentSelectedRoles = (this.RolesFormGroup.get('selectedRoles')?.value || []) as number[];

        const updatedSelection = [...currentSelectedRoles, newRole.volunteer_Role_Id];
        this.RolesFormGroup.patchValue({
          selectedRoles: updatedSelection
        });

        this.openEditDialog(this.newRoleId);
      }

      this.cdr.detectChanges();
      this.updatePaginatedVolunteerRoles();
      this.cancelAddVoluntter();

    } catch (error) {
    }
  }

  openEditDialog(id: any) {
    this.RolesNumberFormGroup.controls['volunteer_Role_Id'].setValue(this.newRoleId)
    this.dialog.open(this.numbersDialog)
  }
  roleEntries: { volunteer_Role_Id: number; number_Of_Volunteers: number }[] = [];
  roleInfo: { volunteer_Role_Name: string; number_Of_Volunteers: number }[] = [];

  role: any = [];
  async save2() {
    const roleData = {
      volunteer_Role_Id: this.RolesNumberFormGroup.get('volunteer_Role_Id')?.value,
      number_Of_Volunteers: this.RolesNumberFormGroup.get('number_Of_Volunteers')?.value
    };

    this.roleEntries.push(roleData);

    this.role = await this.admin.SortedVolunteerRoles.find((r: any) => r.volunteer_Role_Id === roleData.volunteer_Role_Id);
    const roleWithDetails = {
      volunteer_Role_Name: this.role.role_Name,
      number_Of_Volunteers: roleData.number_Of_Volunteers
    };
    this.RolesNumberFormGroup.reset();
    this.roleInfo.push(roleWithDetails);
    this.maxNumberOfVolunteers = this.roleEntries.reduce((total, entry) => total + Number(entry.number_Of_Volunteers), 0);
  }
  resetStepper() {
    this.stepper.reset();
    this.stepper.selectedIndex = 0;
    this.ServicesFormGroup.reset();
    this.totalTripPrice=0;
    this.roleInfo.length = 0;
    this.stepper._getIndicatorType(0);
    this.locationFormGroup.reset();
  }
}