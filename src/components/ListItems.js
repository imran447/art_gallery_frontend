import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import {NavLink} from 'react-router-dom';

const ListItems = () => {
    return (
        <React.Fragment>
      <NavLink to={'/'}>
        <ListItemButton>
        <ListItemIcon>
            <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="History Item" />
        </ListItemButton>
    </NavLink>
    <NavLink to={'/history'}>
        <ListItemButton>
        <ListItemIcon>
            <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="History" />
        </ListItemButton>
    </NavLink>
    <NavLink to={'/changetype'}>
        <ListItemButton>
        <ListItemIcon>
            <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Change Type" />
        </ListItemButton>
    </NavLink>
    <NavLink to={'/assettype'}>
        <ListItemButton>
        <ListItemIcon>
            <WebAssetIcon />
        </ListItemIcon>
        <ListItemText primary="Asset Type" />
        </ListItemButton>
    </NavLink>
  </React.Fragment>
    )
}

export default ListItems;
