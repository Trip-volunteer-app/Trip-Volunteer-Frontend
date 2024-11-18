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
  @ViewChild('callNumberDialog') numbersDialog !: TemplateRef<any>;

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
  newRoleId: number = 0;
  roleEntries: { volunteer_Role_Id: number; number_Of_Volunteers: number }[] = [];
  roleInfo: { volunteer_Role_Name: string; number_Of_Volunteers: number }[] = [];
  role: any = [];

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
      this.RolesNotInTrip = this.admin.SortedVolunteerRoles.filter((role: any) =>
        !this.admin.tripVolunteers.some((tripVolunteers: any) => tripVolunteers.volunteer_Role_Id === role.volunteer_Role_Id)
      );
      this.totalPages = Math.ceil(this.RolesNotInTrip.length / this.itemsPerPage);
      this.updatePaginatedRoles();
    });
  }

  RolesFormGroup: FormGroup = new FormGroup({
    selectedRoles: new FormControl([])
  });

  roleFormGroup: FormGroup = new FormGroup({
    role_Name: new FormControl('', Validators.required),
    number_Of_Volunteers: new FormControl('', Validators.required),
  });

  UpdateRolesFormGroup: FormGroup = new FormGroup({
    trip_Volunteerroles_Id: new FormControl('', Validators.required),
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
  pushToIntry: { volunteer_Role_Id: number; number_Of_Volunteers: number } = { volunteer_Role_Id: 0, number_Of_Volunteers: 0 };
  async addRole() {
    try {
      this.previousRoles = [...this.admin.SortedVolunteerRoles];
      const createVolunteer = {
        trip_Id: this.tripId,
        role_Name: this.roleFormGroup.controls['role_Name'].value,
        number_Of_Volunteers: this.roleFormGroup.controls['number_Of_Volunteers'].value,
      };
      const objforDetails = {
        volunteer_Role_Name: this.roleFormGroup.controls['role_Name'].value,
        number_Of_Volunteers: this.roleFormGroup.controls['number_Of_Volunteers'].value,
      };

      await this.admin.CreateVolunteerRoleForTrip(createVolunteer);
      this.pushToIntry.number_Of_Volunteers = createVolunteer.number_Of_Volunteers;
      this.roleInfo.push(objforDetails);
      await this.admin.getAllVolunteerRoles();
      this.RolesNotInTrip = this.admin.SortedVolunteerRoles.filter((role: any) =>
        !this.admin.tripVolunteers.some((tripVolunteers: any) => tripVolunteers.volunteer_Role_Id === role.volunteer_Role_Id)
      );
      const newVolunteerRole: any = this.admin.SortedVolunteerRoles.find((role: any) =>
        !this.previousRoles.some((prevRole: any) => prevRole.volunteer_Role_Id === role.volunteer_Role_Id)
      );
      if (newVolunteerRole) {
        this.newRoleId = newVolunteerRole.volunteer_Role_Id;
        this.pushToIntry.volunteer_Role_Id = newVolunteerRole.volunteer_Role_Id;
        this.roleEntries.push(this.pushToIntry);
        const currentSelectedRoles = this.RolesFormGroup.value.selectedRoles || [];
        this.RolesFormGroup.patchValue({
          selectedRoles: [...currentSelectedRoles, newVolunteerRole.volunteer_Role_Id]
        });
        this.updateselectedRolesDetails();
      }
      this.cdr.detectChanges()
      await this.updatePaginatedRoles();
      this.cancelAddRole();
    } catch (error) {
    }
    this.calculateMaxNumberOfVolunteers();
  }

  async updatePaginatedRoles(): Promise<void> {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedRoles = this.RolesNotInTrip.slice(startIndex, startIndex + this.itemsPerPage);
  }

  maxNumberOfVolunteers: number = 0;
  onVolunteerRoleChange(isChecked: boolean, volunteerId: number) {
    const selectedRoles = this.RolesFormGroup.get('selectedRoles') as FormControl;
    const currentSelection = selectedRoles.value as number[];
    if (isChecked) {
      if (!currentSelection.includes(volunteerId)) {
        selectedRoles.setValue([...currentSelection, volunteerId]);
        this.newRoleId = volunteerId;
        this.openNumberDialog(this.newRoleId);
      }
    } else {
      selectedRoles.setValue(currentSelection.filter(id => id !== volunteerId));
      this.roleEntries = this.roleEntries.filter(entry => entry.volunteer_Role_Id !== volunteerId);
      this.roleInfo = this.roleInfo.filter(info => info.volunteer_Role_Name !== this.getRoleNameById(volunteerId));
    }
    this.updateselectedRolesDetails();
  }

  roleToremove: any;
  getRoleNameById(volunteerId: number): string {
    this.roleToremove = this.admin.SortedVolunteerRoles.find((r: any) => r.volunteer_Role_Id === volunteerId);
    return this.roleToremove ? this.roleToremove.role_Name : '';
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
    this.selectedRolesDetails = this.admin.SortedVolunteerRoles.filter((volunteerRole: any) =>
      selectedVolunteerRolesIds.includes(volunteerRole.volunteer_Role_Id)
    );
    this.calculateMaxNumberOfVolunteers();
  }

  pData: any;
  openEditDialog(obj: any) {
    this.pData = obj;
    this.UpdateRolesFormGroup.controls['trip_Volunteerroles_Id'].setValue(this.pData.trip_Volunteerroles_Id)
    this.dialog.open(this.updateDialog)
  }

  updateCurrentTripVolunteerRole() {
    this.updateRole();
  }

  async updateAllTripsRoles() {
    await this.admin.UpdateTrip_vrole_NumberOfVolunteers(this.UpdateRolesFormGroup.value);
    await this.admin.GetVolunteerRoleByTripID(this.tripId)
    this.calculateMaxNumberOfVolunteers();
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
      await this.admin.CreateVolunteerRoleForTrip(updateVolunteerData);
      await this.admin.getAllVolunteerRoles();
      const newVolunteerRole: any = this.admin.SortedVolunteerRoles.find((role: any) =>
        !this.previousRoles.some((prevRole: any) => prevRole.volunteer_Role_Id === role.volunteer_Role_Id)
      );
      if (newVolunteerRole) {
        const currentSelectedRoles = this.RolesFormGroup.value.selectedRoles || [];
        this.RolesFormGroup.patchValue({
          selectedRoles: [...currentSelectedRoles, newVolunteerRole.volunteer_Role_Id]
        });
      }
      this.cdr.detectChanges();
      this.updatePaginatedRoles();
    } catch (error) {
    }
    await this.admin.GetVolunteerRoleByTripID(this.tripId)
    this.calculateMaxNumberOfVolunteers();
  }

  async Save() {
    const selectedRolesWithTripId = {
      SelectedVolunteerRoles: this.roleEntries,
      Trip_Id: this.tripId
    }
    await this.admin.CreateTripVRoleForVRolesList(selectedRolesWithTripId);
    this.RolesFormGroup.patchValue({
      selectedRoles: []
    });
    this.updateselectedRolesDetails();
    await this.admin.getAllVolunteerRoles();
    await this.admin.GetVolunteerRoleByTripID(this.tripId);
    this.RolesNotInTrip = this.admin.SortedVolunteerRoles.filter((role: any) =>
      !this.admin.tripVolunteers.some((tripVolunteers: any) => tripVolunteers.volunteer_Role_Id === role.volunteer_Role_Id)
    );
    this.calculateMaxNumberOfVolunteers();
  }

  return() {
    this.router.navigate(['admin/TripsInformation']);
  }

  back(id: number) {
    this.router.navigate(['admin/ManageTrips/', id]);
  }

  async openDeleteDialog(id: number) {
    const dailogRef = this.dialog.open(this.deleteDialog).afterClosed().subscribe(async (res) => {
      if (res != undefined) {
        if (res == 'yes')
          this.admin.DeleteTripVolunteerRoleForATrip(id, this.tripId);
        await this.admin.GetVolunteerRoleByTripID(this.tripId)
        this.calculateMaxNumberOfVolunteers();
      } 
    }
    );
    await this.admin.GetVolunteerRoleByTripID(this.tripId)
    this.calculateMaxNumberOfVolunteers();
  }
  async calculateMaxNumberOfVolunteers() {
    await this.admin.GetVolunteerRoleByTripID(this.tripId);
    this.maxNumberOfVolunteers = this.admin.tripVolunteers.reduce(
      (total: any, trip: any) => total + (trip.number_Of_Volunteers || 0),
      0
    );
  }

  RolesNumberFormGroup: FormGroup = new FormGroup({
    volunteer_Role_Id: new FormControl('', Validators.required),
    number_Of_Volunteers: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  openNumberDialog(id: any) {
    this.RolesNumberFormGroup.controls['volunteer_Role_Id'].setValue(this.newRoleId)
    this.dialog.open(this.numbersDialog)
  }

  async save2() {
    const roleData = {
      volunteer_Role_Id: this.RolesNumberFormGroup.get('trip_Volunteerroles_Id')?.value,
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
  }
}