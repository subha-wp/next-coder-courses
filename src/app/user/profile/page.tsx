/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { validateRequest } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const { user } = await validateRequest();

  return (
    <div className="container mx-auto py-8 px-4 mb-12">
      <h1 className="text-2xl font-bold mb-6">Profile Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Name
            </label>
            <p className="text-lg">{user.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <p className="text-lg">{user.email}</p>
          </div>
          {user.phoneNumber && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Phone Number
              </label>
              <p className="text-lg">{user.phoneNumber}</p>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Role
            </label>
            <p className="text-lg capitalize">{user.role.toLowerCase()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
