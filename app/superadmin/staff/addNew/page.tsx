"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInputField } from "@/components/ui/CustomInputField";
import { CustomSelectField } from "@/components/ui/CustomSelectField";

import { Button } from "@/components/ui/button";
import { GlobalButton } from "@/components/ui/GlobalButton";
import { CustomUploadField } from "@/components/ui/CustomUploadField";
import React from "react";
import { uploadToImageKit } from "@/lib/commonFunction";
import { CustomTitle } from "@/components/ui/CustomTitle";

const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
];
const employmentTypeOptions = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
];
const shiftOptions = [
    { value: "morning", label: "Morning" },
    { value: "evening", label: "Evening" },
    { value: "night", label: "Night" },
    { value: "rotational", label: "Rotational" },
];
const salaryTypeOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "daily", label: "Daily" },
    { value: "hourly", label: "Hourly" },
];
const paymentModeOptions = [
    { value: "cash", label: "Cash" },
    { value: "bank", label: "Bank" },
    { value: "upi", label: "UPI" },
];
const attendanceTypeOptions = [
    { value: "manual", label: "Manual" },
    { value: "biometric", label: "Biometric" },
    { value: "app", label: "App" },
];
const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
    { value: "resigned", label: "Resigned" },
];

// Type for staff form data
type StaffFormData = {
    fullName: string;
    gender: "male" | "female" | "other";
    dateOfBirth: string;
    aadhaarNumber?: string;
    panNumber?: string;
    mobileNumber: string;
    alternateMobileNumber?: string;
    email?: string;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
    emergencyContact: {
        name: string;
        relation: string;
        phone: string;
    };
    designation: string;
    department: string;
    employmentType: "full-time" | "part-time" | "contract";
    joiningDate: string;
    shift: "morning" | "evening" | "night" | "rotational";
    workLocation: string;
    salary: string;
    salaryType: "monthly" | "daily" | "hourly";
    paymentMode: "cash" | "bank" | "upi";
    bankDetails: {
        accountHolderName?: string;
        accountNumber?: string;
        ifscCode?: string;
        bankName?: string;
        upiId?: string;
    };
    attendanceType: "manual" | "biometric" | "app";
    status: "active" | "inactive" | "suspended" | "resigned";
    profilePhoto?: string;
};

const staffSchema = z.object({
    fullName: z.string().min(2),
    gender: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string().min(1),
    // photo: z.string().url().optional().or(z.literal("")),
    aadhaarNumber: z.string().optional(),
    panNumber: z.string().optional(),
    mobileNumber: z.string().min(8),
    alternateMobileNumber: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    address: z.object({
        street: z.string().min(1),
        city: z.string().min(1),
        state: z.string().min(1),
        pincode: z.string().min(4),
    }),
    emergencyContact: z.object({
        name: z.string().min(1),
        relation: z.string().min(1),
        phone: z.string().min(8),
    }),
    designation: z.string().min(1),
    department: z.string().min(1),
    employmentType: z.enum(["full-time", "part-time", "contract"]),
    joiningDate: z.string().min(1),
    shift: z.enum(["morning", "evening", "night", "rotational"]),
    workLocation: z.string().min(1),
    // reportingTo: z.string().optional(),
    salary: z.string().min(1),
    salaryType: z.enum(["monthly", "daily", "hourly"]),
    paymentMode: z.enum(["cash", "bank", "upi"]),
    bankDetails: z.object({
        accountHolderName: z.string().optional(),
        accountNumber: z.string().optional(),
        ifscCode: z.string().optional(),
        bankName: z.string().optional(),
        upiId: z.string().optional(),
    }),
    attendanceType: z.enum(["manual", "biometric", "app"]),
    status: z.enum(["active", "inactive", "suspended", "resigned"]),
    profilePhoto: z.string().url().optional().or(z.literal("")),
});

