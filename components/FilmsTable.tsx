import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'title',
    headerName: 'Title',
    width: 700,
  },
  {
    field: 'vote_average',
    headerName: 'score',
    sortable: true,
    width: 200,
  },
];

export const FilmsTable = ({ data }: any) => {
  return (
    <div>
      <DataGrid
        rows={data}
        columns={columns}
        autoHeight={true}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        initialState={{
          sorting: {
            sortModel: [{ field: 'vote_average', sort: 'desc' }],
          },
        }}
      />
    </div>
  );
};
