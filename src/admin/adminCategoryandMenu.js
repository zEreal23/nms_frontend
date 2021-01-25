import React from "react";
import { Tabs} from "antd";

import ManageCategory from '../admin/category/ManageCategory'
import ManageMenu from '../admin/Menu/ManageProduct'

const ManageProduct = () => {

  const { TabPane } = Tabs;

  const Demo = () => (
    <Tabs style={{ marginLeft: 10 }}>
      <TabPane tab="Categories" key="1">
        <ManageCategory/>
      </TabPane>
        
      <TabPane tab="Menu" key="2">
        <ManageMenu/>
      </TabPane>
    </Tabs>
  );

  return (
    <div>
      <Demo />
    </div>
  );
};

export default ManageProduct;
