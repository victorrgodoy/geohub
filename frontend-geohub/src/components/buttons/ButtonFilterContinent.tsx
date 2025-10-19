import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Button } from 'antd'

type ButtonFilterContinentProps = {
   continents: string[]
}

const ButtonFilterContinent: React.FC<ButtonFilterContinentProps> = ({ continents }) => {
   const [current, setCurrent] = useState<string | null>(null)

   const menu = {
      items: continents.map((continent) => ({
         key: continent,
         label: continent,
      })),
      onClick: (e: any) => setCurrent(e.key),
      selectedKeys: current ? [current] : [],
   }

   return (
      <Dropdown menu={menu} trigger={['click']}>
         <Button className="hover:!border-[var(--color--primary)] hover:!text-[var(--color--primary)]">
            {current || 'Continent'} <DownOutlined />
         </Button>
      </Dropdown>
   )
}

export default ButtonFilterContinent
