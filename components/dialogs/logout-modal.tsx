"use client";
import { Info, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

import { AuthResponse, authService } from "@/lib/api/api";
import { useAppStore } from "@/store/use-app-store";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type Props = {
  trigger: React.ReactNode;
};
export const LogoutModal = (props: Props) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const { logout } = useAppStore();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await authService.logout();
      const res = data.rawResponse as AuthResponse;

      if (res.success) {
        // Clear state first
        logout();

        // Then navigate
        window.location.href = "/";
        // Refresh after navigation
        setTimeout(() => {
          router.refresh();
        }, 100);

        toast(res.message || "Logged out successfully");
        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild className="cursor-pointer">
        {props.trigger}
      </DialogTrigger>
      <DialogContent className="dark:bg-dark-200 flex flex-col gap-3 border-none">
        <DialogHeader>
          <DialogTitle className="dark:text-light-700 flex items-center space-x-2 text-base">
            <Info className="me-2 size-4" />
            Sign out of Feed Explorer
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to logout? We&apos;ll sign you out and remove
            any offline data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3 flex w-full justify-between gap-1">
          <div className="flex justify-between gap-6">
            <DialogClose asChild className="">
              <Button
                disabled={loading}
                variant={"ghost"}
                className="light-border-2 text-dark400_light500 flex w-full cursor-pointer items-center gap-2 rounded-md border p-2 px-4 text-sm"
              >
                Cancel
              </Button>
            </DialogClose>
          </div>
          <Button
            disabled={loading}
            className="hover:bg-primary-500 flex cursor-pointer items-center justify-center gap-2"
            onClick={handleLogout}
          >
            {loading && <Loader2 className="ms-2 size-4 animate-spin" />}

            {loading ? "Logging Out..." : "Sign Out"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