export default function AddStaffPage() {
    const { control, handleSubmit, register, formState: { errors }, watch, setValue } = useForm({
        resolver: zodResolver(staffSchema),
        defaultValues: {
            fullName: "",
            gender: "male",
            dateOfBirth: "",
            aadhaarNumber: "",
            panNumber: "",
            mobileNumber: "",
            alternateMobileNumber: "",
            email: "",
            address: { street: "", city: "", state: "", pincode: "" },
            emergencyContact: { name: "", relation: "", phone: "" },
            designation: "",
            department: "",
            employmentType: "full-time",
            joiningDate: "",
            shift: "morning",
            workLocation: "",
            salary: "",
            salaryType: "monthly",
            paymentMode: "cash",
            bankDetails: { accountHolderName: "", accountNumber: "", ifscCode: "", bankName: "", upiId: "" },
            attendanceType: "manual",
            status: "active",
            profilePhoto: "",
        }
    });




    const loggedInUserId = "USER_ID_FROM_AUTH";
    const [profilePhotoUrl, setProfilePhotoUrl] = React.useState<string>("");
    const [uploading, setUploading] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const watchProfilePhoto = watch("profilePhoto")

    console.log("____MMMMM__", watchProfilePhoto)


    //  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0]
    //     if (!file) return

    //     setUploading(true)
    //     try {
    //       const url= await uploadToImageKit(file, "/staff-photos");
    //       setProfilePhotoUrl(url);
    //       setUploading(false);

    //     } catch (error) {
    //       console.error("Error uploading image:", error)
    //     } finally {
    //       setUploading(false)
    //     }
    //   }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const url = await uploadToImageKit(file, "/staff-photos")
            setValue("profilePhoto", url)
        } catch (error) {
            console.error("Error uploading image:", error)
        } finally {
            setUploading(false)
        }
    }

    const onSubmit = async (data: StaffFormData) => {
        const payload = { ...data, reportingTo: loggedInUserId };

        console.log("Payload____Payload", payload);
        try {
            setIsSubmitting(true);
            const res = await fetch("/api/staff", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const result = await res.json();
            if (result.success) {
                setIsSubmitting(false)
                window.location.href = "/superadmin/staff";
            } else {
                // Optionally show error
                setIsSubmitting(false);
            }
        } catch (err) {
            // Optionally show error
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-full mx-auto py-8">
            <h1 className="text-2xl font-bold mb-2">Add New Staff</h1>
            <div className="border-b border-border mb-6" />
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <CustomTitle title="Basic Information" className="mb-2 mt-6" titleClassName="text-lg font-semibold" />
                <div className="">

                    <CustomUploadField
                        label="Profile Photo"
                        value={watchProfilePhoto}
                        onChange={handleImageUpload}
                        onRemove={() => setValue("profilePhoto", "")}
                        uploading={uploading}
                    />
                </div>
                <div className="flex items-center gap-6 mb-4">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <CustomInputField
                            label="Full Name"
                            id="fullName"
                            {...register("fullName")}
                            error={errors.fullName?.message}
                            required
                        />
                        <CustomSelectField
                            label="Gender"
                            id="gender"
                            value={watch("gender")}
                            onValueChange={val => setValue("gender", val)}
                            options={genderOptions}
                            error={errors.gender?.message}
                        />
                        <CustomInputField
                            label="Date of Birth"
                            id="dateOfBirth"
                            type="date"
                            {...register("dateOfBirth")}
                            error={errors.dateOfBirth?.message}
                            required
                        />
                        <CustomInputField
                            label="Aadhaar Number"
                            id="aadhaarNumber"
                            {...register("aadhaarNumber")}
                            error={errors.aadhaarNumber?.message}
                        />
                        <CustomInputField
                            label="PAN Number"
                            id="panNumber"
                            {...register("panNumber")}
                            error={errors.panNumber?.message}
                        />
                    </div>
                </div>

                {/* Contact Details */}
                <h2 className="text-lg font-semibold mb-2 mt-6">Contact Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <CustomInputField
                        label="Mobile Number"
                        id="mobileNumber"
                        {...register("mobileNumber")}
                        error={errors.mobileNumber?.message}
                        required
                    />
                    <CustomInputField
                        label="Alternate Mobile Number"
                        id="alternateMobileNumber"
                        {...register("alternateMobileNumber")}
                        error={errors.alternateMobileNumber?.message}
                    />
                    <CustomInputField
                        label="Email"
                        id="email"
                        {...register("email")}
                        error={errors.email?.message}
                    />
                </div>

                {/* Address */}
                <h2 className="text-lg font-semibold mb-2 mt-6">Address</h2>
                <div className="grid grid-cols-2 gap-4">
                    <CustomInputField
                        label="Street"
                        id="street"
                        {...register("address.street")}
                        error={errors.address?.street?.message}
                        required
                    />
                    <CustomInputField
                        label="City"
                        id="city"
                        {...register("address.city")}
                        error={errors.address?.city?.message}
                        required
                    />
                    <CustomInputField
                        label="State"
                        id="state"
                        {...register("address.state")}
                        error={errors.address?.state?.message}
                        required
                    />
                    <CustomInputField
                        label="Pincode"
                        id="pincode"
                        {...register("address.pincode")}
                        error={errors.address?.pincode?.message}
                        required
                    />
                </div>

                {/* Emergency Contact */}
                <h2 className="text-lg font-semibold mb-2 mt-6">Emergency Contact</h2>
                <div className="grid grid-cols-2 gap-4">
                    <CustomInputField
                        label="Emergency Contact Name"
                        id="emgName"
                        {...register("emergencyContact.name")}
                        error={errors.emergencyContact?.name?.message}
                        required
                    />
                    <CustomInputField
                        label="Relation"
                        id="emgRelation"
                        {...register("emergencyContact.relation")}
                        error={errors.emergencyContact?.relation?.message}
                        required
                    />
                    <CustomInputField
                        label="Emergency Phone"
                        id="emgPhone"
                        {...register("emergencyContact.phone")}
                        error={errors.emergencyContact?.phone?.message}
                        required
                    />
                </div>

                {/* Employment Details */}
                <h2 className="text-lg font-semibold mb-2 mt-6">Employment Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <CustomInputField
                        label="Designation"
                        id="designation"
                        {...register("designation")}
                        error={errors.designation?.message}
                        required
                    />
                    <CustomInputField
                        label="Department"
                        id="department"
                        {...register("department")}
                        error={errors.department?.message}
                        required
                    />
                    <CustomSelectField
                        label="Employment Type"
                        id="employmentType"
                        value={watch("employmentType")}
                        onValueChange={val => setValue("employmentType", val)}
                        options={employmentTypeOptions}
                        error={errors.employmentType?.message}
                    />
                    <CustomInputField
                        label="Joining Date"
                        id="joiningDate"
                        type="date"
                        {...register("joiningDate")}
                        error={errors.joiningDate?.message}
                        required
                    />
                    <CustomSelectField
                        label="Shift"
                        id="shift"
                        value={watch("shift")}
                        onValueChange={val => setValue("shift", val)}
                        options={shiftOptions}
                        error={errors.shift?.message}
                    />
                    <CustomInputField
                        label="Work Location"
                        id="workLocation"
                        {...register("workLocation")}
                        error={errors.workLocation?.message}
                        required
                    />
                </div>

                {/* Salary & Payment */}
                <h2 className="text-lg font-semibold mb-2 mt-6">Salary & Payment</h2>
                <div className="grid grid-cols-2 gap-4">
                    <CustomInputField
                        label="Salary"
                        id="salary"
                        type="number"
                        {...register("salary")}
                        error={errors.salary?.message}
                        required
                    />
                    <CustomSelectField
                        label="Salary Type"
                        id="salaryType"
                        value={watch("salaryType")}
                        onValueChange={val => setValue("salaryType", val)}
                        options={salaryTypeOptions}
                        error={errors.salaryType?.message}
                    />
                    <CustomSelectField
                        label="Payment Mode"
                        id="paymentMode"
                        value={watch("paymentMode")}
                        onValueChange={val => setValue("paymentMode", val)}
                        options={paymentModeOptions}
                        error={errors.paymentMode?.message}
                    />
                </div>

                {/* Bank Details (optional) */}
                <h2 className="text-lg font-semibold mb-2 mt-6">Bank Details (Optional)</h2>
                <div className="grid grid-cols-2 gap-4">
                    <CustomInputField
                        label="Account Holder Name"
                        id="accountHolderName"
                        {...register("bankDetails.accountHolderName")}
                        error={errors.bankDetails?.accountHolderName?.message}
                    />
                    <CustomInputField
                        label="Account Number"
                        id="accountNumber"
                        {...register("bankDetails.accountNumber")}
                        error={errors.bankDetails?.accountNumber?.message}
                    />
                    <CustomInputField
                        label="IFSC Code"
                        id="ifscCode"
                        {...register("bankDetails.ifscCode")}
                        error={errors.bankDetails?.ifscCode?.message}
                    />
                    <CustomInputField
                        label="Bank Name"
                        id="bankName"
                        {...register("bankDetails.bankName")}
                        error={errors.bankDetails?.bankName?.message}
                    />
                    <CustomInputField
                        label="UPI ID"
                        id="upiId"
                        {...register("bankDetails.upiId")}
                        error={errors.bankDetails?.upiId?.message}
                    />
                </div>

                {/* Attendance & Status */}
                <h2 className="text-lg font-semibold mb-2 mt-6">Attendance & Status</h2>
                <div className="grid grid-cols-2 gap-4">
                    <CustomSelectField
                        label="Attendance Type"
                        id="attendanceType"
                        value={watch("attendanceType")}
                        onValueChange={val => setValue("attendanceType", val)}
                        options={attendanceTypeOptions}
                        error={errors.attendanceType?.message}
                    />
                    <CustomSelectField
                        label="Status"
                        id="status"
                        value={watch("status")}
                        onValueChange={val => setValue("status", val)}
                        options={statusOptions}
                        error={errors.status?.message}
                    />
                </div>

                {/* Hidden reportingTo field set by logged-in user */}
                <input type="hidden" name="reportingTo" value={loggedInUserId} />

                <div className="flex gap-4 justify-end mt-8">
                    <GlobalButton
                        type="button"
                        title="Cancel"
                        variant="outline"
                        onClick={() => window.history.back()}
                    />
                    <GlobalButton
                        type="submit"
                        // title="Submit"
                        title={isSubmitting ? "Submitting..." : "Submit"}
                        variant="default"
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    );
}
