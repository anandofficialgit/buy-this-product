import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiService, type User } from "@/lib/api";
import Header from "@/components/Header";
import { Download, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UsersData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const response = await apiService.getAllUsers();
        if (response.success && response.data) {
          setUsers(response.data);
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to load users",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load users. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [toast]);

  const handleDownload = () => {
    const jsonData = JSON.stringify(users, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "users_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Users Data</CardTitle>
                  <CardDescription>
                    View and download user credentials stored on the server
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPasswords(!showPasswords)}
                  >
                    {showPasswords ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide Passwords
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Show Passwords
                      </>
                    )}
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download JSON
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Loading users...</p>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No users found.</p>
                  <p className="text-sm mt-2">
                    <Link to="/signup" className="text-primary hover:underline">
                      Create an account
                    </Link>{" "}
                    to see data here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Total users: {users.length}
                  </div>
                  <div className="space-y-3">
                    {users.map((user, index) => (
                      <Card key={index} className="bg-secondary/50">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Name</p>
                              <p className="text-base">{user.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Mobile Number</p>
                              <p className="text-base">{user.mobileNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Username</p>
                              <p className="text-base">{user.username}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Password</p>
                              <p className="text-base font-mono">
                                {showPasswords && user.password ? user.password : "••••••"}
                              </p>
                              {!user.password && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  (Password not available from API)
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Storage Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Storage Location:</strong> Server-side JSON file
                </p>
                <p>
                  <strong>File Path:</strong> <code className="bg-secondary px-2 py-1 rounded">backend/data/users.json</code>
                </p>
                <p>
                  <strong>API Endpoint:</strong> <code className="bg-secondary px-2 py-1 rounded">http://localhost:8081/api/users</code>
                </p>
                <p>
                  <strong>Backend:</strong> Java Spring Boot application running on port 8081
                </p>
                <p className="pt-2">
                  <strong>Note:</strong> Data is stored in a JSON file on the server. Passwords are not returned by the API for security. To download the data, click "Download JSON" above.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UsersData;
