import { Box } from '@mui/material';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { styled } from '@mui/system';
import { ITableProps } from '../../utils/models';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const FilmsTable = ({ data }: ITableProps) => {

  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 8,
      minWidth: 300,
      renderCell: (params: GridRenderCellParams<any>) => (
        <TitleCell>
          { desktop && <Image
            src={`https://image.tmdb.org/t/p/w500${params.row.poster_path}`}
            alt={params.value}
            width={45}
            height={70}
          /> }          
          <InfoWrapper>
            <Title>
              <Link href={'/film/' + params.row.id}>{params.value}</Link>
            </Title>
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
      minWidth: 100,
    },
    {
      field: 'runtime',
      headerName: 'Runtime',
      renderCell: (params: GridRenderCellParams<any>) =>
        `${params.value} minutes`,
      flex: 1,
      minWidth: 100,
    },
  ];

  const handlePageChange = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        onPageChange={handlePageChange}
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

const TitleCell = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
});

const InfoWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '10px',
});

const Title = styled('div')({
  fontSize: '20px',
});

const ReleaseDate = styled('div')({
  display: 'flex',
});

const Genres = styled('div')({
  color: '#8a8a8a',
  fontStyle: 'italic',
});
