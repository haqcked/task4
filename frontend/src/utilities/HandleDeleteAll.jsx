import axios from "axios";
import Swal from "sweetalert2";

const handleDeleteAll = (selectedRows) => {
  if (selectedRows.length === 0) {
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
    text: 'Once deleted, you will not be able to recover these users!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete them!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:8081/delete-multiple`, { data: { ids: selectedRows } })
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'Selected users deleted successfully!',
            showConfirmButton: false,
            timer: 3000
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        });
    }
  });
};

export default handleDeleteAll
