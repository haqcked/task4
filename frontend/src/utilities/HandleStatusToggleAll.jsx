import axios from "axios";
import Swal from "sweetalert2";

const handleStatusToggleAll = (id, currentStatus, selectedRows) => {
  const newStatus = currentStatus === 1 ? 0 : 1;

  // Check if selectedRows is defined and is an array
  if (!selectedRows || !Array.isArray(selectedRows) || selectedRows.length === 0) {
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
    text: `Change status to ${newStatus === 1 ? 'Active' : 'Blocked'}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28A745',
    cancelButtonColor: '#DC3545',
    confirmButtonText: 'Yes, change them!',
  }).then((result) => {
    if (result.isConfirmed) {
      Promise.all(selectedRows.map((id) => {
        return axios.put(`http://localhost:8081/update-multiple-status`, { ids: selectedRows, status: newStatus });
      }))
        .then((responses) => {
          // Log the responses from the server
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
