import { Box } from '@mui/material';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams
} from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { ITableProps } from '../utils/models';

export const FilmsTable = observer(({ data }: ITableProps) => {
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 8,
      renderCell: (params: GridRenderCellParams<any>) => (
        <TitleCell>
          <div>
            <Image
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${params.row.poster_path}`}
              alt={params.value}
              width={80}
              height={120}
            />
          </div>
          <div>{params.value}</div>
        </TitleCell>
      ),
    },
    {
      field: 'vote_average',
      headerName: 'Score',
      flex: 1,
    },
    {
      field: 'runtime',
      headerName: 'Runtime',
      flex: 1,
    },
  ];

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      style={{ height: 700, width: '100%' }}
      sx={{
        '& .red': { backgroundColor: '#ffd6d6' },
        '& .green': { backgroundColor: '#e2ffd8' },
        '& .yellow': { backgroundColor: '#fdebcc' },
      }}
    >
      <DataGrid
        rows={data}
        rowHeight={150}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        getCellClassName={(params: GridCellParams<any>): any => {
          if (params.field === 'runtime') {
            if (params.value > 160) {
              return 'red';
            }
            if (params.value <= 100) {
              return 'green';
            } else {
              return 'yellow';
            }
          }
        }}
        initialState={{
          sorting: {
            sortModel: [
              { field: 'vote_average', sort: 'desc' },
              { field: 'vote_count', sort: 'desc' },
            ],
          },
        }}
      />
    </Box>
  );
});

const TitleCell = styled.div`
  display: flex;
  flex-direction: row;
`;
