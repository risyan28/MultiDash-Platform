"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  User,
  Mail,
  Phone,
  Building,
  Shield,
  Key,
  Bell,
  Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with Skeleton */}
      <div className="mb-6">
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 w-1/3 rounded bg-gray-200"></div>
            <div className="h-4 w-2/3 rounded bg-gray-200"></div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600">
              Manage your account information and settings
            </p>
          </>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Profile Card */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 rounded-full bg-gray-200"></div>
                  <div className="mt-4 h-6 w-3/4 rounded bg-gray-200"></div>
                  <div className="mt-2 h-4 w-1/2 rounded bg-gray-200"></div>
                  <div className="mt-1 h-4 w-2/3 rounded bg-gray-200"></div>
                  <div className="mt-4 h-10 w-full rounded bg-gray-200"></div>

                  <div className="mt-6 w-full space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                          <div className="h-3 w-3/4 rounded bg-gray-200"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarImage
                      src="/placeholder.svg?height=96&width=96"
                      alt="User"
                    />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-xl font-bold">A. RISYAN</h2>
                  <p className="text-gray-500">Dept. Engineering</p>
                  <p className="text-sm text-gray-500">risyan25~gmail.com</p>

                  <Button className="mt-4 w-full bg-purple-700 hover:bg-purple-800">
                    Edit Profile
                  </Button>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Department</p>
                        <p className="text-sm text-gray-500">Engineering</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Role</p>
                        <p className="text-sm text-gray-500">
                          Production Supervisor
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Joined</p>
                        <p className="text-sm text-gray-500">
                          January 15, 2022
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="md:col-span-2">
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-10 w-full rounded bg-gray-200"></div>
              <div className="h-96 rounded-xl bg-gray-200"></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tabs defaultValue="personal">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                {/* Personal Info Tab */}
                <TabsContent value="personal" className="mt-4">
                  <Card>
                    <CardHeader className="bg-gray-50">
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <div className="flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 bg-gray-50">
                              <User className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              id="fullName"
                              defaultValue="A. RISYAN"
                              className="rounded-l-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 bg-gray-50">
                              <Mail className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              id="email"
                              defaultValue="risyan25~gmail.com"
                              className="rounded-l-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <div className="flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 bg-gray-50">
                              <Phone className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              id="phone"
                              defaultValue="+62 812 3456 7890"
                              className="rounded-l-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <div className="flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 bg-gray-50">
                              <Building className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              id="department"
                              defaultValue="Engineering"
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button className="bg-purple-700 hover:bg-purple-800">
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="mt-4">
                  <Card>
                    <CardHeader className="bg-gray-50">
                      <CardTitle>Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">
                            Current Password
                          </Label>
                          <div className="flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 bg-gray-50">
                              <Key className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              id="currentPassword"
                              type="password"
                              className="rounded-l-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 bg-gray-50">
                              <Key className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              id="newPassword"
                              type="password"
                              className="rounded-l-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">
                            Confirm New Password
                          </Label>
                          <div className="flex">
                            <div className="flex h-10 w-10 items-center justify-center rounded-l-md border border-r-0 bg-gray-50">
                              <Key className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input
                              id="confirmPassword"
                              type="password"
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button className="bg-purple-700 hover:bg-purple-800">
                          Update Password
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="mt-4">
                  <Card>
                    <CardHeader className="bg-gray-50">
                      <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                              <Bell className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">Production Alerts</p>
                              <p className="text-sm text-gray-500">
                                Receive alerts for production issues
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="productionAlerts"
                              className="h-4 w-4 rounded border-gray-300"
                              defaultChecked
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                              <Bell className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <p className="font-medium">
                                Downtime Notifications
                              </p>
                              <p className="text-sm text-gray-500">
                                Get notified about machine downtime
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="downtimeNotifications"
                              className="h-4 w-4 rounded border-gray-300"
                              defaultChecked
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                              <Bell className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">Performance Reports</p>
                              <p className="text-sm text-gray-500">
                                Weekly performance report emails
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="performanceReports"
                              className="h-4 w-4 rounded border-gray-300"
                              defaultChecked
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                              <Bell className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                              <p className="font-medium">
                                Maintenance Reminders
                              </p>
                              <p className="text-sm text-gray-500">
                                Scheduled maintenance notifications
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="maintenanceReminders"
                              className="h-4 w-4 rounded border-gray-300"
                              defaultChecked
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button className="bg-purple-700 hover:bg-purple-800">
                          Save Preferences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
