import axios from "axios";
import Swal from "sweetalert2";

const handleStatusToggle = (id, currentStatus) => {
  const newStatus = currentStatus === 1 ? 0 : 1;

  Swal.fire({
    title: 'Are you sure?',
    text: `Change status to ${newStatus === 1 ? 'Active' : 'Blocked'}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#28A745',
    cancelButtonColor: '#DC3545',
    confirmButtonText: 'Yes, change it!',
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(`http://localhost:8081/update-status/${id}`, { status: newStatus })
        .then((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Status changed successfully!',
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            location.reload();
          }, 1000);        })
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

export default handleStatusToggle
