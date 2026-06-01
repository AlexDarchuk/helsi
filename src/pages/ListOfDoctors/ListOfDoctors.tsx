import { FC, useContext } from 'react';
import {
  Container,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Chip,
  tableCellClasses,
  Button,
} from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';

import { ProfileContext } from '../../context/ProfileContext';
import Loader from '../../components/Loader';
import {
  QUALIFICATION,
  SPECIALTY,
  WORKING_DAYS,
} from '../../constants/constants';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    color: 'gray',
    whiteSpace: 'nowrap',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: 'white',

  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    background: 'rgba(33, 150, 243, 0.1)',
  },
}));

const ListOfDoctors: FC = () => {
  const intl = useIntl();
  const { doctorsList } = useContext(ProfileContext);

  if (!doctorsList) {
    return <Loader />;
  }

  const getDoctorSpecialty = (specialty: string) => {
    const doctorSpecialty = SPECIALTY.find(({ key }) => key === specialty);

    return (
      <FormattedMessage id={doctorSpecialty?.key ?? ''} defaultMessage="" />
    );
  };

  const getDoctorQualification = (qualification: string) => {
    const doctorSpecialty = QUALIFICATION.find(
      ({ key }) => key === qualification
    );

    return (
      <FormattedMessage id={doctorSpecialty?.key ?? ''} defaultMessage="" />
    );
  };

  const sortedDays = (days: string[]) => {
    return days.sort((a, b) => {
      return (
        WORKING_DAYS.findIndex((day) => day.key === a) -
        WORKING_DAYS.findIndex((day) => day.key === b)
      );
    });
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100%' }}>
      <Typography variant="h4" pt="80px" pb="30px">
        <FormattedMessage
          id="list-of-doctors"
          defaultMessage="List of Doctors"
        />
      </Typography>
      <TableContainer
        component={Box}
        border="1px solid lightgray"
        borderRadius="10px"
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="body1">
                  <FormattedMessage id="name" defaultMessage="Name" />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">
                  <FormattedMessage id="email" defaultMessage="Email" />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">
                  <FormattedMessage id="specialty" defaultMessage="Specialty" />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">
                  <FormattedMessage
                    id="qualification"
                    defaultMessage="Qualification"
                  />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">
                  <FormattedMessage
                    id="startTime"
                    defaultMessage="Start Time"
                  />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">
                  <FormattedMessage id="endTime" defaultMessage="End Time" />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">
                  <FormattedMessage
                    id="working-days"
                    defaultMessage="Working days"
                  />
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body1">
                  <FormattedMessage id="action" defaultMessage="Action" />
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctorsList.map((row) => (
              <StyledTableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {`${row.name} ${row.lastName}`}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">
                  {getDoctorSpecialty(row.specialty)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {getDoctorQualification(row.qualification)}
                </StyledTableCell>
                <StyledTableCell align="right">{row.startTime}</StyledTableCell>
                <StyledTableCell align="right">{row.endTime}</StyledTableCell>
                <StyledTableCell align="right">
                  <Box display="flex" justifyContent="end" gap="2px">
                    {sortedDays(row.days).map((day) => (
                      <Chip
                        key={day}
                        label={intl.formatMessage({
                          id: day,
                          defaultMessage: '',
                        })}
                      />
                    ))}
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    onClick={() => console.log('Reject:', row.userID)}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    <FormattedMessage id="reject" defaultMessage="Reject" />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ListOfDoctors;
