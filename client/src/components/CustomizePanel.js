import {
  Box,
  Typography,
  Tabs,
  Tab,
  /* Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButtonGroup,
  ToggleButton, */
} from '@mui/material';
import React, { useState } from 'react';

const CustomizePanel = ({ customization }) => {
  const [currentTab, setCurrentTab] = useState(customization[0].cTypeName);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  /*
  
  const [toggle, setToggle] = useState(() => [0]);
  const handleToggleChange = (event, newValue) => {
    setToggle((prevState) => prevState.concat(newValue));
  };
  console.log('Toggle', toggle);
  console.log('handleToggle', handleToggleChange);
  const random = customization.map((items) =>
    items.cItems.map((initial, initialIndex) => ({
      id: initialIndex,
      selected: 'false',
      itemName: initial.itemName,
    })),
  );
  console.log('Random', random);
  const initialToggleState = customization.map((initial, initialIndex) => ({
    id: initialIndex,
    selected: 'false',
    itemName: initial.cTypeName,
  })); // creates a empty state for toggle button
  */
  // console.log('Intial Toggle State', initialToggleState);
  /* 
  // const [toggle, setToggle] = useState(initialToggleState);

  

  /* const handleToggleChange = (event, newValue, cusIndex) => {
    const currentValue = event.target.value;
    const selected = currentValue === toggle[cusIndex].selected ? 'false' : currentValue;
    setToggle((prevState) =>
      prevState.map((row, i) =>
        // iterate over the state and update value of row where the switch was pressed
        i === cusIndex ? { ...row, selected } : row,
      ),
    );
  };
  console.log('Toogle Value', toggle); */
  return (
    <Box>
      <Typography pb={1} variant="subtitle1" textAlign="left" sx={{ fontWeight: 'bold' }}>
        Customization :
      </Typography>
      <Box sx={{ bgcolor: 'transparent', display: 'flex', py: 1 }}>
        <Tabs
          orientation="vertical"
          TabIndicatorProps={{ style: { display: 'none' } }}
          textColor="secondary"
          value={currentTab}
          onChange={handleTabChange}
          sx={{
            '& button.Mui-selected': {
              backgroundColor: 'background.paper',
              boxShadow: '-1px 3px 15px 1px black',
              borderRadius: '10px 0px 0px 10px',
            },
          }}
        >
          {customization.map((customizationType) => (
            <Tab
              label={customizationType.cTypeName}
              key={customizationType.cTypeName}
              value={customizationType.cTypeName}
              sx={{ px: 4, ml: 3, mt: 2 }}
            />
          ))}
        </Tabs>
        {customization.map((c) => (
          <Box
            hidden={currentTab !== c.cTypeName} // hide the customization panel based on tab selected
            sx={{ boxShadow: '-3px 3px 15px 0px black ', borderRadius: '10px 10px 10px 10px' }}
            width={1}
          >
            {currentTab === c.cTypeName && (
              <Box display="flex" sx={{ p: 1, minHeight: 220 }}>
                {/* <Table size="small">
                  <TableHead>
                    <TableRow sx={{ 'td,  th': { border: 0 } }}>
                      <TableCell />
                      <TableCell padding="none">
                        <TableCell align="center">
                          <Typography variant="subtitle2" sx={{ width: 50, height: 20 }}>
                            Single
                          </Typography>
                        </TableCell>

                        <TableCell align="center">
                          <Typography variant="subtitle2" sx={{ width: 50, height: 20 }}>
                            Double
                          </Typography>
                        </TableCell>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {c.cItems.map((item) => (
                      <TableRow key={item.itemName} sx={{ 'td,  th': { border: 0 } }}>
                        <TableCell component="th" scope="row" align="center" padding="none">
                          <Typography variant="subtitle2">{item.itemName}</Typography>
                        </TableCell>
                        <TableCell padding="none">
                          <ToggleButtonGroup value={toggle} onChange={handleToggleChange}>
                            <TableCell align="center">
                              <ToggleButton
                                value={item.price[0]}
                                sx={{
                                  '&.MuiToggleButton-root': {
                                    border: 2,
                                    width: 50,
                                    height: 30,
                                  },
                                  '&.MuiToggleButton-root.Mui-selected': {
                                    backgroundColor: 'secondary.main',
                                  },
                                }}
                              >
                                {item.prices[0]}
                              </ToggleButton>
                            </TableCell>
                            <TableCell align="center">
                              <ToggleButton
                                value={item.price[1]}
                                sx={{
                                  '&.MuiToggleButton-root': {
                                    border: 2,
                                    width: 50,
                                    height: 30,
                                  },
                                  '&.MuiToggleButton-root.Mui-selected': {
                                    backgroundColor: 'secondary.main',
                                  },
                                }}
                              >
                                {item.prices[1]}
                              </ToggleButton>
                            </TableCell>
                          </ToggleButtonGroup>
                        </TableCell>
                        {/* <ToggleButton
                              value={price}
                              key={`${item.item.name}-price ${priceIndex + 1}`}
                              selected={toggle[cusIndex].selected === 'price1'}
                              onChange={(event) => {
                                handleToggleChange(event, cusIndex);
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
                              $ {price}
                            </ToggleButton> */}
                {/* </TableRow>
                    ))}
                  </TableBody>
                </Table> */}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CustomizePanel;
