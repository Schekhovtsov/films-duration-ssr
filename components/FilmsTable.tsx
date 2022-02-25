import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IFilm, ITableProps } from '../utils/types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import styled from 'styled-components';

export const FilmsTable = ({ data }: ITableProps) => {

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Views</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.results.map((film) => (
            <TableRow
              key={film.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <InfoWrapper>
                  <Poster
                    src={`https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`}
                    alt={film.title}
                  />
                  {film.title}
                </InfoWrapper>
                
              </TableCell>
              <TableCell align="right">{film.vote_average}</TableCell>
              <TableCell align="right">{film.vote_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.total_results}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

const InfoWrapper = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;

const Poster = styled.img`
  width: 80px;
`;