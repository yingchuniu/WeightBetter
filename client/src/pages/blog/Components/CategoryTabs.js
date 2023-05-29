import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function CategoryTabs() {
  const classes = useStyles();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const handleChange = (event, newValue) => {
    // handle tab change
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={currentPath}
        orientation="vertical"
        variant="scrollable"
        onChange={handleChange}
        aria-label="Category Tabs"
        className={classes.tabs}
      >
        <Tab
          label="最新文章"
          value="/articles/latest"
          component={Link}
          to="/articles/latest"
        />
        <Tab
          label="健身鍛鍊"
          value="/articles/fitness"
          component={Link}
          to="/articles/fitness"
        />
        <Tab
          label="居家運動"
          value="/articles/home-workouts"
          component={Link}
          to="/articles/home-workouts"
        />
        <Tab
          label="健康飲食"
          value="/articles/healthy-eating"
          component={Link}
          to="/articles/healthy-eating"
        />
        <Tab
          label="養生保健"
          value="/articles/health-wellness"
          component={Link}
          to="/articles/health-wellness"
        />
      </Tabs>
    </div>
  );
}

export default CategoryTabs;
