import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

type InputSearchProps = {
   title: string
}

const InputSearch: React.FC<InputSearchProps> = ({ title }) => {
   return <Input 
      placeholder={title} 
      prefix={<SearchOutlined />} 
      style={{ width: '10rem', height: '2rem' }}
      />
}

export default InputSearch;