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
import { IDesktopBoolean, ITableProps } from '../../utils/models';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getHumanRuntime } from '../../utils/runtimeConverter';

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
        <CellFlex>
          <LineWrapper>
            <Image
              src={`https://image.tmdb.org/t/p/w500${params.row.poster_path}`}
              alt={params.value}
              width={45}
              height={70}
            />
            <InfoWrapper>
              <Title>
                <Link href={'/film/' + params.row.id}>{params.value}</Link>
              </Title>
              <ReleaseDate>
                {params.row.release_date.substring(0, 4)}
              </ReleaseDate>
              <Genres>
                {params.row.genres.map((genre: any) => `${genre.name} `)}
              </Genres>
            </InfoWrapper>
          </LineWrapper>
          {!desktop && (
            <LineWrapper>
              <RuntimeWrapper>
                Score: {params.row.vote_average} &nbsp;&nbsp;&nbsp; Runtime:{' '}
                {getHumanRuntime(params.row.runtime)} &nbsp;&nbsp;&nbsp;
                <Box
                  sx={{
                    '& .red': { width: 100, backgroundColor: '#f0351d' },
                    '& .green': { backgroundColor: '#18e054' },
                    '& .yellow': { backgroundColor: '#e4bc09' },
                  }}
                >
                  {params.row.runtime && params.row.runtime > 160 ? (
                    <span className="red">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  ) : params.row.runtime &&
                    params.row.runtime <= 100 &&
                    params.row.runtime < 160 ? (
                    <span className="green">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  ) : (
                    <span className="yellow">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  )}
                </Box>
              </RuntimeWrapper>
            </LineWrapper>
          )}
        </CellFlex>
      ),
    },
    {
      field: 'vote_average',
      headerName: 'Score',
      flex: 1,
      minWidth: 100,
      hide: !desktop,
    },
    {
      field: 'runtime',
      headerName: 'Runtime',
      renderCell: (params: GridRenderCellParams<any>) =>
        `${params.value} minutes`,
      flex: 1,
      minWidth: 100,
      hide: !desktop,
    },
  ];

  const handlePageChange = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        height: desktop ? 1250 : 1400,
        width: '100%',
        '& .red': { backgroundColor: '#ffd6d6' },
        '& .green': { backgroundColor: '#e2ffd8' },
        '& .yellow': { backgroundColor: '#fdebcc' },
      }}
    >
      <DataGrid
        rows={data}
        rowHeight={desktop ? 110 : 135}
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

const CellFlex = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const LineWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});

const InfoWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '10px',
});

const RuntimeWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  margin: '10px 0 0 0',
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