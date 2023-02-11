import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const CustomizePanel = ({ panel, value, pIndex }) => {
  // const [order, setOrder] = useState();
  // set toggle
  const stateInitArray = panel.cItems.map((r, rIndex) => ({
    id: rIndex,
    selected: 'false',
  }));

  const [toggle, setToggle] = useState(stateInitArray);
  const handleChange = (event, cusIndex) => {
    const { value } = event.target;
    const selected = value === toggle[cusIndex].selected ? 'false' : value;
    setToggle((prevState) =>
      prevState.map((row, i) =>
        // iterate over the state and update value of row where the switch was pressed
        i === cusIndex ? { ...row, selected } : row,
      ),
    );
  };

  return (
    <Box
      role="tabpanel"
      hidden={value !== pIndex}
      id={`vertical-tabpanel-${pIndex}`}
      sx={{ boxShadow: '-3px 3px 15px 0px black ', borderRadius: '10px 10px 10px 10px' }}
      width={1}
    >
      {value === pIndex && (
        <Box display="flex" sx={{ p: 1, height: 220 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ 'td,  th': { border: 0 } }}>
                <TableCell />
                <TableCell align="center">Single</TableCell>

                <TableCell align="center">Double</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {panel.cItems.map((cus, cusIndex) => (
                <TableRow key={cus.itemName} sx={{ 'td,  th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle2">{cus.itemName}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <ToggleButton
                      value="price1"
                      key={toggle[cusIndex].id}
                      selected={toggle[cusIndex].selected === 'price1'}
                      onChange={(event) => {
                        handleChange(event, cusIndex);
                      }}
                      sx={{
                        '&.MuiToggleButton-root': {
                          border: 2,
                          width: 60,
                          height: 30,
                          p: 1,
                        },
                        '&.MuiToggleButton-root.Mui-selected': {
                          backgroundColor: 'secondary.main',
                        },
                      }}
                    >
                      $ {cus.prices[0]}
                    </ToggleButton>
                  </TableCell>
                  <TableCell align="center">
                    {cus.prices[1] !== null ? (
                      <ToggleButton
                        value="price2"
                        key={toggle[cusIndex].id}
                        selected={toggle[cusIndex].selected === 'price2'}
                        onChange={(event) => {
                          handleChange(event, cusIndex);
                        }}
                        sx={{
                          '&.MuiToggleButton-root': {
                            border: 2,
                            width: 60,
                            height: 30,
                            p: 1,
                          },
                          '&.MuiToggleButton-root.Mui-selected': {
                            backgroundColor: 'secondary.main',
                          },
                        }}
                      >
                        $ {cus.prices[1]}
                      </ToggleButton>
                    ) : (
                      <div />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
      <Box />
    </Box>
  );
};

export default CustomizePanel;
