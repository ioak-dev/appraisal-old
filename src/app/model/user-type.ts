export class UserType {
    id: string;
    empId: string;
    name: string;
    jobName: string;
    email: string;
    unit: string;
    joiningDate: string;
    designation: string;
    lastAppraisalDate: string;
    duration: string;
    roles: Roles[];
}
export class Roles {
    type: string;
    options: string[];
}