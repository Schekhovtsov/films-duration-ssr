import { Box } from '@mui/material';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams
} from '@mui/x-data-grid';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { IInitialState } from '../utils/models';

export const FilmsTable = ({ data }: IInitialState) => {
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 8,
      renderCell: (params: GridRenderCellParams<any>) => (
        <TitleCell>
          <Image
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${params.row.poster_path}`}
            alt={params.value}
            width={45}
            height={65}
          />
          <InfoWrapper>
            <Title>{params.value}</Title>
            <ReleaseDate>{params.row.release_date.substring(0, 4)}</ReleaseDate>
            <Genres>
              {params.row.genres.map((genre: any) => `${genre.name} `)}
            </Genres>
          </InfoWrapper>
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
      renderCell: (params: GridRenderCellParams<any>) =>
        `${params.value} minutes`,
      flex: 1,
    },
  ];

  return (
    <Box
      sx={{
        height: 1250,
        width: '100%',
        '& .red': { backgroundColor: '#ffd6d6' },
        '& .green': { backgroundColor: '#e2ffd8' },
        '& .yellow': { backgroundColor: '#fdebcc' },
      }}
    >
      <DataGrid
        rows={data}
        rowHeight={110}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        disableColumnSelector={true}
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
};

const TitleCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 18px;
`;

const ReleaseDate = styled.div`
  display: flex;
`;

const Genres = styled.div`
  color: #8a8a8a;
  font-style: italic;
`;
