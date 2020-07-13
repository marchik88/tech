import React from 'react';
import s from './style.sass';

export default Tabs => TabPane => ({
  className = '',
  innerTabs = [],
  onChange = () => {},
}) => (
  <div className={`${s.Tabs || ''} ${className || ''}`}>
    <Tabs defaultActiveKey="1" onChange={onChange}>
      {innerTabs.map((tab, i) => (
        <TabPane tab={tab.title} key={i + 1}>
          {tab.content}
        </TabPane>
      ))}
    </Tabs>
  </div>
);
