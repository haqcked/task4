import axios from "axios";
import Swal from "sweetalert2";

const handleStatusToggleAll = (selectedRows, data) => {
  if (!selectedRows || selectedRows.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'No rows selected!',
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  Swal.fire({
    title: 'Are you sure?',
    text: 'Change status for all selected rows?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28A745',
    cancelButtonColor: '#DC3545',
    confirmButtonText: 'Yes, change them!',
  }).then((result) => {
    if (result.isConfirmed) {
      Promise.all(selectedRows.map((id) => {
        const currentStatus = data.find((userdata) => userdata.id === id)?.status;
        const newStatus = currentStatus === 1 ? 0 : 1;

        return axios.put(`http://localhost:8081/update-status/${id}`, { status: newStatus });
      }))
      .then((responses) => {
        console.log("API Responses:", responses);

        Swal.fire({
          icon: 'success',
          title: 'Status changed successfully!',
          showConfirmButton: false,
          timer: 2000,
        });

        setTimeout(() => {
          location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
    }
  });
};

export default handleStatusToggleAll;
