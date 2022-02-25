import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ITableProps } from '../utils/types';

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

type TFilm = {
  title: string,
  score: number,
  views: number,
  img: string,
}

const createData = (title: string, score: number, views: number, img: string) => {
  console.log({ title, score, views, img });
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 'url'),
]



export const FilmsTable = ({ data }: ITableProps) => {
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
