import axios from 'axios';
import Swal from 'sweetalert2';

const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this user!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.delete(`http://localhost:8081/delete/${id}`)
        .then(res => {
          Swal.fire({
            icon: 'success',
            title: 'User deleted successfully!',
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

export default handleDelete
