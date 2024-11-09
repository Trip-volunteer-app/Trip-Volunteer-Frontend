import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
/// <reference types="@types/google.maps" />
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  @ViewChild('callUpdateDialog') updateDialog !: TemplateRef<any>;
  @ViewChild('callDeleteDialog') deleteDialog !: TemplateRef<any>;



  tripId!: number;
  showAddRoleForm = false;
  selectedRoles: any[] = [];
  Roles: any = [];
  RolesNotInTrip: any[] = [];
  sortedRoles = [];
  previousRoles: any = [];
  paginatedRoles: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;
  selectedRolesDetails: any[] = [];


  constructor(
    public admin: AdminService,
    public dialog: MatDialog,
    private router: Router,
    public route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(async params => {
      this.tripId = +params.get('tripId')!;
      await this.admin.GetVolunteerRoleByTripID(this.tripId);
      await this.admin.getAllVolunteerRoles();
      await this.calculateMaxNumberOfVolunteers();
      console.log('oninit', this.maxNumberOfVolunteers);
      this.RolesNotInTrip = this.admin.SortedVolunteerRoles.filter((role: any) =>
        !this.admin.tripVolunteers.some((tripVolunteers: any) => tripVolunteers.volunteer_Role_Id === role.volunteer_Role_Id)
      );
      this.totalPages = Math.ceil(this.RolesNotInTrip.length / this.itemsPerPage);
      this.updatePaginatedRoles();
      console.log("TripId:", this.tripId);
    });
  }


  RolesFormGroup: FormGroup = new FormGroup({
    selectedRoles: new FormControl([])
  });

  roleFormGroup: FormGroup = new FormGroup({
    role_Name: new FormControl('', Validators.required),
    number_Of_Volunteers: new FormControl('', Validators.required)
  });

  UpdateRolesFormGroup: FormGroup = new FormGroup({
    volunteer_Role_Id: new FormControl('', Validators.required),
    role_Name: new FormControl('', Validators.required),
    number_Of_Volunteers: new FormControl('', Validators.required)
    });

  toggleAddRole() {
    this.showAddRoleForm = !this.showAddRoleForm;
  }

  async cancelAddRole() {
    this.showAddRoleForm = false;
    this.RolesFormGroup.patchValue({
      newRoleName: ''
      });
  }

  async addRole() {
    try {
      this.previousRoles = [...this.admin.SortedVolunteerRoles];
      await this.admin.CreateVolunteerRoles(this.roleFormGroup.value);

      await this.admin.getAllVolunteerRoles();
      this.RolesNotInTrip = this.admin.SortedVolunteerRoles.filter((role: any) =>
        !this.admin.tripVolunteers.some((tripVolunteers: any) => tripVolunteers.volunteer_Role_Id === role.volunteer_Role_Id)
      );
      console.log('Updated Roles List:', this.admin.SortedVolunteerRoles);
      const newVolunteerRole: any = this.admin.SortedVolunteerRoles.find((role: any) =>
        !this.previousRoles.some((prevRole: any) => prevRole.volunteer_Role_Id === role.volunteer_Role_Id)
      );
      if (newVolunteerRole) {
        const currentSelectedRoles = this.RolesFormGroup.value.selectedRoles || [];
        this.RolesFormGroup.patchValue({
          selectedRoles: [...currentSelectedRoles, newVolunteerRole.volunteer_Role_Id]
        });
        console.log('Updated selected roles:', this.RolesFormGroup.value.selectedRoles);
        this.updateselectedRolesDetails();
      }
      this.cdr.detectChanges();
      this.updatePaginatedRoles();
      this.cancelAddRole();
    } catch (error) {
      console.error('Error adding role:', error);
    }
    this.calculateMaxNumberOfVolunteers();
    console.log('onadd', this.maxNumberOfVolunteers);
  }

  async updatePaginatedRoles(): Promise<void> {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedRoles = this.RolesNotInTrip.slice(startIndex, startIndex + this.itemsPerPage);
  }

  maxNumberOfVolunteers:number=0;
    onVolunteerRoleChange(isChecked: boolean, volunteerId: number) {
      const selectedRoles = this.RolesFormGroup.get('selectedRoles') as FormControl;
      const currentSelection = selectedRoles.value as number[];
      console.log('currentSelectioncurrentSelection', currentSelection)
      console.log(selectedRoles.value)
      if (isChecked) {
        if (!currentSelection.includes(volunteerId)) {
          selectedRoles.setValue([...currentSelection, volunteerId]);
        }
      } else {
        selectedRoles.setValue(currentSelection.filter(id => id !== volunteerId));
      }
      this.updateselectedRolesDetails();
      console.log('selectedRoles', selectedRoles.value)
    }


  isVolunteerRoleSelected(volunteerId: number): boolean {
    return (this.RolesFormGroup.get('selectedRoles')?.value as number[]).includes(volunteerId);
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedRoles();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRoles();
    }
  }
  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedRoles();
    }
  }


  updateselectedRolesDetails() {
    const selectedVolunteerRolesIds = this.RolesFormGroup.value.selectedRoles || [];
    console.log('selectedServiceIdsselectedServiceIdsselectedServiceIds', selectedVolunteerRolesIds)
    this.selectedRolesDetails = this.admin.SortedVolunteerRoles.filter((volunteerRole: any) =>
      selectedVolunteerRolesIds.includes(volunteerRole.volunteer_Role_Id)
    );
    console.log('selectedRolesDetails', this.selectedRolesDetails)
    this.calculateMaxNumberOfVolunteers();
    console.log('onupdatedetails', this.maxNumberOfVolunteers)
  }

  pData: any;
  openEditDialog(obj: any) {
    this.pData = obj;
    this.UpdateRolesFormGroup.controls['volunteer_Role_Id'].setValue(this.pData.volunteer_Role_Id)
    this.dialog.open(this.updateDialog)
  }
  updateCurrentTripVolunteerRole() {
    this.updateRole();
  }
  async updateAllTripsRoles() {
    console.log('this.UpdateRolesFormGroup.value', this.UpdateRolesFormGroup.value)
    this.admin.updateVolunteerRole(this.UpdateRolesFormGroup.value);
    await this.admin.GetVolunteerRoleByTripID(this.tripId)
    this.calculateMaxNumberOfVolunteers();
    console.log('updateall', this.maxNumberOfVolunteers)
  }
  updateRoleForATrip: any = {};
  async updateRole() {
    try {
      this.previousRoles = [...this.admin.SortedVolunteerRoles];
      const updateVolunteerData = {
        trip_Id: this.tripId,
        volunteer_Role_Id: this.UpdateRolesFormGroup.controls['volunteer_Role_Id'].value,
        role_Name: this.UpdateRolesFormGroup.controls['role_Name'].value,
        number_Of_Volunteers: this.UpdateRolesFormGroup.controls['number_Of_Volunteers'].value,
      }
      console.log('updateServiceDataupdateServiceData', updateVolunteerData)
      await this.admin.CreateVolunteerRoleForTrip(updateVolunteerData);
      await this.admin.getAllVolunteerRoles();
      console.log('Updated Roles List:', this.admin.SortedVolunteerRoles);
      const newVolunteerRole: any = this.admin.SortedVolunteerRoles.find((role: any) =>
        !this.previousRoles.some((prevRole: any) => prevRole.volunteer_Role_Id === role.volunteer_Role_Id)
      );
      if (newVolunteerRole) {
        const currentSelectedRoles = this.RolesFormGroup.value.selectedRoles || [];
        this.RolesFormGroup.patchValue({
          selectedRoles: [...currentSelectedRoles, newVolunteerRole.volunteer_Role_Id]
        });
        console.log('Updated selected services:', this.RolesFormGroup.value.selectedRoles);
      }
      this.cdr.detectChanges();
      this.updatePaginatedRoles();
    } catch (error) {
      console.error('Error adding service:', error);
    }
    await this.admin.GetVolunteerRoleByTripID(this.tripId)
    this.calculateMaxNumberOfVolunteers();
    console.log('onupdatecurrent', this.maxNumberOfVolunteers)
  }
  async Save() {
    const selectedRolesWithTripId = {
      SelectedVolunteerRoles: this.RolesFormGroup.value.selectedRoles,
      Trip_Id: this.tripId
    }
    await this.admin.CreateTripVRoleForVRolesList(selectedRolesWithTripId);
    this.RolesFormGroup.patchValue({
      selectedRoles: []
    });
    this.updateselectedRolesDetails();
    await this.admin.getAllVolunteerRoles();
    await this.admin.GetVolunteerRoleByTripID(this.tripId);
    console.log('this.admin.tripVolunteers',this.admin.tripVolunteers);
    this.RolesNotInTrip = this.admin.SortedVolunteerRoles.filter((role: any) =>
      !this.admin.tripVolunteers.some((tripVolunteers: any) => tripVolunteers.volunteer_Role_Id === role.volunteer_Role_Id)
    );
    this.calculateMaxNumberOfVolunteers();
    console.log('onsave', this.maxNumberOfVolunteers)
  }
  return(){
    this.router.navigate(['admin/TripsInformation']);
  }
  back(id:number){
    this.router.navigate(['admin/ManageTrips/', id]);

  }
  async openDeleteDialog(id: number) {
    const dailogRef = this.dialog.open(this.deleteDialog).afterClosed().subscribe(async (res) => {
      if (res != undefined) {
        console.log(res)
        if (res == 'yes')
          this.admin.DeleteTripVolunteerRoleForATrip(id, this.tripId);
        await this.admin.GetVolunteerRoleByTripID(this.tripId)
        this.calculateMaxNumberOfVolunteers();
        console.log('onupdatecurrent', this.maxNumberOfVolunteers)
      } else if (res == 'no')
        console.log('Thank you');
    }
    );
    await this.admin.GetVolunteerRoleByTripID(this.tripId)
    this.calculateMaxNumberOfVolunteers();
    console.log('onupdatecurrent', this.maxNumberOfVolunteers)
  }
  async calculateMaxNumberOfVolunteers() {
    await this.admin.GetVolunteerRoleByTripID(this.tripId);
    this.maxNumberOfVolunteers = this.admin.tripVolunteers.reduce(
      (total: any, trip: any) => total + (trip.number_Of_Volunteers || 0),
      0

    );
    console.log('max',this.maxNumberOfVolunteers)
  }
}
