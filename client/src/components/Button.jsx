import React from 'react';
import { Button, Flex } from 'antd';

const ButtonAnt = ({ title, ...props }) => (
  <Flex gap="large" wrap>
    <Button className='button' type="primary"  htmlType="submit" {...props}>
      {title}
    </Button>
  </Flex>
);

export default ButtonAnt;