"use client"

import { SuperAdminLayout } from "@/components/super-admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Save, Building2, Bell, Shield, Users } from "lucide-react"

export default function SettingsPage() {
  return (
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">System Settings</h1>
            <p className="text-muted-foreground mt-2 text-pretty">
              Configure facility information, notifications, and system preferences
            </p>
          </div>
          <Button size="sm">
            <Save className="size-4" />
            Save Changes
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="facility" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="facility">Facility</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Facility Settings */}
          <TabsContent value="facility">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Facility Information</CardTitle>
                    <CardDescription>Update your facility details and contact information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="facilityName">Facility Name</Label>
                    <Input id="facilityName" placeholder="Elder Care Trust" defaultValue="Elder Care Trust" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facilityEmail">Contact Email</Label>
                    <Input
                      id="facilityEmail"
                      type="email"
                      placeholder="admin@eldercare.com"
                      defaultValue="admin@eldercare.com"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="facilityPhone">Phone Number</Label>
                    <Input id="facilityPhone" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facilityCapacity">Total Capacity</Label>
                    <Input id="facilityCapacity" type="number" placeholder="66" defaultValue="66" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facilityAddress">Address</Label>
                  <Input id="facilityAddress" placeholder="123 Care Lane, City, State 12345" />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Operating Hours</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="visitingHours">Visiting Hours</Label>
                      <Input id="visitingHours" placeholder="9:00 AM - 7:00 PM" defaultValue="9:00 AM - 7:00 PM" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="officeHours">Office Hours</Label>
                      <Input id="officeHours" placeholder="8:00 AM - 6:00 PM" defaultValue="8:00 AM - 6:00 PM" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-chart-2/10">
                    <Bell className="size-5 text-chart-2" />
                  </div>
                  <div>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications and alerts</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                  <Switch id="emailNotifications" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="incidentAlerts">Incident Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified of safety incidents immediately</p>
                  </div>
                  <Switch id="incidentAlerts" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="admissionNotifications">Admission Notifications</Label>
                    <p className="text-sm text-muted-foreground">Alerts for new resident admissions</p>
                  </div>
                  <Switch id="admissionNotifications" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="paymentReminders">Payment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders for overdue payments</p>
                  </div>
                  <Switch id="paymentReminders" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weeklyReports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive automated weekly summaries</p>
                  </div>
                  <Switch id="weeklyReports" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
                    <Shield className="size-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage password and authentication settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch id="twoFactor" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sessionTimeout">Auto Logout</Label>
                    <p className="text-sm text-muted-foreground">Automatically logout after 30 minutes of inactivity</p>
                  </div>
                  <Switch id="sessionTimeout" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Settings */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Control access and permissions for admin users</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newUserApproval">New User Approval</Label>
                    <p className="text-sm text-muted-foreground">Require admin approval for new accounts</p>
                  </div>
                  <Switch id="newUserApproval" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="activityLogs">Activity Logs</Label>
                    <p className="text-sm text-muted-foreground">Track user actions and changes</p>
                  </div>
                  <Switch id="activityLogs" defaultChecked />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Invite New Admin</h3>
                  <div className="flex gap-2">
                    <Input placeholder="admin@example.com" type="email" className="flex-1" />
                    <Button>Send Invite</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}
