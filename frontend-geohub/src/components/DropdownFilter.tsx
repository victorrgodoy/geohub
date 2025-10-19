import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';

type DropdownFilterProps = {
  title: string;
  items: MenuProps['items']; 
};

const DropdownFilter: React.FC<DropdownFilterProps> = ({ title, items }) => (
  <Dropdown
    menu={{
      items,
      selectable: true,
      defaultSelectedKeys: ['3'],
    }}
  >
    <Typography.Link>
      <Space>
        {title}
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
);

export default DropdownFilter;