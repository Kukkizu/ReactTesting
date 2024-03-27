import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

function ManageListings() {
    const [rows, setRows] = useState([]);

    useEffect(() => {

        fetch(`http://localhost/kumaprints/listings.php`)
        .then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
            setRows(data);
        });
    }, []); // Empty dependency array means this effect runs once after the initial render

    const columns = [
        { 
            field: 'id',
            headerName: 'Id',
            width: 60, 
            editable: false,
        },
        { 
            field: 'name',
            headerName: 'Name',
            width: 300, 
            editable: true,
        },
        {
            field: 'category',
            headerName: 'Category',
            editable: true,
            width: 180, 
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'image_path',
            headerName: 'Image',
            width: 100,
            editable: false,
            renderCell: (params) => {
                return (
                  <a href={"http://localhost/kumaprints"+params.value} target="_blank" rel="noopener noreferrer">
                    Link
                  </a>
                );
              },
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 80,
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            type: 'singleSelect',
            valueOptions: ['Available', 'On Hold', 'Sold'],
            editable: true,
        },
        {
            field: 'dateCreated',
            headerName: 'Date Created',
            type: 'date',
            width: 180,
            editable: true,
        },

      ];
      
   
    return (
        <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        />
    )

    
}

export default ManageListings;
