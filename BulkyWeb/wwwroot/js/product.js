﻿var dataTable;
$(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": { url: '/admin/product/getall' },
        "columns": [
            { "data": 'title', "width": "25%" },
            { "data": 'isbn', "width": "15%" },
            { "data": 'listPrice', "width": "10%" },
            { "data": 'author', "width": "15%" },
            { "data": 'category.name', "width": "10%" },
            {
                data: 'id',
                "render": function (data) {
                    return `<div class="w-75 btn-group" role="group">
                     <a href="/admin/product/upsert?id=${data}" class="btn btn-primary mx-2"><i class="bi bi-pencil-square"></i>Edit</a>
                     <a onClick=Delete("/admin/product/delete?id=${data}") class="btn btn-danger mx-2"><i class="bi bi-trash-fill"></i>Delete</a>
                    </div>`
                },
                "width" : "25%"
            }
        ]
    });
}

function Delete(url) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    toastr.success(data.message);
                    dataTable.ajax.reload();
                }
            })
            swalWithBootstrapButtons.fire(
                {
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "No delete was done",
                icon: "error"
            });
        }
    });
}