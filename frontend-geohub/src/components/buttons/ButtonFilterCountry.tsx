import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Button } from 'antd'

type ButtonFilterCountryProps = {
   countries: string[]
}

const ButtonFilterCountry: React.FC<ButtonFilterCountryProps> = ({ countries }) => {
   const [current, setCurrent] = useState<string | null>(null)

   const menu = {
      items: countries.map((country) => ({
         key: country,
         label: country,
      })),
      onClick: (e: any) => setCurrent(e.key),
      selectedKeys: current ? [current] : [],
   }

   return (
      <Dropdown menu={menu} trigger={['click']}>
         <Button className="hover:!border-[var(--color--primary)] hover:!text-[var(--color--primary)]">
            {current || 'Country'} <DownOutlined />
         </Button>
      </Dropdown>
   )
}

export default ButtonFilterCountry
