import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
//component de goi truoc khi xoa ai
function ConfirmationAlert({children,OnDelete}:any) {
  return (
    <AlertDialog>
        {/* asChild  de khong bi loi button ben trong button*/}
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa không?</AlertDialogTitle>
          <AlertDialogDescription>
          Hành động này không thể được hoàn tác. Điều này sẽ xóa vĩnh viễn AI của bạn khỏi máy chủ của chúng tôi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={OnDelete}>Chắc chắn</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmationAlert;
