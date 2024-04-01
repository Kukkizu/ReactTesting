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
    const [rowModesModel, setRowModesModel] = useState({});
  
    const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
  
    const handleSaveClick = (id, updatedRow) => () => {
        // Prepare the data to be sent in the POST request
        const postData = {
          id: updatedRow.id,
          operation: 'update',
          key: 'your_api_key_here',
          name: updatedRow.name,
          category: updatedRow.category,
          price: updatedRow.price,
          status: updatedRow.status
          // Include other fields as needed
        };
      
        fetch('http://localhost/kumaprints/update_listings.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to save changes');
          }
          console.log('Changes saved successfully');
          setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        })
        .catch(error => {
          console.error('Error saving changes:', error);

        });
      };
      
  
      const handleDeleteClick = (id) => () => {
        // Prepare the data to be sent in the POST request
        const postData = {
          id: id,
          operation: 'delete',
          key: 'your_api_key_here'
        };
        fetch('http://localhost/kumaprints/update_listings.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete row');
          }
          console.log('Row deleted successfully');
          setRows(rows.filter((row) => row.id !== id));
        })
        .catch(error => {
          console.error('Error deleting row:', error);
        });
      };
      
  
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    };
  
    const processRowUpdate = (newRow) => {
      const updatedRow = { ...newRow };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    };
  
    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };

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
            type: 'singleSelect',
            valueOptions: ['Unframed Print','Framed Print','Tote Bag',],
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
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Available', 'On Hold', 'Sold'],
        },
        {
            field: 'dateCreated',
            headerName: 'Date Created',
            type: 'date',
            width: 180,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
            
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            key="save"
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            key="cancel"
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        key="edit"
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key="delete"
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
            
          },

      ];
      
   
    return (
        <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}

        />
    )

    
}

export default ManageListings;
